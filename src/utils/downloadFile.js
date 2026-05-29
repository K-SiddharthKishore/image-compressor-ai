/**
 * Triggers a browser download for a File or Blob.
 * @param {File|Blob} file - The file to download
 * @param {string} [filename] - Optional override filename
 */
export function downloadFile(file, filename) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = filename ?? (file instanceof File ? file.name : 'compressed-image.jpg')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
