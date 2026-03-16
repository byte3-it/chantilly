export interface ImageFile {
  id: string
  url: string
  name: string
  createdAt?: string
}

export interface FileManagerConfig {
  listImages: () => Promise<ImageFile[]>
  uploadImage: (file: File) => Promise<ImageFile>
  deleteImage: (id: string) => Promise<void>
}
