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

import { ArrowRight } from "lucide-react";

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <ArrowRight className="w-3 h-3 text-sage mt-1 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-medium text-sage uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-charcoal/50">
          Effective Date: 4 September, 2026
        </p>
        <div className="h-px bg-clay/40 mt-6" />
      </div>

      <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
        Please read these Terms of Service carefully before using the SurfMind
        Chrome extension. By installing or using SurfMind, you agree to be bound
        by these terms.
      </p>

      <Section title="1. Acceptance of Terms">
        <p>
          By installing, accessing, or using SurfMind, you agree to these Terms
          of Service and our Privacy Policy. If you do not agree, please
          uninstall the extension and discontinue use.
        </p>
      </Section>

      <Section title="2. Description of Service">
        <p>SurfMind is a Chrome extension that:</p>
        <ul className="space-y-1.5 mt-2">
          <Li>
            Automatically tracks and logs websites you visit and bookmarks you
            save.
          </Li>
          <Li>
            Stores pending browsing data locally and synchronizes searchable
            records with SurfMind's servers.
          </Li>
          <Li>
            Sends data in batches, during scheduled background checks, when
            relevant features are opened, and before searches.
          </Li>
          <Li>
            Uses AI and vector search technology to retrieve relevant results
            from your history.
          </Li>
        </ul>
      </Section>

      <Section title="3. User Responsibilities">
        <p>By using SurfMind, you agree to:</p>
        <ul className="space-y-1.5 mt-2">
          <Li>
            Use the extension only for lawful purposes and in accordance with
            these Terms.
          </Li>
          <Li>
            Not attempt to reverse-engineer, decompile, or tamper with the
            extension.
          </Li>
          <Li>
            Not use SurfMind to infringe upon the intellectual property rights
            of others.
          </Li>
          <Li>
            Take responsibility for any actions taken based on search results
            provided by SurfMind.
          </Li>
        </ul>
      </Section>

      <Section title="4. Data and Privacy">
        <ul className="space-y-1.5">
          <Li>
            Browsing data may be stored locally and on SurfMind's servers as
            described in our Privacy Policy.
          </Li>
          <Li>
            Infrastructure, database, embedding, and AI providers may process
            data only as needed to operate the service. We use HTTPS for data
            transmission.
          </Li>
          <Li>
            You can clear history or all SurfMind data through the extension
            settings. Deletion may apply across intentionally linked browsers.
          </Li>
        </ul>
      </Section>

      <Section title="5. Intellectual Property">
        <ul className="space-y-1.5">
          <Li>
            SurfMind and all associated content, features, and functionality are
            owned by the developer and are protected by applicable intellectual
            property laws.
          </Li>
          <Li>
            You are granted a limited, non-exclusive, non-transferable licence
            to use the extension for personal, non-commercial purposes.
          </Li>
          <Li>
            You may not reproduce, distribute, or create derivative works of
            SurfMind without explicit written permission.
          </Li>
        </ul>
      </Section>

      <Section title="6. Disclaimers">
        <ul className="space-y-1.5">
          <Li>
            SurfMind is provided "as is" without warranties of any kind, express
            or implied.
          </Li>
          <Li>
            We do not guarantee that the extension will be error-free,
            uninterrupted, or that search results will be complete or accurate.
          </Li>
          <Li>
            We are not responsible for any loss of data, whether stored locally
            or on our servers.
          </Li>
        </ul>
      </Section>

      <Section title="7. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages
          arising from your use of SurfMind, even if we have been advised of the
          possibility of such damages.
        </p>
      </Section>

      <Section title="8. Modifications to the Service">
        <ul className="space-y-1.5">
          <Li>
            We reserve the right to modify, suspend, or discontinue SurfMind at
            any time without notice.
          </Li>
          <Li>
            We may update these Terms from time to time. Continued use after
            changes constitutes acceptance of the revised Terms.
          </Li>
          <Li>
            We will update the "Effective Date" at the top when changes are
            made.
          </Li>
        </ul>
      </Section>

      <Section title="9. Termination">
        <p>
          We reserve the right to terminate or restrict your access to SurfMind
          at any time, for any reason, without notice. Upon termination, all
          licences granted to you will immediately cease.
        </p>
      </Section>

      <Section title="10. Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with
          applicable laws. Any disputes arising from these Terms or your use of
          SurfMind shall be subject to the exclusive jurisdiction of the
          competent courts.
        </p>
      </Section>

      <Section title="11. Contact Us">
        <p>
          If you have any questions about these Terms, please contact us at{" "}
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
        By using SurfMind, you acknowledge that you have read, understood, and
        agree to be bound by these Terms of Service.
      </p>
    </div>
  );
}
