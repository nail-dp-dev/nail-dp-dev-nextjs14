'use client'

import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function NaverAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/naver/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .then(
        redirect('/sign-up')
      )
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [code]);
}