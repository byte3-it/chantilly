import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'
import type { FileManagerConfig, ImageFile } from '@byte3-it/landing-page-builder'

// ─── Public types ────────────────────────────────────────────────────────────

export interface FirebaseStorageHelperConfig {
  /** Storage instance from `getStorage()` */
  storage: FirebaseStorage
  /**
   * Folder prefix used to namespace images in the bucket.
   *
   * Examples:
   *   prefix: 'acme-prod'
   *     → Storage folder: 'acme-prod/images/'
   */
  prefix: string
}

export interface FirebaseStorageHelper {
  /**
   * Pass directly to `<LandingPageBuilder fileManager={helper.fileManager} />`.
   * Implements list / upload / delete against Firebase Storage.
   */
  fileManager: FileManagerConfig
}

// ─── Implementation ───────────────────────────────────────────────────────────

export function createFirebaseStorageHelper({
  storage,
  prefix,
}: FirebaseStorageHelperConfig): FirebaseStorageHelper {
  const imagesFolder = `${prefix}/images`

  const fileManager: FileManagerConfig = {
    listImages: async (): Promise<ImageFile[]> => {
      const folderRef = ref(storage, imagesFolder)
      const result = await listAll(folderRef)
      const images = await Promise.all(
        result.items.map(async (itemRef): Promise<ImageFile> => {
          const url = await getDownloadURL(itemRef)
          return {
            id: itemRef.fullPath,
            name: itemRef.name,
            url,
          }
        })
      )
      return images
    },

    uploadImage: async (file: File): Promise<ImageFile> => {
      const filename = `${Date.now()}_${file.name}`
      const imageRef = ref(storage, `${imagesFolder}/${filename}`)
      await uploadBytes(imageRef, file)
      const url = await getDownloadURL(imageRef)
      return {
        id: imageRef.fullPath,
        name: file.name,
        url,
        createdAt: new Date().toISOString(),
      }
    },

    deleteImage: async (id: string): Promise<void> => {
      // id is the full storage path (e.g. "acme-prod/images/1234_photo.jpg")
      const imageRef = ref(storage, id)
      await deleteObject(imageRef)
    },
  }

  return { fileManager }
}
