import { formatBytes, calculateSavedPercent } from '../utils/formatBytes'

/**
 * Displays original size, compressed size, and savings percentage.
 */
export default function FileStats({ originalSize, compressedSize }) {
  const savedPercent = calculateSavedPercent(originalSize, compressedSize)

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      role="region"
      aria-label="File size statistics"
      aria-live="polite"
    >
      <StatCard
        label="Original Size"
        value={formatBytes(originalSize)}
        color="slate"
      />
      <StatCard
        label="Compressed Size"
        value={formatBytes(compressedSize)}
        color="violet"
      />
      <StatCard
        label="Space Saved"
        value={`${savedPercent}%`}
        color="emerald"
        highlight
      />
    </div>
  )
}

function StatCard({ label, value, color, highlight = false }) {
  const colorMap = {
    slate: 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50',
    violet: 'border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30',
    emerald: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30',
  }

  return (
    <div
      className={`rounded-xl border p-4 text-center transition animate-fade-in ${colorMap[color]} ${
        highlight ? 'ring-2 ring-emerald-500/20' : ''
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p
        className={`mt-1 text-xl font-bold ${
          highlight
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-slate-800 dark:text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
