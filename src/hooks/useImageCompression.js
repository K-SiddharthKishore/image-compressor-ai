import { useCallback, useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'

/**
 * Hook for compressing images in the browser.
 * @returns {{
 *   compress: (file: File, quality: number) => Promise<File>,
 *   isCompressing: boolean,
 *   error: string | null,
 *   resetError: () => void
 * }}
 */
export function useImageCompression() {
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(false)

  const resetError = useCallback(() => setError(null), [])

  const compress = useCallback(async (file, quality) => {
    abortRef.current = false
    setIsCompressing(true)
    setError(null)

    try {
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        initialQuality: quality,
        fileType: file.type,
      }

      const compressed = await imageCompression(file, options)

      if (abortRef.current) {
        throw new Error('Compression cancelled')
      }

      // Preserve original filename with compressed suffix
      const nameParts = file.name.split('.')
      const ext = nameParts.pop()
      const baseName = nameParts.join('.')
      const compressedFile = new File(
        [compressed],
        `${baseName}-compressed.${ext}`,
        { type: compressed.type || file.type, lastModified: Date.now() }
      )

      return compressedFile
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to compress image. Please try again.'
      setError(message)
      throw err
    } finally {
      setIsCompressing(false)
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current = true
  }, [])

  return { compress, isCompressing, error, resetError, cancel }
}
