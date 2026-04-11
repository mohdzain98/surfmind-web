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
          Effective Date: 14 July, 2024
        </p>
        <div className="h-px bg-clay/40 mt-6" />
      </div>

      <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
        SurfMind is committed to protecting your privacy. This Privacy Policy
        outlines how we collect, use, and safeguard your information when you
        use our Chrome extension.
      </p>

      <Section title="1. Information We Collect">
        <ul className="space-y-1.5">
          <Li>URLs of websites you visit</Li>
          <Li>Timestamps of your visits</Li>
          <Li>Content snippets from visited pages</Li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="space-y-1.5">
          <Li>
            To allow you to search your browsing history based on specific
            topics or keywords.
          </Li>
        </ul>
      </Section>

      <Section title="3. Data Storage and Transmission">
        <p className="font-medium text-charcoal/80 mb-2">Local Storage</p>
        <ul className="space-y-1.5 mb-4">
          <Li>
            Your browsing history data is stored locally on your device using
            Chrome local storage. This ensures your data remains private and
            secure.
          </Li>
        </ul>
        <p className="font-medium text-charcoal/80 mb-2">
          Data Transmission to Server
        </p>
        <ul className="space-y-1.5">
          <Li>
            Data is only transmitted to our server when you perform a search
            action. This minimises unnecessary data transfer and reduces server
            load.
          </Li>
          <Li>We use HTTPS to ensure secure data transmission.</Li>
        </ul>
      </Section>

      <Section title="4. Data Retention">
        <ul className="space-y-1.5">
          <Li>
            We keep only a limited period of browsing data locally to prevent
            excessive data accumulation. Older data is removed based on a
            predefined retention period.
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
            <strong className="text-charcoal/90">Scripting</strong> — Enables
            injection of scripts to extract content from visited web pages.
          </Li>
          <Li>
            <strong className="text-charcoal/90">ActiveTab</strong> — Provides
            access to the currently active tab for real-time data extraction and
            search functionality.
          </Li>
          <Li>
            <strong className="text-charcoal/90">All URLs</strong> — Necessary
            to access all URLs you visit to ensure comprehensive data collection
            for the browsing history feature.
          </Li>
        </ul>
      </Section>

      <Section title="7. Your Choices">
        <ul className="space-y-1.5">
          <Li>
            You can clear your browsing history data at any time by using the
            clear data option in the extension settings.
          </Li>
        </ul>
      </Section>

      <Section title="8. Changes to This Privacy Policy">
        <ul className="space-y-1.5">
          <Li>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by updating the "Effective Date" at the top of
            this policy. We encourage you to review it periodically.
          </Li>
        </ul>
      </Section>

      <Section title="9. Contact Us">
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
