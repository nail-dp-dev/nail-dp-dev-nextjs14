
import React from 'react';
import ProcedureInfoBox from './components/ProcedureInfoBox';
import Agreement from './components/procedures/Agreement';

export default function AgreementPage() {

  return (
    <div className="BuyContainer w-full h-dvh flex flex-col items-center justify-start">
      <ProcedureInfoBox />
      <Agreement/>
    </div>
  );
}
