'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ProfileMiniModalProps } from '../../constants/interface'
import { profileMiniMenuElements } from '../../constants'
import { userProfileImageData } from '../../constants/example/index';
import PlusSvg from '../../public/assets/svg/thin-plus.svg'
import Image from 'next/image'

export default function ProfileMiniModal({ isMiniModalShow, setIsMiniModalShow }: ProfileMiniModalProps) {

  const modalRef = useRef<HTMLDivElement>(null);
  
  const [whichContent, setWhichContent] = useState('basic')
  
  const handleContentChange = (e:any, content:string) => {
    e.stopPropagation();
    setWhichContent(content);
  }

  const handleAddNewProfileImage = (e: any) => {
    e.stopPropagation();
    console.log('새로운 이미지 더하기...')
  }

  const handleChangeProfileImage = (e: any, url:string) => {
    e.stopPropagation();
    console.log('이 이미지로 바꿔주세요...', url)
  }

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsMiniModalShow(false)
    }
  }, [setIsMiniModalShow]);

  useEffect(() => {
    if (isMiniModalShow) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMiniModalShow, handleClickOutside]);
  
  return (
    <div
      ref={modalRef}
      className={`${isMiniModalShow ? 'opaticy-100 pointer-events-auto	' : 'opacity-0 pointer-events-none	'} absolute top-[35px] border-[1px] border-purple rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] left-[35px] w-[255px] h-[300px] flex items-center bg-profileImageChangeModalBackgroundColor z-[30] overflow-hidden transition-all`}>
      <div className='modalMenuDiv w-[80px] h-full flex flex-col gap-[9px] bg-menuLightGray px-[5px] py-[10px]'>
        {
          profileMiniMenuElements.map((item, index) => (
            <button
              key={index}
              className={`w-[70px] h-[20px] rounded-[20px] flex items-center justify-start px-[8px] text-darkPurple ${whichContent === item.data && 'bg-darkPurple text-white'} hover:bg-darkPurple hover:text-white transition-colors`}
              onClick={(e) => handleContentChange(e, item.data)}>
                <span className='text-[11px] font-[700]'>{item.name}</span>
            </button>
          ))
        }
      </div>
      {
        whichContent === 'basic' ?
          <div className='basicContentDiv flex-1 h-full py-[12px] px-[8px] flex-wrap flex items-start content-start justify-start gap-[10px] '>
            {/* 가 데이터 만들어지면 map fucntion */}
            <button
              className='w-[30px] h-[30px]'
              // 가 데이터 만들어지면 handleChangeProfileImage 함수 호출로 변경할 겁니다.
              onClick={(e) => { handleAddNewProfileImage(e) }}
            >
              <Image src={'/assets/img/etcProfileImage.png'} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' priority className='rounded-full '></Image>  
            </button>
          </div>
        :
          whichContent === 'icon' ?
            // 위의 basic component 처럼 가 데이터 생성시 map function 및 함수 호출 예정입니다.
            <div className='iconContentDiv flex-1 h-full py-[12px] px-[8px] flex-wrap flex items-start content-start justify-start gap-[10px] '>
              <Image src={'/assets/img/etcProfileImage.png'} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' priority className='rounded-full '></Image>  
              <Image src={'/assets/img/etcProfileImage.png'} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' priority className='rounded-full '></Image>  
              <Image src={'/assets/img/etcProfileImage.png'} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' priority className='rounded-full '></Image>  
            </div>
        :
          whichContent === 'custom' &&
            <div className='customContentDiv flex-1 h-full py-[12px] px-[8px] flex-wrap flex items-start content-start justify-start gap-[10px] '>
              <button className='w-[30px] h-[30px] rounded-full flex items-center justify-center bg-lightGray hover:bg-purple group' onClick={(e) => handleAddNewProfileImage(e)}>
                <PlusSvg className='fill-current stroke-current stroke-purple fill-purple group-hover:stroke-white group-hover:fill-white'/>
              </button>
              {
                userProfileImageData.photos.map((item, index) => (
                  <button
                    key={index}
                    className='w-[30px] h-[30px]'
                    onClick={(e)=>handleChangeProfileImage(e,item.photo_url)}
                  >
                    <Image src={item.photo_url} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' priority className='rounded-full '></Image>  
                  </button>
                )
              )}
            </div>
      }
    </div>
  )
}