import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    sassOptions: {
      additionalData: `@use "scss/globals.module" as *;`, // Auto-import SCSS file globally
      includePaths: [path.join(__dirname, 'src'), path.join(__dirname, 'src')], // Resolve SCSS paths
    },
    images: {
      loader: 'custom',
      loaderFile: './loader/loader.ts',
    },
  }
   
  export default nextConfig