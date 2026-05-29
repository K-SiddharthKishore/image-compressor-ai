/**
 * Compression quality slider (0.1 – 1.0).
 */
export default function QualitySlider({ quality, onChange, disabled = false }) {
  const percent = Math.round(quality * 100)

  return (
    <div className="w-full" role="group" aria-label="Compression quality settings">
      <div className="mb-3 flex items-center justify-between">
        <label
          htmlFor="quality-slider"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Compression Quality
        </label>
        <span
          className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-0.5 text-xs font-bold text-white"
          aria-live="polite"
        >
          {percent}%
        </span>
      </div>

      <input
        id="quality-slider"
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={quality}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-violet-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700"
        aria-valuemin={10}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`Compression quality ${percent} percent`}
      />

      <div className="mt-1.5 flex justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>Smaller file</span>
        <span>Better quality</span>
      </div>
    </div>
  )
}
