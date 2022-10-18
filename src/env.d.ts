/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_BLOCKCHAIN_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}