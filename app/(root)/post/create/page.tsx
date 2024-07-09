'use client';

import { FormEvent, SetStateAction, useState } from 'react';
import ImageUplodeContainer from './components/ImageUplodeContainer';
import ContentContainer from './components/ContentContainer';
import HashTagContainer from './components/HashTagContainer';
import PrivacySettingContainer from './components/PrivacySettingContainer';
import { postCreate } from '../../../../api/post/postCreate';
import { tempPostCreate } from '../../../../api/post/tempPostCreate';
import { useRouter } from 'next/router';

export default function PostCreate() {
  const [isContent, setIsContent] = useState('');
  const [isImages, setIsImages] = useState<string[]>([]);
  const [isBoundary, setIsBoundary] = useState('');
  const [isUserHashTags, setIsUserHashTags] = useState<string[]>([]);
  const [isTemp, setIsTemp] = useState<boolean>(true);
  const router = useRouter();

  const handleImageChange = (images: SetStateAction<string[]>) => {
    setIsImages(images);
  };
  const handleContentChange = (content: SetStateAction<string>) => {
    setIsContent(content);
  };
  const handleBoundaryChange = (boundary: SetStateAction<string>) => {
    setIsBoundary(boundary);
  };
  const handleUserHashTagsChange = (hashtags: SetStateAction<string[]>) => {
    setIsUserHashTags(hashtags);
  };
  const handleTempChange = (temp: boolean) => {
    setIsTemp(temp);
  };

  // 업로드 관련
  const handleSubmit = async (event: FormEvent, temp: boolean) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('postContent', isContent);
    formData.append('tempSave', 'true');
    formData.append('boundary', isBoundary);

    isImages.forEach((item, index) => {
      if (typeof item === 'string' && item.startsWith('data:image')) {
        const blob = base64ToBlob(item);
        formData.append(`photos[${index}][media_file]`, blob);
      } else {
        formData.append(`photos[${index}][media_file]`, item);
      }
    });

    function base64ToBlob(base64String: string) {
      const byteString = atob(base64String.split(',')[1]);
      const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }

    if (temp) {
      tempPostCreate(formData);
      router.push('/my-page');
    } else {
      postCreate(formData);
      router.push('/my-page');
    }
  };

  return (
    <div className="CreatePostContainer overflow-y-scroll">
      <div className="flex flex-col items-center">
        <div className="sticky top-0 z-20 flex h-[73px] w-full items-center justify-end bg-white">
          <button
            onClick={() => handleTempChange(true)}
            type="submit"
            form="postCreateForm"
            className="mr-[12px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple"
          >
            임시저장
          </button>
          <button
            onClick={() => handleTempChange(false)}
            type="submit"
            form="postCreateForm"
            className={`mr-[12px] h-[40px] w-[124px] rounded-full 'border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple`}
          >
            업로드
          </button>
        </div>
        <form
          className="w-[55%] min-w-[512px]"
          id="postCreateForm"
          onSubmit={(e) => handleSubmit(e, isTemp)}
        >
          {/* 이미지 */}
          <ImageUplodeContainer onImageChange={handleImageChange} />
          {/* 내용 */}
          <ContentContainer onContentChange={handleContentChange} />
          {/* 해시태그 */}
          <HashTagContainer onHashTagChange={handleUserHashTagsChange} />
          {/* 공개설정 */}
          <PrivacySettingContainer onBoundaryChange={handleBoundaryChange} />
        </form>
      </div>
    </div>
  );
}
