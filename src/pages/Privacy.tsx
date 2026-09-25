import { ArrowRight } from "lucide-react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
        {title}
      </h2>
      <div className="h-px bg-clay/40 mb-4" />
      <div className="text-sm text-charcoal/70 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <ArrowRight className="w-3 h-3 text-sage mt-1 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium text-sage uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-charcoal/50">
          Effective Date: 4 September, 2026
        </p>
        <div className="h-px bg-clay/40 mt-6" />
      </div>

      <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
        This Privacy Policy explains what information SurfMind processes, why it
        is processed, where it is stored, and the controls available to you when
        you use our Chrome and Edge extension.
      </p>

      <Section title="1. Information We Collect">
        <ul className="space-y-1.5">
          <Li>URLs, page titles, and timestamps from websites you visit.</Li>
          <Li>
            Bookmark titles, URLs, folders, domains, and the time a bookmark was
            added.
          </Li>
          <Li>
            Page headings and extracted text sections used to make visited and
            bookmarked pages searchable.
          </Li>
          <Li>
            Search queries, generated answers, matched sources, and recent
            search records.
          </Li>
          <Li>
            A randomly generated browser identifier and cross-browser linking
            status. SurfMind does not require a login or your name to create
            this identifier.
          </Li>
          <Li>
            Standard request information, such as an IP address, may be
            processed in server logs for security, reliability, and abuse
            prevention.
          </Li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="space-y-1.5">
          <Li>
            To index and search your browsing history and bookmarks using
            natural-language and similarity search.
          </Li>
          <Li>
            To generate answers, display matched sources, and provide recent
            search results without repeating a query.
          </Li>
          <Li>
            To synchronize searchable data between browsers that you
            intentionally link with a one-time code.
          </Li>
          <Li>
            To maintain, secure, troubleshoot, and improve the reliability of
            SurfMind.
          </Li>
        </ul>
      </Section>

      <Section title="3. Data Storage and Transmission">
        <p className="font-medium text-charcoal/80 mb-2">Local Storage</p>
        <ul className="space-y-1.5 mb-4">
          <Li>
            SurfMind uses browser local storage for pending browsing records,
            extracted bookmark content, synchronization state, settings, and
            your random browser identifier.
          </Li>
        </ul>
        <p className="font-medium text-charcoal/80 mb-2">
          Data Transmission to Server
        </p>
        <ul className="space-y-1.5">
          <Li>
            Browsing data is sent to SurfMind's servers in batches after
            synchronization thresholds are reached, during scheduled background
            checks, when relevant extension views are opened, or immediately
            before a search. It is not limited to the moment you submit a
            search.
          </Li>
          <Li>
            Synchronized records may include URLs, titles, timestamps, bookmark
            metadata, headings, and extracted page text. Search requests include
            your query, selected search mode, and random browser identifier.
          </Li>
          <Li>We use HTTPS to ensure secure data transmission.</Li>
        </ul>
        <p className="font-medium text-charcoal/80 mt-4 mb-2">
          Server and Service-Provider Processing
        </p>
        <ul className="space-y-1.5">
          <Li>
            SurfMind stores synchronized records and search indexes, including
            vector embeddings, on its servers so similarity search can work.
          </Li>
          <Li>
            Search queries and relevant retrieved content may be processed by
            infrastructure, database, embedding, and AI service providers only
            as needed to operate SurfMind.
          </Li>
          <Li>
            SurfMind does not sell your browsing data or use it for targeted
            advertising.
          </Li>
        </ul>
      </Section>

      <Section title="4. Data Retention">
        <ul className="space-y-1.5">
          <Li>
            Local browsing records are limited on a rolling basis to avoid
            excessive storage use. Pending records remain locally until they are
            synchronized or cleared.
          </Li>
          <Li>
            Server-side history and bookmark records are retained according to
            SurfMind's current account limits. Older records may be removed as
            newer records are added.
          </Li>
          <Li>
            Recent searches, generated answers, and matched sources remain
            available until they expire under our retention rules or you use a
            relevant clearing control.
          </Li>
          <Li>
            When associated history or bookmark records are deleted, their
            search-index entries and embeddings are also scheduled for removal.
          </Li>
        </ul>
      </Section>

      <Section title="5. Security Measures">
        <ul className="space-y-1.5">
          <Li>
            We use secure methods to handle your data both locally and on our
            servers.
          </Li>
          <Li>
            Data on our servers is managed using appropriate technology for each
            user to ensure data separation and security.
          </Li>
          <Li>
            No method of storage or transmission is completely secure, but we
            take reasonable steps designed to protect the information SurfMind
            processes.
          </Li>
        </ul>
      </Section>

      <Section title="6. Permission Justifications">
        <ul className="space-y-3">
          <Li>
            <strong className="text-charcoal/90">Tabs</strong> — Required to
            track and save URLs of visited websites for building a comprehensive
            browsing history.
          </Li>
          <Li>
            <strong className="text-charcoal/90">Storage</strong> — Needed to
            store browsing data locally on your device, ensuring data
            availability and security.
          </Li>
          <Li>
            <strong className="text-charcoal/90">WebNavigation</strong> — Allows
            tracking of web navigation events to record detailed browsing
            history.
          </Li>
          <Li>
            <strong className="text-charcoal/90">Bookmarks</strong> — Reads
            bookmark metadata and listens for bookmark changes so saved pages
            can be searched.
          </Li>
          <Li>
            <strong className="text-charcoal/90">Alarms</strong> — Schedules
            reliable background checks for pending history and bookmark
            synchronization.
          </Li>
          <Li>
            <strong className="text-charcoal/90">Side Panel</strong> — Displays
            SurfMind beside the page you are browsing.
          </Li>
          <Li>
            <strong className="text-charcoal/90">Unlimited Storage</strong> —
            Allows pending page sections and bookmark content to remain
            available locally until synchronization or deletion.
          </Li>
          <Li>
            <strong className="text-charcoal/90">
              All URLs and content scripts
            </strong>{" "}
            — Allow SurfMind to extract readable headings and text from
            supported pages you visit or bookmark. Chrome and Edge block access
            to restricted browser pages.
          </Li>
        </ul>
      </Section>

      <Section title="7. Cross-Browser Sync">
        <ul className="space-y-1.5">
          <Li>
            Linking browsers with a one-time code associates them with the same
            anonymous synchronization account. Searchable history, bookmarks,
            and recent-search information can then be available across those
            linked browsers.
          </Li>
          <Li>
            Unlinking a browser stops that browser from using the shared account
            going forward; unlinking is separate from deleting data.
          </Li>
        </ul>
      </Section>

      <Section title="8. Your Choices and Data Deletion">
        <ul className="space-y-1.5">
          <Li>
            Clear History removes SurfMind history and its search index locally
            and from the server. Bookmarks and recent searches are kept.
          </Li>
          <Li>
            Clear All Data removes SurfMind history, bookmarks, recent searches,
            local settings, and the existing anonymous browser identifier. If
            browsers are linked, this can remove shared data for every linked
            browser.
          </Li>
          <Li>
            Use Clear All Data before uninstalling SurfMind if you also want
            server-side data removed. Uninstalling alone removes extension data
            from that browser but may not identify server-side records for
            deletion.
          </Li>
        </ul>
      </Section>

      <Section title="9. Changes to This Privacy Policy">
        <ul className="space-y-1.5">
          <Li>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by updating the "Effective Date" at the top of
            this policy. We encourage you to review it periodically.
          </Li>
        </ul>
      </Section>

      <Section title="10. Contact Us">
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:support@docschat.in"
            className="text-charcoal underline underline-offset-2 hover:text-sage transition-colors"
          >
            support@docschat.in
          </a>
          .
        </p>
      </Section>

      <div className="h-px bg-clay/40 mt-10 mb-6" />
      <p className="text-xs text-charcoal/40">
        By using SurfMind, you acknowledge and agree to this Privacy Policy.
      </p>
    </div>
  );
}
