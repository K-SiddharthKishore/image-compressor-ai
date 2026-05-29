import QualitySlider from './QualitySlider'
import FileStats from './FileStats'
import ImagePreview from './ImagePreview'
import ActionButtons from './ActionButtons'
import LoadingSpinner from './LoadingSpinner'

/**
 * Panel shown after upload — quality controls, preview, stats, and actions.
 */
export default function CompressionPanel({
  file,
  compressedFile,
  originalUrl,
  compressedUrl,
  quality,
  onQualityChange,
  onDownload,
  onReset,
  isCompressing,
}) {
  return (
    <div className="relative animate-slide-up space-y-6">
      {isCompressing && <LoadingSpinner />}

      <ImagePreview
        originalUrl={originalUrl}
        compressedUrl={compressedUrl}
        fileName={file?.name ?? 'image'}
      />

      {compressedFile && (
        <FileStats
          originalSize={file.size}
          compressedSize={compressedFile.size}
        />
      )}

      <QualitySlider
        quality={quality}
        onChange={onQualityChange}
        disabled={isCompressing}
      />

      {compressedFile && (
        <ActionButtons
          onDownload={onDownload}
          onReset={onReset}
          disabled={isCompressing}
        />
      )}
    </div>
  )
}
