import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UploadZone from './components/UploadZone'
import CompressionPanel from './components/CompressionPanel'
import Toast from './components/Toast'
import { useTheme } from './hooks/useTheme'
import { useToast } from './hooks/useToast'
import { useImageCompression } from './hooks/useImageCompression'
import { validateImageFile } from './utils/fileValidation'
import { downloadFile } from './utils/downloadFile'

/** App status state machine */
const STATUS = {
  IDLE: 'idle',
  UPLOADED: 'uploaded',
  COMPRESSING: 'compressing',
  DONE: 'done',
  ERROR: 'error',
}

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const { toasts, addToast, removeToast } = useToast()
  const { compress, isCompressing } = useImageCompression()

  const [file, setFile] = useState(null)
  const [compressedFile, setCompressedFile] = useState(null)
  const [quality, setQuality] = useState(0.8)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [originalUrl, setOriginalUrl] = useState(null)
  const [compressedUrl, setCompressedUrl] = useState(null)

  const debounceRef = useRef(null)

  // Revoke object URLs on cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl)
      if (compressedUrl) URL.revokeObjectURL(compressedUrl)
    }
  }, [originalUrl, compressedUrl])

  const runCompression = useCallback(
    async (targetFile, targetQuality) => {
      setStatus(STATUS.COMPRESSING)
      try {
        const result = await compress(targetFile, targetQuality)
        setCompressedFile(result)
        setCompressedUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return URL.createObjectURL(result)
        })
        setStatus(STATUS.DONE)
        addToast('Image compressed successfully!', 'success')
      } catch (err) {
        setStatus(STATUS.ERROR)
        addToast(
          err instanceof Error ? err.message : 'Compression failed. Please try again.',
          'error'
        )
      }
    },
    [compress, addToast]
  )

  const handleFileSelect = useCallback(
    async (selectedFile) => {
      const validation = validateImageFile(selectedFile)
      if (!validation.valid) {
        addToast(validation.error, 'error')
        return
      }

      // Reset previous state
      setCompressedFile(null)
      setCompressedUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      setOriginalUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return URL.createObjectURL(selectedFile)
      })

      setFile(selectedFile)
      setStatus(STATUS.UPLOADED)
      addToast(`"${selectedFile.name}" uploaded`, 'info', 3000)

      await runCompression(selectedFile, quality)
    },
    [addToast, quality, runCompression]
  )

  const handleQualityChange = useCallback(
    (newQuality) => {
      setQuality(newQuality)
      if (!file) return

      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        runCompression(file, newQuality)
      }, 300)
    },
    [file, runCompression]
  )

  const handleDownload = useCallback(() => {
    if (!compressedFile) return
    downloadFile(compressedFile)
    addToast('Download started!', 'success', 3000)
  }, [compressedFile, addToast])

  const handleReset = useCallback(() => {
    clearTimeout(debounceRef.current)
    setFile(null)
    setCompressedFile(null)
    setQuality(0.8)
    setStatus(STATUS.IDLE)
    setOriginalUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setCompressedUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    addToast('Ready for a new image', 'info', 2000)
  }, [addToast])

  const showUpload = status === STATUS.IDLE
  const showPanel = file && status !== STATUS.IDLE

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-violet-950/20 dark:to-slate-950">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-60 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        <main id="compressor" className="flex-1 py-8 sm:py-12">
          {/* Hero section */}
          <section className="mb-10 text-center animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Compress Images{' '}
              <span className="gradient-text">Instantly</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
              Reduce image file sizes without leaving your browser.
              Fast, free, and completely private — your files never touch a server.
            </p>
          </section>

          {/* Compressor card */}
          <section
            className="glass glass-dark mx-auto max-w-3xl rounded-3xl p-6 sm:p-8"
            aria-label="Image compressor tool"
          >
            {showUpload && (
              <UploadZone onFileSelect={handleFileSelect} disabled={isCompressing} />
            )}

            {showPanel && (
              <CompressionPanel
                file={file}
                compressedFile={compressedFile}
                originalUrl={originalUrl}
                compressedUrl={compressedUrl}
                quality={quality}
                onQualityChange={handleQualityChange}
                onDownload={handleDownload}
                onReset={handleReset}
                isCompressing={isCompressing || status === STATUS.COMPRESSING}
              />
            )}
          </section>

          {/* Feature highlights */}
          <section
            className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
            aria-label="Features"
          >
            {[
              { icon: '🔒', title: '100% Private', desc: 'All processing happens locally in your browser' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Web Worker compression for smooth performance' },
              { icon: '🎨', title: 'Quality Control', desc: 'Fine-tune compression with the quality slider' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass glass-dark rounded-2xl p-5 text-center transition hover:scale-[1.02] animate-fade-in"
              >
                <span className="text-2xl" role="img" aria-hidden="true">{feature.icon}</span>
                <h3 className="mt-2 font-semibold text-slate-800 dark:text-white">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </section>
        </main>

        <Footer />
      </div>

      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  )
}
