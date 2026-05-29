/**
 * Formats a byte count into a human-readable string.
 * @param {number} bytes - File size in bytes
 * @param {number} [decimals=2] - Decimal places to show
 * @returns {string} Formatted size (e.g. "1.24 MB")
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

/**
 * Calculates the percentage of size saved after compression.
 * @param {number} originalSize - Original file size in bytes
 * @param {number} compressedSize - Compressed file size in bytes
 * @returns {number} Percentage saved (0–100)
 */
export function calculateSavedPercent(originalSize, compressedSize) {
  if (originalSize === 0) return 0
  const saved = ((originalSize - compressedSize) / originalSize) * 100
  return Math.max(0, Math.round(saved * 10) / 10)
}
