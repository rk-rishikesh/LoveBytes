import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack: (config) => {
     config.externals.push({
       'node:crypto': 'crypto',
     });
     return config;
  },
};

export default nextConfig;
