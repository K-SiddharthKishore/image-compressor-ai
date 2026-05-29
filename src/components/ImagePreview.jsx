/**
 * Side-by-side image preview for original and compressed versions.
 */
export default function ImagePreview({ originalUrl, compressedUrl, fileName }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      role="region"
      aria-label="Image preview comparison"
    >
      <PreviewCard label="Original" src={originalUrl} alt={`Original ${fileName}`} />
      <PreviewCard
        label="Compressed"
        src={compressedUrl}
        alt={`Compressed ${fileName}`}
        gradient
      />
    </div>
  )
}

function PreviewCard({ label, src, alt, gradient = false }) {
  return (
    <div className="animate-fade-in overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <div
        className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
          gradient
            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white'
            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
        }`}
      >
        {label}
      </div>
      <div className="relative flex aspect-video items-center justify-center bg-slate-50 p-2 dark:bg-slate-900">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="max-h-64 max-w-full rounded-lg object-contain"
            loading="lazy"
          />
        ) : (
          <div className="h-32 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        )}
      </div>
    </div>
  )
}
