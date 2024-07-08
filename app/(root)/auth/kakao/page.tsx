'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getKakaoAuthCode } from '../../../../api/auth/code/getKakaoAuthCode';
import { useDispatch } from 'react-redux';

export default function KakaoAuth() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter()
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      getKakaoAuthCode(code, router, dispatch)
    }
  }, [dispatch, code, router]);
}