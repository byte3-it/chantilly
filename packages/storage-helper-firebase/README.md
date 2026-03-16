# @byte3-it/lpb-storage-firebase

Firebase Storage helper for [`@byte3-it/landing-page-builder`](../../README.md).

Stores and serves images from a **Firebase Storage** bucket, with a prefix to keep multiple apps or environments isolated.

## Install

```bash
npm install @byte3-it/lpb-storage-firebase firebase
```

## Usage

```tsx
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { createFirebaseStorageHelper } from '@byte3-it/lpb-storage-firebase'
import { LandingPageBuilder } from '@byte3-it/landing-page-builder'

const app = initializeApp({ /* your firebase config */ })

const helper = createFirebaseStorageHelper({
  storage: getStorage(app),
  prefix:  'my-app',   // images stored under 'my-app/images/'
})

export default function Editor() {
  return (
    <LandingPageBuilder
      fileManager={helper.fileManager}
      onSave={...}
    />
  )
}
```

## Config

| Option | Type | Description |
|---|---|---|
| `storage` | `FirebaseStorage` | From `getStorage()` |
| `prefix` | `string` | Namespace for all images (e.g. `"acme-prod"`) |

Images are stored under `{prefix}/images/` in the bucket.

## Helper API

| Member | Signature | Description |
|---|---|---|
| `fileManager` | `FileManagerConfig` | Pass directly to the builder's `fileManager` prop |

`fileManager` implements `listImages`, `uploadImage`, and `deleteImage` against Firebase Storage.

## Firebase Security Rules

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{prefix}/images/{filename} {
      allow read, write: if request.auth != null;
    }
  }
}
```
