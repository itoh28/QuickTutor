/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://quicktutor.work/api/:path*',
      },
    ];
  },
};

export default nextConfig;
