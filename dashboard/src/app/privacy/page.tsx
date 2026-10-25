import Link from "next/link";

const sections = [
  {
    title: "Data stored by the bot",
    body: "The bot uses a local SQLite database. Depending on the features enabled in a server, it can store server IDs and configuration; member, user, moderator, and target IDs; moderation case details, warning reasons, and timestamps; mute and timeout state; ticket channel and opener metadata; giveaway configuration; poll questions, options, and votes; XP, levels, message counts and timestamps; AFK reasons; autoresponder triggers and responses; and dashboard configuration changes. Feature records are associated with server IDs where applicable.",
  },
  {
    title: "Dashboard information",
    body: "The Next.js dashboard uses Discord OAuth scopes identify and guilds to identify the user and obtain their server list. Its server-side API checks access to the selected server. A separate aiohttp control center in this repository stores session and audit information including IP address and user-agent; it is distinct from the Next.js dashboard.",
  },
  {
    title: "Retention and deletion",
    body: "The audited source does not document a general retention period, automated cleanup schedule, data export procedure, or user-wide data deletion process. Some command-specific deletions exist, such as clearing warnings or removing AFK and autoresponder entries. Do not assume those actions erase all related records.",
  },
  {
    title: "Third-party services and permissions",
    body: "The code connects to Discord for bot operation and OAuth sign-in. The invite requests permission integer 1374792445014, a scoped set for audited moderation, role and channel, messaging, and interaction features; it excludes Administrator. The bot enables Server Members and Message Content gateway intents. Presence is disabled by default.",
  },
];

export const metadata = {
  title: "NEXUS privacy — draft for review",
  description: "A source-based draft describing data stored by the NEXUS Discord bot and dashboard.",
};

export default function PrivacyPage() {
  return (
    <main id="main" className="min-h-screen bg-[var(--bg-deep)] text-[var(--ice-silver)] px-5 sm:px-9 py-12 sm:py-16">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">← NEXUS home</Link>
        <header className="py-10 border-b border-[var(--glass-border)]">
          <p className="text-[11px] font-mono uppercase tracking-[.14em] text-[var(--accent)]">Policy draft</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-3">Privacy, described plainly.</h1>
          <p className="mt-3 text-[var(--text-muted)]">What the audited code stores and what it does not document.</p>
        </header>
        <div className="my-6 rounded-lg border border-[var(--warning)]/40 bg-[var(--glass-bg)] px-4 py-3 text-sm text-[var(--warning)]">Draft: requires human and legal review before publication.</div>
        <p className="leading-relaxed text-[var(--text-muted)]">This draft reflects a source review of NEXUS. It is not a complete privacy policy and does not establish retention, deletion, or legal commitments that were not found in the code.</p>
        <div className="divide-y divide-[var(--glass-border)]">
          {sections.map((section) => <section key={section.title} className="py-6"><h2 className="font-display text-2xl">{section.title}</h2><p className="mt-3 leading-relaxed text-[var(--text-muted)]">{section.body}</p></section>)}
          <section className="py-6"><h2 className="font-display text-2xl">Changes and contact</h2><p className="mt-3 leading-relaxed text-[var(--text-muted)]">The source does not identify a privacy contact address or a user-facing data-request process. Add an operator contact and a verified method to submit requests before publishing this page as a final policy.</p></section>
        </div>
        <p className="mt-5 text-xs text-[var(--text-faint)]">This text is an implementation summary, not legal advice or a substitute for a reviewed privacy notice.</p>
      </article>
    </main>
  );
}
