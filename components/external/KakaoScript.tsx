'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoScript() {
  const initializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  };

  useEffect(() => {
    if (window.Kakao) {
      initializeKakao();
    }
  }, []);

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={initializeKakao}
    />
  );
}
