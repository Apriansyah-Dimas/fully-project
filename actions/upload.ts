'use server'

import { revalidatePath } from 'next/cache'
import { uploadFileToR2 } from '@/lib/storage/r2'

export interface UploadActionResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * Server Action for uploading files
 * This action handles file uploads and stores them in R2
 */
export async function uploadAction(formData: FormData): Promise<UploadActionResult> {
  try {
    // Get the file from the form data
    const file = formData.get('file') as File

    if (!file) {
      return {
        success: false,
        error: 'No file provided',
      }
    }

    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: 'File size exceeds 10MB limit',
      }
    }

    // Validate file type (only images for now)
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed',
      }
    }

    // Generate a unique key for the file
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const key = `uploads/${timestamp}-${randomString}.${fileExtension}`

    // Upload to R2
    const result = await uploadFileToR2({
      file,
      key,
      contentType: file.type,
    })

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Upload failed',
      }
    }

    // Revalidate the upload path if provided
    const uploadPath = formData.get('uploadPath') as string
    if (uploadPath) {
      revalidatePath(uploadPath)
    }

    return {
      success: true,
      url: result.url,
    }
  } catch (error) {
    console.error('[Upload Action] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
