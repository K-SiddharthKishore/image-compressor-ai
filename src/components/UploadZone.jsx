import { useCallback, useRef, useState } from 'react'
import { ACCEPT_STRING } from '../utils/fileValidation'

/**
 * Drag-and-drop upload zone with file picker and empty state.
 */
export default function UploadZone({ onFileSelect, disabled = false }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (files) => {
      if (disabled || !files?.length) return
      onFileSelect(files[0])
    },
    [disabled, onFileSelect]
  )

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const handleInputChange = useCallback(
    (e) => {
      handleFiles(e.target.files)
      e.target.value = ''
    },
    [handleFiles]
  )

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openFilePicker()
    }
  }

  return (
    <div
      role="region"
      aria-label="Image upload area"
      className={`relative rounded-2xl border-2 border-dashed p-8 transition-all duration-300 sm:p-12 ${
        isDragging
          ? 'scale-[1.02] border-violet-500 bg-violet-50/50 ring-4 ring-violet-500/20 dark:bg-violet-950/30'
          : 'border-slate-300 hover:border-violet-400 hover:bg-violet-50/30 dark:border-slate-600 dark:hover:border-violet-500 dark:hover:bg-violet-950/20'
      } ${disabled ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFilePicker}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_STRING}
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Choose image file"
        disabled={disabled}
      />

      {/* Empty state */}
      <div className="flex flex-col items-center text-center animate-fade-in">
        <div
          className={`mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 transition-transform duration-300 ${
            isDragging ? 'scale-110' : ''
          }`}
        >
          <svg
            className="h-10 w-10 text-violet-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          or{' '}
          <span className="font-medium text-violet-600 dark:text-violet-400">
            browse files
          </span>{' '}
          from your device
        </p>
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
          Supports JPG, PNG, JPEG, WEBP &bull; Max 25 MB
        </p>
      </div>
    </div>
  )
}
