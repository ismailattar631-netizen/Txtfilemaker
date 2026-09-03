/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.txtcraft.site',
          },
        ],
        destination: 'https://txtcraft.site/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;