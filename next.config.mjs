/** @type {import('postcss-load-config').Config} */
const postcssConfig = {
    plugins: {
      tailwindcss: {},
    },
  };
  
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
    postcss: postcssConfig,
  };
  
  export default nextConfig;
  