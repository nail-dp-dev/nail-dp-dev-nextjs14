'use client';

import { useDispatch, useSelector } from 'react-redux';
import { commonModalClose, selectCommonModalStatus } from '../../../../store/slices/modalSlice';
import CloseIcon from '../../../../public/assets/svg/close.svg';
import ProfileFolderIcon from '../../../../public/assets/svg/profile-folder.svg';
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { postUserProfile } from '../../../../api/user/postUserProfile';

export default function ProfileImageCreateModal() {

  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);

  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isActive, setActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  
  const handleModalClose = (e?: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(commonModalClose());
  };

const handleInitInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }

    setActive(false);
    setPreview('');
    setFileName('');
    setFileSize('');
    setFile(null);
};
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readImage(file);
    setActive(false);
  };
  
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      readImage(file);
    }
  };
  
  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const readImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    const fileNameParts = file.name.split('.');
    const fileExtension = fileNameParts.pop();
    const fileNameWithoutExt = fileNameParts.join('.');

    const truncatedFileName =
    fileNameWithoutExt.length > 6
      ? `${fileNameWithoutExt.slice(0, 3)}...${fileNameWithoutExt.slice(-3)}.${fileExtension}`
      : file.name;
    setFileName(truncatedFileName);

    const sizeInMB = (file.size * 0.000001).toFixed(6);
    const truncatedSize = sizeInMB.length > 10 ? `${sizeInMB.slice(0, 10)}...` : sizeInMB;
    setFileSize(`${truncatedSize} MB`);
    setFile(file)
  };

  const saveImage = async (e: any, file:any) => {
    e.stopPropagation();
    e.preventDefault();

    if ( file === null ) return;

    const response = await postUserProfile(file)

    if (response.code === 2001) {
      handleModalClose()
      window.location.reload();
    } else if (response.code === 4002) {
      alert(response.message)
    } else {
      return;
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };

    if (isCommonModalShow) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommonModalShow]);

  return (
    whichCommonModal === 'profile-create' &&
    <div className={`commonModal ${!isCommonModalShow && 'hidden'} absolute w-screen h-screen z-50 flex items-center justify-center pointer-events-auto bg-modalBackgroundColor`}>
      <div className='w-[800px] h-[600px] flex flex-col items-center justify-start border-[1px] rounded-[12px] bg-white border-purple overflow-hidden'>
        <div className='topBar w-full h-[25px] mt-[15px] mb-[11px] px-[18px] flex items-center justify-between '>
          <span className='text-textDarkPurple font-[500] text-[1rem]'>프로필 사진 업로드</span>
          <button onClick={handleModalClose}>
            <CloseIcon fill='black'/>
          </button>
        </div>
        <div className='categoryBar w-full h-[54px] pl-[15px] border-b-[1px] border-solid border-b-darkGray flex'>
          <div className='categoryUpload w-[53.67px] h-[53px] flex items-center justify-center border-b-[3px] border-solid border-b-purple'>
            <span className='text-[0.875rem] text-black font-[700]'>업로드</span>
          </div>
        </div>
        <input
          type="file"
          className='hidden'
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <div
          className={`preview ${isActive ? 'bg-mainPurple bg-opacity-20' : ''} w-full h-svh transition-colors flex flex-col items-center justify-center rounded-[2px]`}
          onDragEnter={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
        >
          {
            preview === '' 
              &&
            <div className='flex flex-col items-center'>
              <ProfileFolderIcon className='mb-[34px]' />
              <div className='flex flex-col items-center justify-center'>
                <p className='font-[300] text-textDarkPurple text-[0.875rem] mb-[10px]'>또는 파일 드래그해서 업로드하기</p>
                <button className='button-layout button-color w-[150px] h-[40px]' onClick={handleButtonClick}>
                  폴더에서 찾아보기
                </button>
              </div>
            </div>
          }  
          {
            preview !== ''
              &&
              <div className='flex flex-col items-center justify-center gap-[12px]'>
                <div className='w-[150px] h-[150px] relative rounded-[12px]'>
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    sizes="300px"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    className='rounded-[12px]'
                  />
                  <Image
                    src={'/assets/img/profile/transparent.png'}
                    alt="Preview"
                    fill
                    sizes="300px"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    className='rounded-[12px]'
                  />  
                  <button
                    className='absolute flex items-center justify-center rounded-full w-[18px] h-[18px] bg-white top-[5px] right-[5px]'
                    onClick={(e)=>{handleInitInfo(e)}}
                  >
                    <CloseIcon fill='black'/>
                  </button>
                </div>
                <div className='flex flex-col gap-[7px]'>
                  <p className='text-[0.875rem] font-[700] text-textDarkPurple'>파일명 : {fileName}</p>
                  <p className='text-[0.875rem] font-[300] text-textDarkPurple'>파일크기 : {fileSize}</p>
                </div>
                <button 
                  className='button-color button-layout w-[150px] h-[40px]'
                  onClick={(e)=>{saveImage(e, file)}}
                >
                  <span>프로필 지정하기</span>
                </button>
              </div>
          }
        </div>
      </div>
    </div>
  );
}
