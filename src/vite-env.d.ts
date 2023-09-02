/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_WHS_URL: string;
  readonly POCKETBASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
