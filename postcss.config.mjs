/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', /* add any other modules that might be causing the error */);
    return config;
  },
};

export default config;
