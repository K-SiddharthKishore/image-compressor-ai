import ThemeToggle from './ThemeToggle'

/**
 * Top navigation bar with branding and theme toggle.
 */
export default function Navbar({ isDark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 w-full">
      <nav
        className="glass glass-dark mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <a href="#" className="flex items-center gap-2.5 group" aria-label="CompressAI home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-lg transition group-hover:scale-105">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
            Compress<span className="gradient-text">AI</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="#compressor"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-violet-600 sm:block dark:text-slate-300 dark:hover:text-violet-400"
          >
            Compress
          </a>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </nav>
    </header>
  )
}
