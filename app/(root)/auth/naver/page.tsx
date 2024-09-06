'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getNaverAuthCode } from '../../../../api/auth/code/getNaverAuthCode';

export default function NaverAuth() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      getNaverAuthCode(code, router)
    }
  }, [code, router]);
}