"use client";

// Runs while the HTML is parsed, before first paint. On the client it renders inert (text/plain) so React
// doesn't warn about rendering a <script>; suppressHydrationWarning covers the type difference.
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
