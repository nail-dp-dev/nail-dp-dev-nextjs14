'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import CloseIcon from '../../../../../public/assets/svg/bigclose.svg';
import PlusIcon from '../../../../../public/assets/svg/image-upload-plus.svg';
import CloseImageIcon from '../../../../../public/assets/svg/close-post-image.svg';
import Link from 'next/link';
import Image from 'next/image';
import PostCreateModal from '../../../../../components/modal/common/postCreatemodal/PostCreateModal';

export default function ImageUploadContainer({ onImageChange }: any) {
  const [isImages, setIsImages] = useState<string[]>([]);
  const [isOriginImages, setIsOriginImages] = useState<File[]>([]);
  const [isFileMemory, setIsFileMemory] = useState<number[]>([]);
  const [isMaxFileMemory, setIsMaxFileMemory] = useState<number>(0);
  const [isOverFileMemory, setIsOverFileMemory] = useState<number>(0);
  const [isOverFileType, setIsOverFileType] = useState<string>('');
  const [isModal, setIsModal] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onImageChange(isOriginImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOriginImages]);

  useEffect(() => {
    const totalMemory = isFileMemory.reduce((acc, cur) => acc + cur, 0);
    console.log(totalMemory);
    const maxMemory = Math.ceil(totalMemory * 10) / 10;
    setIsMaxFileMemory(maxMemory);
  }, [isFileMemory]);

  const imageUploadClick = (e: MouseEvent) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  const imageUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileSizeMB = file.size / (1024 * 1024);

      const imageTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];
      const videoTypes = ['video/mp4'];
      const imageMaxSize = 5;
      const videoMaxSize = 10;

      if (imageTypes.includes(file.type) && fileSizeMB > imageMaxSize) {
        setIsOverFileType('image');
        setIsOverFileMemory(fileSizeMB);
        setIsModal(true);
        return;
      } else if (videoTypes.includes(file.type) && fileSizeMB > videoMaxSize) {
        setIsOverFileType('video');
        setIsOverFileMemory(fileSizeMB);
        setIsModal(true);
        return;
      }
      setIsFileMemory([...isFileMemory, fileSizeMB]);
      const reader = new FileReader();
      setIsOriginImages([...isOriginImages, e.target.files[0]]);
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const files = [...isImages, result];
        setIsImages(files);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageUploadRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    const updateImages = isImages.filter((_, i) => i !== index);
    const updateFormImages = isOriginImages.filter((_, i) => i !== index);
    const updateFile = isFileMemory.filter((_, i) => i !== index);
    setIsImages(updateImages);
    setIsOriginImages(updateFormImages);
    setIsFileMemory(updateFile);
  };

  return (
    <div className="flex h-[36vh] min-h-[250px] flex-col px-[16px] py-[12px]">
      <div className="mb-[24px] flex items-center">
        <p className="flex-1 text-center text-[24px] font-bold">
          새 게시글 작성
        </p>
        <Link href={`/my-page`}>
          <CloseIcon />
        </Link>
      </div>
      <div className="relative h-full w-full rounded-lg border-2 border-dashed border-postInputGray text-center">
        <input
          type="file"
          ref={fileInput}
          onChange={imageUploadChange}
          style={{ display: 'none' }}
          accept=".gif, .jpg, .jpeg, .png, .mp4"
        />
        {isImages.length < 1 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-[18px]">
              <span>네일아트 디자인을 업로드해 보세요.</span>
              <span className="text-red">*</span>
            </div>
            <button
              className="mt-[24px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple"
              onClick={imageUploadClick}
            >
              사진 추가하기
            </button>
            <p className="mb-[13px] mt-[24px] text-[16px]">
              (최대 10장 50M까자입니다.)
            </p>
          </div>
        )}
        {isImages.length >= 1 && (
          <div className="flex h-full w-full flex-wrap gap-[0.7%] p-[10px] transition-all">
            {isImages.map((item, index) => (
              <div
                className="relative flex h-[49%] w-[19.4%] items-center justify-center overflow-auto overflow-hidden rounded-[5px]"
                key={index}
              >
                {item.startsWith('data:video/mp4;base64,') ? (
                  <video
                    src={item}
                    autoPlay
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={item}
                    alt={`postImage`}
                    fill
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    quality={100}
                    priority
                  />
                )}
                <div className="group absolute z-10 flex h-full w-full items-center justify-center bg-addFolderGray bg-opacity-0 transition-opacity hover:bg-opacity-80">
                  <button
                    className="absolute right-[3px] top-[3px] rounded-full bg-white hover:bg-darkPurple"
                    onClick={(e) => imageUploadRemove(e, index)}
                  >
                    <CloseImageIcon className="fill-current fill-black hover:fill-white" />
                  </button>
                  <p className="hidden group-hover:block">
                    {Math.ceil(isFileMemory[index] * 10) / 10}MB
                  </p>
                </div>
              </div>
            ))}
            {isImages.length != 10 && (
              <button
                onClick={imageUploadClick}
                className="relative flex h-[49%] w-[19.4%] items-center justify-center overflow-hidden rounded-[5px] border border-dashed border-addFolderGray"
              >
                <PlusIcon />
              </button>
            )}
          </div>
        )}
      </div>
      <div
        className={`flex items-center ${isMaxFileMemory < 100 ? 'justify-end' : 'justify-between'} px-[8.5px] text-darkPurple`}
      >
        <p
          className={`${isMaxFileMemory < 100 && 'hidden'} left-0 text-[11px] text-red`}
        >
          * 업로드 가능한 최대 용량은 100MB 입니다.
        </p>
        <div className="flex">
          <p>현재 파일 용량 :</p>
          <p
            className={`${isMaxFileMemory > 100 && 'text-red'} pl-[1px] pr-[10px]`}
          >
            {' '}
            {isMaxFileMemory}MB
          </p>
          <p>
            <span className="text-bold">{isImages.length}</span>/10
          </p>
        </div>
      </div>
      {isModal && (
        <div
          className={`pointer-events-auto absolute bottom-0 right-0 z-50 flex h-full w-full items-center justify-center bg-modalBackgroundColor`}
        >
          <PostCreateModal
            isOverFileType={isOverFileType}
            isOverFileMemory={isOverFileMemory}
            setIsModal={setIsModal}
          />
        </div>
      )}
    </div>
  );
}
