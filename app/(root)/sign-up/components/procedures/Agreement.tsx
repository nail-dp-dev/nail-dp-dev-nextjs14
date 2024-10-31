'use client'

import { Suspense, useRef, useState } from 'react';
import { signUpConsentItems } from '../../../../../constants/index'
import CheckIcon from '../../../../../public/assets/svg/check.svg'
import InfoIcon from '../../../../../public/assets/svg/procedure_info.svg'
import { SignUpAgreementProps } from '../../../../../constants/interface';
import Loading from '../../../../loading';
import PrivacyPolicyComponent from '../../../../../components/desc/privacy-policy';
import TermsOfServiceComponent from '../../../../../components/desc/terms-of-service';
import ElectronicFinancialTransactionsComponent from '../../../../../components/desc/electronic-financial-transactions';
import PrivacyCollectionAgreementComponent from '../../../../../components/desc/privacy-collection-agreement';

export default function Agreement({setProcedure, setFinalAgreement}:SignUpAgreementProps) {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    signUpConsentItems.map(() => false)
  );
  const [whichInfo, setWhichInfo] = useState(0)
  const [isInfoShow, setIsInfoShow] = useState(false)
  const infoBox = useRef(null);
  const isSubmitEnabled = checkedItems[0] && checkedItems[1] && checkedItems[2];

  const handleAllCheck = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckedItems(signUpConsentItems.map(() => newCheckedState));
  };

  const handleItemCheck = (e: any, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    setAllChecked(newCheckedItems.every(item => item === true));
  };

  const handleItemInfoClick = (e: any, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    setWhichInfo(index)
    setIsInfoShow(true)
  }

  const handleItemInfoClose = (e: any, infoBox:any) => {
    e.preventDefault()
    e.stopPropagation()
    setIsInfoShow(false)
    infoBox.current.scrollTop = 0;
}

  const handleSubmit = (e: any, checkedItems: boolean[]) => {
    e.preventDefault()
    e.stopPropagation()
    if (checkedItems[0] && checkedItems[1] && checkedItems[2]) {
      setProcedure('phone')
      setFinalAgreement(checkedItems[3])
    } else {
      alert('필수 동의항목에 동의가 필요합니다.')
    }
  }
  
  return (
    <Suspense fallback={<Loading/>}>
    <div className='relative w-[440px] h-[450px] p-[20px] flex flex-col items-center justify-start bg-white rounded-[20px] shadow-signup-modal-shadow overflow-hidden'>
      <div
        className='allCheckBox w-[400px] h-[60px] flex items-center justify-start gap-[9px] p-[14px] mb-[45px] border-buttonDarkGray border-[2px] cursor-pointer rounded-[12px] group hover:border-purple transition-colors'
        onClick={handleAllCheck}
      >
        <button
          className={`allCheckBtn w-[30px] h-[30px] flex items-center justify-center border-buttonDarkGray border-[2px] rounded-[12px] ${allChecked ? 'bg-purple border-none' : 'group-hover:bg-purple group-hover:border-none'} transition-colors`}
        >
          {allChecked ? <CheckIcon fill='white' /> : <CheckIcon fill='white'/>}
        </button>
        <span className='h-[30px] text-[1.125rem] font-[700] text-center'>
          전체 동의하기
        </span>
      </div>
      <div className='checkBox w-[400px] h-[144px] flex flex-col items-start justify-between'>
        {signUpConsentItems.map((list, index) => (
          <div
            key={index}
            className='element w-[90%] mx-auto flex items-center justify-between cursor-pointer'
            onClick={(e) => handleItemCheck(e, index)}
          >
            <div className='flex items-center'>
              <div className={`checkBox w-[30px] h-[30px] flex items-center justify-center}`}>
                {checkedItems[index] && <CheckIcon fill={`${checkedItems[index] ? '#b98ce0' : 'buttonDarkGray'}`} />}
              </div>
              <span className='textBox h-[30px] flex items-center text-[1rem] text-textDarkPurple font-[500]'>
                {list.name}
              </span>
            </div>
            <button
              className='z-20 button-tr button-tr-tf'
              onClick={(e) => handleItemInfoClick(e, index)}
            >
              <InfoIcon/>
            </button>
          </div>
        ))}
      </div>
      <span className='descText text-[0.6875rem] text-textDarkPurple font-[500] mb-[78px]'>개인정보 수집 이용에 동의 하시면 더 편리한 이용이 가능합니다.</span>
      <button 
        className={`submitBtn w-[400px] h-[60px] button-layout  ${isSubmitEnabled ? 'button-color button-tr button-tr-tf' : ' bg-buttonDarkGray'}`}
        onClick={(e)=>handleSubmit(e, checkedItems)}
        disabled={!isSubmitEnabled}
        >
        <span className='text-[1.125rem]'>다음</span>
      </button>
      <div
        className={`absolute z-30 w-[400px] h-[410px] flex flex-col ${isInfoShow ? '' : 'translate-y-[-450px]'} transition-transform`}
      >
        <div
          className='w-full h-dvh bg-white overflow-hidden overflow-y-scroll'
          ref={infoBox}
          >
          { whichInfo === 0 && <TermsOfServiceComponent isSmall={true} />}
          { whichInfo === 1 && <PrivacyPolicyComponent isSmall={true} />}
          { whichInfo === 2 && <ElectronicFinancialTransactionsComponent isSmall={true} />}
          { whichInfo === 3 && <PrivacyCollectionAgreementComponent isSmall={true} />}
        
        <button 
            className='InfoCloseBtn w-[400px] h-[60px] button-color button-layout button-tr'
            onClick={(e) => handleItemInfoClose(e, infoBox)}
        >
          확인하고 나가기
        </button>
        </div>
      </div>
    </div>
    </Suspense>
  );
}