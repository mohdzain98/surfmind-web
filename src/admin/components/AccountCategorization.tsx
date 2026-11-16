import type { AccountDetails } from "../api";
import { formatNumber } from "../format";
import { EmptyState, Panel } from "./AdminUi";

export default function AccountCategorization({
  account,
}: {
  account: AccountDetails;
}) {
  const categories = account.categories;
  return (
    <Panel className="overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6">
        <div>
          <h2 className="font-serif text-xl font-semibold">Categorization</h2>
          <p className="mt-1 text-xs text-charcoal/45">
            Categories apply to history pages.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${account.categorizationEnabled ? "bg-sage/12 text-sage" : "bg-charcoal/5 text-charcoal/55"}`}
        >
          {account.categorizationEnabled == null
            ? "Status unavailable"
            : account.categorizationEnabled
              ? "Enabled"
              : "Disabled"}
        </span>
        <dl className="w-full">
          <dt className="text-xs text-charcoal/45">
            Lifetime manual refreshes
          </dt>
          <dd className="mt-1 text-xl font-semibold">
            {account.categorizationRefreshCount == null
              ? "—"
              : formatNumber(account.categorizationRefreshCount)}
          </dd>
        </dl>
      </div>
      {categories?.length ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-y border-charcoal/8 bg-charcoal/[0.025] text-charcoal/45">
                <tr>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    History pages
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/8">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="break-words px-5 py-3 font-medium">
                      {category.name}
                    </td>
                    <td className="px-5 py-3 text-charcoal/55">
                      {category.is_default ? "Default" : "Custom"}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {formatNumber(category.page_count)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {categories.some(
            (category) => category.name === "Other" && category.page_count > 0
          ) ? (
            <p className="border-t border-charcoal/8 px-5 py-3 text-xs text-charcoal/50">
              Pages in Other are not covered by this account’s named categories.
            </p>
          ) : null}
        </>
      ) : (
        <EmptyState
          title={categories ? "No categories yet" : "Category data unavailable"}
          description={
            categories
              ? "Categories appear after categorization has been enabled for this account."
              : "The server did not return category data for this account."
          }
        />
      )}
    </Panel>
  );
}
