/**
 * Animated loading spinner shown during image compression.
 */
export default function LoadingSpinner({ message = 'Compressing your image...' }) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-violet-200 dark:border-violet-900" />
        <div className="absolute inset-0 animate-spin-slow rounded-full border-4 border-transparent border-t-violet-600 border-r-fuchsia-500" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse-slow">
        {message}
      </p>
    </div>
  )
}
