import { defineConfig } from 'vite';
import react from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 3000,
  },

  build: {
    minify: false,
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
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
