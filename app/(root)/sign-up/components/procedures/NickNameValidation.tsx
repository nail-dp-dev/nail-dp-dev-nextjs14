'use client'

import React, { useState } from 'react'
import { SignUpNickNameProps } from '../../../../../constants/interface';
import { useRouter } from 'next/navigation';
import { getIsNickNameExist } from '../../../../../api/auth/getIsNIckNameExist';
import { postSignUpMember } from '../../../../../api/auth/postSignUpMember';


export default function NickNameValidation({ finalAgreement, finalPhoneNumber }: SignUpNickNameProps) {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [nicknameError, setNicknameError] = useState('')
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const forbiddenWords = (process.env.NEXT_PUBLIC_FORBIDDENWORDS ?? '').split(',').map(word => word.trim());

  const validateNickname = (nickname: string) => {
    const nicknameRegex = /^[가-힣a-zA-Z]{4,15}$/;
    if (!nicknameRegex.test(nickname)) {
      return '닉네임은 4~15자 한글 또는 영문 대소문자만 가능합니다.'
    }
    for (let word of forbiddenWords) {
      if (nickname.toLowerCase().includes(word)) {
        return '닉네임에 사용할 수 없는 단어가 포함되어 있습니다.'
      }
    }
    return ''
  }


  const handleNicknameChange = async (e:any) => {
    const value = e.target.value
    setNickname(value)

    const errorMessage = validateNickname(value)
    if (errorMessage) {
      setNicknameError(errorMessage)
      setIsNicknameAvailable(false)
      return
    }

    setNicknameError('')
    const available = await getIsNickNameExist(value)
    setIsNicknameAvailable(available)
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    e.stopPropagation()

    if (nicknameError || !isNicknameAvailable) {
      alert('닉네임을 다시 확인해주세요.')
      return
    }
    postSignUpMember({nickname, finalPhoneNumber, finalAgreement, router})
  }

  return (
    <div className='w-[440px] h-[450px] p-[20px] flex flex-col items-start justify-start bg-white rounded-[20px] shadow-signup-modal-shadow'>
      <div className='w-full h-[50px] px-[8px] flex items-center justify-between mb-[5px]'>
        <div>
          <span className='text-[1.125rem] font-[700]'>별명(닉네임)</span>
        </div>
        <div className='h-[30px] flex flex-col items-end justify-end'>
          <span className='text-[0.6875rem] text-textDarkPurple font-[400]'>(최대 15자)</span>
        </div>
      </div>
      <div className='w-[400px] h-[60px] pl-[15px] flex items-center justify-start border-purple border-[2px] rounded-[12px]'>
        <input
          className='w-[368px] h-[20px] text-[0.875rem] outline-none'
          placeholder='한글, 영문(소문자) 입력 가능'
          value={nickname}
          onChange={handleNicknameChange}
          maxLength={15}
        />
      </div>
      <div className='w-full h-[16px] px-[10px] mb-[50px]'>
        {nicknameError && <span className='text-[0.6875rem] text-red font-[400]'>{nicknameError}</span>}
        {!nicknameError && !isNicknameAvailable && nickname && (
          <span className='text-[0.6875rem] text-red font-[400]'>이미 존재하는 닉네임입니다.</span>
        )}
        {!nicknameError && isNicknameAvailable && (
          <span className='text-[0.6875rem] text-[#3f56ff] font-[400]'>사용 가능한 닉네임입니다.</span>
        )}
      </div>
      <div className='w-[301px] h-[48px] mb-[19px] text-textDarkPurple text-[1rem]'>
        <p className='font-[400]'>
          <span className='font-[700]'>{`'${nickname}'+@ `}</span>별명은 어떠세요?
        </p>
        <p>아직 아무도 사용하지 않은 별명이에요.</p>
      </div>
      <div className='w-[110px] h-[20px] mb-[73px]'>
        <p className='text-[0.875rem] text-textDarkPurple font-[700]'>다른 별명 추천받기</p>
      </div>
      <button
        className={`submitBtn w-[400px] h-[60px]  button-layout ${nicknameError === '' && isNicknameAvailable ? 'button-tr button-tr-tf button-color' :'bg-buttonDarkGray'}`}
        onClick={handleSubmit}
        disabled={nicknameError !== '' || !isNicknameAvailable}
      >
        <span className='text-[1.125rem]'>가입 완료하기</span>
      </button>
    </div>
  )
}
