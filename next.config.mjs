/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'helpx.adobe.com',
      },
      {
        protocol: 'https',
        hostname: 'instagram.ficn3-3.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'instagram.ficn3-4.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'ndpdevs3.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 't1.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
<<<<<<< HEAD
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
