/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Cloudinary
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
  readonly VITE_CLOUDINARY_API_KEY?: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET?: string;
  readonly VITE_CLOUDINARY_BASE_URL?: string;

  // Firebase
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;

  // Google Sheets
  readonly VITE_SHEET_ID?: string;
  readonly VITE_SHEETS_API_KEY?: string;

  [key: string]: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

