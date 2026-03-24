import type { FileManagerConfig, ImageFile } from '@byte3-it/chantilly'

const MOCK_IMAGES: ImageFile[] = [
  { id: '1', url: 'https://picsum.photos/seed/alpha/800/400', name: 'landscape-alpha.jpg' },
  { id: '2', url: 'https://picsum.photos/seed/beta/800/400', name: 'landscape-beta.jpg' },
  { id: '3', url: 'https://picsum.photos/seed/gamma/800/600', name: 'portrait-gamma.jpg' },
  { id: '4', url: 'https://picsum.photos/seed/delta/600/600', name: 'square-delta.jpg' },
  { id: '5', url: 'https://picsum.photos/seed/epsilon/800/300', name: 'banner-epsilon.jpg' },
  { id: '6', url: 'https://picsum.photos/seed/zeta/400/400', name: 'thumbnail-zeta.jpg' },
]

// In-memory store that starts with mock images
let images = [...MOCK_IMAGES]
let nextId = 100

export const mockFileManager: FileManagerConfig = {
  listImages: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...images]
  },

  uploadImage: async (file: File) => {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    const id = String(++nextId)
    // Use a random picsum image as placeholder for the "uploaded" file
    const newImage: ImageFile = {
      id,
      url: `https://picsum.photos/seed/${id}/800/400`,
      name: file.name,
      createdAt: new Date().toISOString(),
    }
    images = [newImage, ...images]
    return newImage
  },

  deleteImage: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    images = images.filter((img) => img.id !== id)
  },
}
