'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import CloseIcon from '../../../../../public/assets/svg/big-close.svg';
import PlusIcon from '../../../../../public/assets/svg/image-upload-plus.svg';
import CloseImageIcon from '../../../../../public/assets/svg/close-post-image.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { alarmModalData, setCommonModal } from '../../../../../store/slices/modalSlice';

type ImageData = {
  fileName: string;
  fileSize: number;
  fileUrl: string;
};

export interface editData {
  editImages?: ImageData[];
  onImageChange: React.Dispatch<React.SetStateAction<File[]>>;
  onDeleteImageChange?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageUploadContainer({
  editImages,
  onImageChange,
  onDeleteImageChange,
}: editData) {
  // 이미지 업로드 관련
  const [isImages, setIsImages] = useState<string[]>([]);
  const [isDeleteImages, setIsDeleteImages] = useState<string[]>([]);
  const [isOriginImages, setIsOriginImages] = useState<File[]>([]);
  const [isFileMemory, setIsFileMemory] = useState<number[]>([]);
  const [isMaxFileMemory, setIsMaxFileMemory] = useState<number>(0);
  const [isOverFileMemory, setIsOverFileMemory] = useState<number>(0);
  const [isOverFileType, setIsOverFileType] = useState<string>('');
  const [isModal, setIsModal] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editImages !== undefined) {
      setIsImages(editImages.map((item: { fileUrl: string }) => item.fileUrl));
      setIsFileMemory(
        editImages.map(
          (item: { fileSize: number }) => item.fileSize / (1024 * 1024),
        ),
      );
    }
  }, [editImages]);

  useEffect(() => {
    const totalMemory = isFileMemory.reduce((acc, cur) => acc + cur, 0);
    const maxMemory = parseFloat(totalMemory.toFixed(1));
    setIsMaxFileMemory(maxMemory);
  }, [isFileMemory]);

  useEffect(() => {
    onImageChange(isOriginImages);
  }, [isOriginImages]);

  useEffect(() => {
    if (onDeleteImageChange) {
      onDeleteImageChange(isDeleteImages);
    }
  }, [isDeleteImages, onDeleteImageChange]);

  const modalData = (byte: number, imageType: string) => {
    dispatch(
      alarmModalData({
        byte,
        imageType,
        type: 'one',
        button: '',
        user: '',
        actionType: 'archive'
      }),
    );
    dispatch(setCommonModal('alarm'));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('FileReader result is not a string'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const imageUploadClick = (e: MouseEvent) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  const imageUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      const base64String = await fileToBase64(file);

      const imageTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];
      const videoTypes = ['video/mp4', 'video/mov'];
      const imageMaxSize = 5;
      const videoMaxSize = 10;

      if (imageTypes.includes(file.type) && fileSizeMB > imageMaxSize) {
        modalData(fileSizeMB, 'image');
        return;
      } else if (videoTypes.includes(file.type) && fileSizeMB > videoMaxSize) {
        modalData(fileSizeMB, 'video');
        return;
      }
      setIsFileMemory([...isFileMemory, fileSizeMB]);
      setIsOriginImages([...isOriginImages, e.target.files[0]]);
      setIsImages([...isImages, base64String]);
    }
  };

  const imageUploadRemove = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    const base64OriginImages = await Promise.all(
      isOriginImages.map((item) => fileToBase64(item)),
    );
    const originIndex = base64OriginImages.indexOf(isImages[index]);

    const updateImages = isImages.filter((_, i) => i !== index);
    const updateFormImages = isOriginImages.filter((_, i) => i !== originIndex);
    const updateFile = isFileMemory.filter((_, i) => i !== index);

    if (isImages[index].startsWith('http')) {
      setIsDeleteImages([...isDeleteImages, isImages[index]]);
    }
    setIsImages(updateImages);
    setIsOriginImages(updateFormImages);
    setIsFileMemory(updateFile);
  };

  return (
    <div className="flex h-[36vh] min-h-[250px] flex-col px-[16px] py-[12px]">
      <div className="mb-[24px] flex items-center">
        <p className="flex-1 text-center text-[1.5rem] font-bold">
          {editImages ? '게시글 수정' : '새 게시글 작성'}
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
          accept=".gif, .jpg, .jpeg, .png, .mp4, .mov"
        />
        {isImages.length < 1 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-[1.1rem]">
              <span>네일아트 디자인을 업로드해 보세요.</span>
              <span className="text-red">*</span>
            </div>
            <button
              className="mt-[24px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple"
              onClick={imageUploadClick}
            >
              사진 추가하기
            </button>
            <p className="mb-[13px] mt-[24px] text-[1rem]">
              (최대 10장 50M까자입니다.)
            </p>
          </div>
        )}
        {isImages.length >= 1 && (
          <div className="flex h-full w-full flex-wrap gap-[0.7%] p-[10px] transition-all">
            {isImages.map((item, index) => (
              <div
                className="relative flex h-[49%] w-[19.4%] items-center justify-center overflow-hidden rounded-[5px]"
                key={index}
              >
                {item.startsWith('data:video') ||
                item.endsWith('.mov') ||
                item.endsWith('.mp4') ? (
                  <video
                    key={item}
                    autoPlay
                    muted
                    className="h-full w-full object-cover"
                  >
                    <source src={item} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item}
                    alt="postImage"
                    fill
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    quality={100}
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
                    {parseFloat(isFileMemory[index].toFixed(1))}MB
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
          className={`${isMaxFileMemory < 100 && 'hidden'} left-0 text-[0.6875rem] text-red`}
        >
          * 업로드 가능한 최대 용량은 100MB 입니다.
        </p>
        <div className="flex">
          <p>현재 파일 용량 :</p>
          <p
            className={`${isMaxFileMemory > 100 && 'text-red'} pl-[4px] pr-[10px]`}
          >
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
        ></div>
      )}
    </div>
  );
}
