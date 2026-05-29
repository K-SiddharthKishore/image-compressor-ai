/**
 * Site footer with branding and links.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto w-full py-8 text-center"
      role="contentinfo"
    >
      <div className="glass glass-dark mx-auto max-w-6xl rounded-2xl px-6 py-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          &copy; {year}{' '}
          <span className="font-semibold gradient-text">CompressAI</span>
          {' '}&mdash; Free, private, browser-based image compression.
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
          Your images never leave your device. No uploads, no servers.
        </p>
      </div>
    </footer>
  )
}
