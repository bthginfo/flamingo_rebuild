/**
 * Standalone layout for template previews — no MarketingShell (no Flamingo header/marquee/footer),
 * so tenant navigation and interactions behave like a real site preview.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="preview-root">{children}</div>;
}
