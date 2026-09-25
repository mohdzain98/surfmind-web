import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Bot,
  Eraser,
  History,
  KeyRound,
  Link2Off,
  Monitor,
  Search,
  Trash2,
  UserRoundX,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { AccountDetails } from "../api";
import { AdminApiError } from "../api";
import { useAdminAuth } from "../adminAuth";
import { formatNumber } from "../format";
import AccountSearches from "../components/AccountSearches";
import AdminConfirmDialog from "../components/AdminConfirmDialog";
import {
  AdminToast,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  StatusPill,
} from "../components/AdminUi";

type PendingAction =
  | { type: "unlink"; browserUuid: string }
  | { type: "clear"; scope: "history" | "all" }
  | { type: "revoke"; code: string }
  | { type: "delete" };

export default function AdminAccounts() {
  const { request } = useAdminAuth();
  const navigate = useNavigate();
  const { accountId: accountIdParam = "" } = useParams();
  const accountId = Number(accountIdParam);
  const validAccountId = Number.isInteger(accountId) && accountId > 0;
  const [account, setAccount] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [syncCode, setSyncCode] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null
  );
  const [actionBusy, setActionBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const dismissNotice = useCallback(() => setNotice(""), []);

  const loadAccount = useCallback(async () => {
    if (!validAccountId) return;
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const details = await request<AccountDetails>(`/accounts/${accountId}`);
      setAccount(details);
    } catch (requestError) {
      setAccount(null);
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "The account could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }, [accountId, request, validAccountId]);

  useEffect(() => {
    void loadAccount();
  }, [loadAccount]);

  async function runPendingAction() {
    if (!pendingAction) return;
    setActionBusy(true);
    setNotice("");
    setError("");
    try {
      if (pendingAction.type === "unlink") {
        if (!validAccountId) return;
        const result = await request<{
          success: boolean;
          newSyncAccountId: number;
        }>(`/accounts/${accountId}/unlink-browser`, {
          method: "POST",
          body: JSON.stringify({ browser_uuid: pendingAction.browserUuid }),
        });
        await loadAccount();
        setNotice(
          `Browser unlinked into solo account ${result.newSyncAccountId}.`
        );
      } else if (pendingAction.type === "clear") {
        if (!validAccountId) return;
        await request(`/accounts/${accountId}/clear-data`, {
          method: "POST",
          body: JSON.stringify({ scope: pendingAction.scope }),
        });
        await loadAccount();
        setNotice(
          pendingAction.scope === "history"
            ? "History data cleared successfully."
            : "All account data cleared successfully."
        );
      } else if (pendingAction.type === "revoke") {
        await request(
          `/sync-codes/${encodeURIComponent(pendingAction.code)}/revoke`,
          {
            method: "POST",
          }
        );
        setNotice(`Sync code ${pendingAction.code} was revoked.`);
        setSyncCode("");
      } else {
        if (!validAccountId) return;
        const result = await request<{
          success: boolean;
          deletedSyncAccountId: number;
        }>(`/accounts/${accountId}`, { method: "DELETE" });
        navigate("/admin/accounts", {
          replace: true,
          state: {
            notice: `Account #${result.deletedSyncAccountId} was permanently deleted.`,
          },
        });
        return;
      }
      setPendingAction(null);
    } catch (requestError) {
      setPendingAction(null);
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "The admin action could not be completed."
      );
    } finally {
      setActionBusy(false);
    }
  }

  const confirmCopy = pendingAction
    ? pendingAction.type === "unlink"
      ? {
          title: "Unlink this browser?",
          description: (
            <p>
              The browser will move to a fresh solo account. Its own contributed
              pages stay with it, and this action is recorded in the audit log.
            </p>
          ),
          label: "Unlink browser",
        }
      : pendingAction.type === "clear"
        ? {
            title:
              pendingAction.scope === "history"
                ? "Clear account history?"
                : "Clear all account data?",
            description: (
              <p>
                {pendingAction.scope === "history"
                  ? "This permanently removes history pages but keeps bookmarks, browsers, and pairing intact."
                  : "This permanently removes history, bookmarks, and search history. Browsers and pairing remain intact."}
              </p>
            ),
            label:
              pendingAction.scope === "history"
                ? "Clear history"
                : "Clear all data",
          }
        : pendingAction.type === "revoke"
          ? {
              title: `Revoke code ${pendingAction.code}?`,
              description: (
                <p>
                  This pairing code will become permanently unredeemable, even
                  if it has not expired yet.
                </p>
              ),
              label: "Revoke code",
            }
          : {
              title: `Permanently delete account #${accountId}?`,
              description: (
                <p>
                  This permanently deletes the account, pages, sections,
                  embeddings, and search history. It cannot be undone. Accounts
                  with multiple linked browsers must be unlinked first.
                </p>
              ),
              label: "Delete account",
            }
    : null;

  return (
    <div>
      <PageHeader
        eyebrow="Support operations"
        title={validAccountId ? `Account #${accountId}` : "Account details"}
        description="Inspect this account's browsers and activity, then perform audited recovery actions when needed."
        action={
          <button
            type="button"
            onClick={() => navigate("/admin/accounts")}
            className="inline-flex items-center gap-2 self-start rounded-full border border-charcoal/15 bg-white/60 px-4 py-2 text-xs font-semibold text-charcoal transition hover:bg-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to accounts
          </button>
        }
      />

      {notice ? (
        <AdminToast message={notice} onDismiss={dismissNotice} />
      ) : null}
      {!validAccountId ? (
        <Panel className="mt-5">
          <ErrorState message="This account ID is not valid." />
        </Panel>
      ) : null}
      {validAccountId && loading ? (
        <LoadingState label="Loading account…" />
      ) : null}
      {validAccountId && !loading && error ? (
        <Panel className="mt-5">
          <ErrorState message={error} onRetry={() => void loadAccount()} />
        </Panel>
      ) : null}

      {validAccountId && !loading && account ? (
        <div className="mt-5 space-y-5">
          <Panel className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 border-b border-charcoal/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal/35">
                  Sync account
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold">
                  #{account.syncAccountId}
                </h2>
              </div>
              <StatusPill ok={account.isLinked}>
                {account.isLinked
                  ? `${account.browserCount} browsers linked`
                  : "Solo browser"}
              </StatusPill>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "History pages",
                  value: account.pagesHistory,
                  Icon: History,
                },
                {
                  label: "Bookmarks",
                  value: account.pagesBookmark,
                  Icon: Bookmark,
                },
                { label: "Searches", value: account.searchCount, Icon: Search },
                {
                  label: "LLM tokens",
                  value: account.llmInputTokens + account.llmOutputTokens,
                  Icon: Bot,
                },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="rounded-xl bg-charcoal/[0.025] p-4">
                  <Icon className="h-4 w-4 text-charcoal/35" />
                  <p className="mt-3 text-lg font-semibold">
                    {formatNumber(value)}
                  </p>
                  <p className="text-[10px] text-charcoal/40">{label}</p>
                </div>
              ))}
            </div>
          </Panel>

          <AccountSearches key={accountId} accountId={accountId} />

          <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
            <Panel className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-sage" />
                <h2 className="font-serif text-xl font-semibold">Browsers</h2>
              </div>
              <div className="mt-4 divide-y divide-charcoal/8">
                {account.browsers.map((browserUuid) => (
                  <div
                    key={browserUuid}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <code className="min-w-0 flex-1 truncate rounded-lg bg-charcoal/[0.035] px-3 py-2 text-[11px] text-charcoal/60">
                      {browserUuid}
                    </code>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({ type: "unlink", browserUuid })
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal/10 px-3 py-2 text-[11px] font-semibold text-charcoal/60 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <Link2Off className="h-3.5 w-3.5" /> Unlink
                    </button>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                <h2 className="font-serif text-xl font-semibold">
                  Data controls
                </h2>
              </div>
              <p className="mt-2 text-xs leading-5 text-charcoal/45">
                Clear actions preserve the account and pairing. Permanent
                deletion removes the account itself.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPendingAction({ type: "clear", scope: "history" })
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-charcoal/12 px-4 py-2.5 text-left text-xs font-semibold text-charcoal/65 hover:bg-charcoal/[0.03]"
                >
                  <History className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear history only
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPendingAction({ type: "clear", scope: "all" })
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/60 px-4 py-2.5 text-left text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  <Eraser className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear all account data
                </button>
                <button
                  type="button"
                  onClick={() => setPendingAction({ type: "delete" })}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/70 px-4 py-2.5 text-left text-xs font-semibold text-red-700 hover:bg-red-100/70"
                >
                  <UserRoundX className="h-3.5 w-3.5" aria-hidden="true" />
                  Delete account permanently
                </button>
                {account.browserCount > 1 ? (
                  <p className="px-1 text-[10px] leading-4 text-red-600">
                    This account has {account.browserCount} linked browsers.
                    Unlink browsers until it is solo before deleting it.
                  </p>
                ) : null}
              </div>
            </Panel>
          </div>
        </div>
      ) : null}

      <Panel className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <KeyRound className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <h2 className="font-serif text-xl font-semibold">
              Revoke a sync code
            </h2>
            <p className="mt-1 text-xs text-charcoal/45">
              Permanently prevent an active eight-character pairing code from
              being redeemed.
            </p>
            <div className="mt-4 flex max-w-md gap-2">
              <input
                value={syncCode}
                onChange={(event) =>
                  setSyncCode(event.target.value.toUpperCase())
                }
                maxLength={8}
                placeholder="A1B2C3D4"
                className="min-w-0 flex-1 rounded-xl border border-charcoal/12 bg-white px-4 py-2.5 font-mono text-sm uppercase tracking-widest outline-none focus:border-sage"
              />
              <button
                type="button"
                disabled={syncCode.trim().length !== 8}
                onClick={() =>
                  setPendingAction({ type: "revoke", code: syncCode.trim() })
                }
                className="rounded-xl bg-charcoal px-4 text-xs font-semibold text-white hover:bg-charcoal/85 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      </Panel>

      {pendingAction && confirmCopy ? (
        <AdminConfirmDialog
          title={confirmCopy.title}
          description={confirmCopy.description}
          confirmLabel={confirmCopy.label}
          busy={actionBusy}
          onCancel={() => setPendingAction(null)}
          onConfirm={() => void runPendingAction()}
        />
      ) : null}
    </div>
  );
}
