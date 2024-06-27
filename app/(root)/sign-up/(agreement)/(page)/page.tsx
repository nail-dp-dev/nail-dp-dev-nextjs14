'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AgreementPage() {

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:8080/api/kakao/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [code]);

  return (
    <div className="BuyContainer w-full h-full">
      동의 페이지
      <Link href="/sign-up/phone">
        동의완료
      </Link>
    </div>
  );
}
