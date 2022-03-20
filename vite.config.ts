import { defineConfig } from 'vite';
import react from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
