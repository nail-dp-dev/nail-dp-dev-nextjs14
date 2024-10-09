'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ProfileMiniModalProps } from '../../../constants/interface'
import { basicProfileImageElements, iconProfileImageElements, profileMiniMenuElements } from '../../../constants'
import { useAppDispatch } from '../../../store/store';
import { setCommonModal } from '../../../store/slices/modalSlice';
import PlusSvg from '../../../public/assets/svg/thin-plus.svg'
import Image from 'next/image'
import { getUserProfileData } from '../../../api/user/getUserProfile';
import { patchUserProfile } from '../../../api/user/patchUserProfile';

export default function ProfileMiniModal({ isMiniModalShow, setIsMiniModalShow, setUserProfileUrl }: ProfileMiniModalProps) {
  
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  const [whichContent, setWhichContent] = useState('BASIC')
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleContentChange = (e:any, content:string) => {
    e.stopPropagation();
    setWhichContent(content);
  }

  const handleAddNewProfileImage = (e: any) => {
    e.stopPropagation();
    setIsMiniModalShow(false)
    dispatch(setCommonModal('profile-create'));
  }

  const handleChangeProfileImage = async (e: any, url:string) => {
    e.stopPropagation();
    const response = await patchUserProfile(url)
    if (response.code === 2001) {
      setUserProfileUrl(url)
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await getUserProfileData(whichContent);
        setData(response);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [whichContent]);
  
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
          loading ?
          <div className=' flex-1 h-full flex items-center justify-center'>loading....</div>
          :
          error ?
          <div className=' flex-1 h-full flex items-center justify-center'>error...occured</div>
          :
          whichContent === 'BASIC' && !loading && !error ?
          <div className='basicContentDiv flex-1 h-full py-[12px] px-[8px] flex-wrap flex items-start content-start justify-start gap-[10px] '>
            {
              basicProfileImageElements.map((item:any, index:any) => (
                <button
                  key={index}
                  className='w-[30px] h-[30px]'
                  onClick={(e)=>handleChangeProfileImage(e,item)}
                >
                  <Image src={item} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' className='rounded-full '></Image>  
                </button>
              )
            )}
          </div>
        :
          whichContent === 'ICON' && !loading && !error ?
          <div className='iconContentDiv flex-1 h-full py-[12px] px-[8px] flex-wrap flex items-start content-start justify-start gap-[10px] '>
            {
              iconProfileImageElements.map((item:any, index:any) => (
                <button
                  key={index}
                  className='w-[30px] h-[30px]'
                  onClick={(e)=>handleChangeProfileImage(e,item)}
                >
                  <Image src={item} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw'  className='rounded-full '></Image>  
                </button>
              )
            )}
          </div>
        :
          whichContent === 'CUSTOMIZATION' && !loading && !error &&
          <div className='customContentDiv flex-1 h-full py-[12px] px-[8px] flex-wrap flex items-start content-start justify-start gap-[10px] '>
            <button className='w-[30px] h-[30px] rounded-full flex items-center justify-center bg-lightGray hover:bg-purple group' onClick={(e) => handleAddNewProfileImage(e)}>
              <PlusSvg className='fill-current stroke-current stroke-purple fill-purple group-hover:stroke-white group-hover:fill-white'/>
            </button>
            {
              data.data.profileUrls.map((item:any, index:any) => (
                <button
                  key={index}
                  className='w-[30px] h-[30px]'
                  onClick={(e)=>handleChangeProfileImage(e,item)}
                >
                  <Image src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${item}`} width={30} height={30} alt={'profileImage'} style={{objectFit: 'cover', width: '100%', height: '100%', maxWidth: '30px', maxHeight: '30px'}} quality={100} sizes='100vw' className='rounded-full '></Image>  
                </button>
              )
            )}
          </div>
      }
    </div>
  )
}