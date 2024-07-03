'use client'

import React, { useState } from 'react';
import ProcedureInfoBox from './components/ProcedureInfoBox';
import Agreement from './components/procedures/Agreement';
import PhoneNumberValidation from './components/procedures/PhoneNumberValidation';
import NickNameValidation from './components/procedures/NickNameValidation';

export default function AgreementPage() {

  const [procedure, setProcedure] = useState('agreement')
  const [finalAgreement, setFinalAgreement] = useState<boolean>(Boolean)
  const [finalPhoneNumber, setFinalPhoneNumber] = useState<string>(String)

  return (
    <div className="signUpContainer w-full h-dvh flex flex-col items-center justify-start">
      <ProcedureInfoBox procedure={procedure} />
      {
        procedure === 'agreement' && <Agreement setProcedure={setProcedure} setFinalAgreement={setFinalAgreement} /> ||
        procedure === 'phone' && <PhoneNumberValidation setProcedure={setProcedure} setFinalPhoneNumber={setFinalPhoneNumber} /> ||
        procedure === 'nickname' && <NickNameValidation finalAgreement={finalAgreement} finalPhoneNumber={finalPhoneNumber} />
      }
    </div>
  );
}
