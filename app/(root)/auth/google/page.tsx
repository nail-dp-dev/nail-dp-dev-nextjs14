'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getGoogleAuthCode } from '../../../../api/auth/getGoogleAuthCode';

export default function GoogleAuth() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      getGoogleAuthCode(code, router)
    }
  }, [code, router]);
}