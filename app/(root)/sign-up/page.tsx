'use client'

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import ProcedureInfoBox from './components/ProcedureInfoBox';
import Agreement from './components/procedures/Agreement';

export default function AgreementPage() {

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  console.log(code,'code....코드 보냄')

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:8080/api/auth/kakao/callback?code=${code}`, {
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
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [code]);

  return (
    <div className="BuyContainer w-full h-dvh flex flex-col items-center justify-start">
      <ProcedureInfoBox />
      <Agreement/>
    </div>
  );
}
