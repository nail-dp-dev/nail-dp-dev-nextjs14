'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getKakaoAuthCode } from '../../../../api/auth/getKakaoAuthCode';

export default function KakaoAuth() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      getKakaoAuthCode(code, router)
    }
  }, [code, router]);
}