/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_WEBSOOKER_URL: string;
  readonly VITE_POCKETBASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
