/** Allowed MIME types for image upload */
export const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

/** Allowed file extensions (lowercase) */
export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

/** Maximum file size in bytes (25 MB) */
export const MAX_FILE_SIZE = 25 * 1024 * 1024

/** Accept string for file input */
export const ACCEPT_STRING = '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp'

/**
 * Validates an uploaded image file.
 * @param {File} file - The file to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' }
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  const isValidType =
    ALLOWED_TYPES.includes(file.type) || ALLOWED_EXTENSIONS.includes(extension)

  if (!isValidType) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, JPEG, or WEBP.',
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File is too large. Maximum size is 25 MB.',
    }
  }

  return { valid: true }
}
