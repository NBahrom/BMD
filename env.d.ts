/// <reference types="vite/client" />

// Swiper ships stylesheets without type declarations; these silence the
// TS-only "side-effect import" error (TS2882) for `import 'swiper/css'` etc.
declare module 'swiper/css'
declare module 'swiper/css/*'
