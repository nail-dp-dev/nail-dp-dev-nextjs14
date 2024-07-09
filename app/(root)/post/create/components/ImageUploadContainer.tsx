'use client';

import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import CloseIcon from '../../../../../public/assets/svg/bigclose.svg';
import PlusIcon from '../../../../../public/assets/svg/image-upload-plus.svg';
import CloseImageIcon from '../../../../../public/assets/svg/close-post-image.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function ImageUploadContainer({ onImageChange }:any) {
  // 이미지 업로드 관련
  const [isImages, setIsImages] = useState<string[]>([]);
  const [isOriginImages, setIsOriginImages] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onImageChange(isOriginImages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOriginImages]);

  const imageUploadClick = (e: MouseEvent) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  const imageUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
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
    setIsImages(updateImages);
    setIsOriginImages(updateFormImages);
  };

  return (
    <div className="flex flex-col min-h-[250px] h-[36vh] px-[16px] py-[12px]">
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
            <p className="mb-[13px] mt-[24px] text-[16px]">(최대 10장)</p>
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
                <button
                  className="absolute right-[3px] top-[3px] z-10"
                  onClick={(e) => imageUploadRemove(e, index)}
                >
                  <CloseImageIcon />
                </button>
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
    </div>
  );
}
