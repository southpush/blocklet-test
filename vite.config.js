import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
    const envMap = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            vue(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: envMap.APP_TITLE,
                    },
                },
            }),
            createBlockletPlugin(),
            WindiCSS()
        ],
        resolve: {
            alias: {
                "@": "/src"
            }
        },
        server: {
            proxy: {
                "/blockchain": {
                    target: "https://blockchain.info",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/blockchain/, "")
                }
            }
        }
    };
});
