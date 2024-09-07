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
        hostname: 'k.kakaocdn.net',
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
=======
>>>>>>> c54c0ec (Revert "[FEAT] 토글/슬라이드 그림자 추가, 옵션모달ON일때 토글 다크보라 색상 유지, 중복검색X, 연관검색어 클릭시 마지막 단어에 적용Feature postdetailpage")
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
