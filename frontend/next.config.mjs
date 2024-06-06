/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
