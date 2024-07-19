'use client';

import { FormEvent, SetStateAction, useEffect, useState } from 'react';
import ImageUploadContainer from '../../../../../components/post/ImageUploadContainer';
import ContentContainer from '../../../../../components/post/ContentContainer';
import HashTagContainer from '../../../../../components/post/HashTagContainer';
import PrivacySettingContainer from '../../../../../components/post/PrivacySettingContainer';
import { useParams } from 'next/navigation';
import { getPostEditData } from '../../../../../api/post/getPostEditData';

type ImageData = {
  fileName: string;
  fileSize: number;
  fileUrl: string;
};

export default function PostEdit() {
  const [isContent, setIsContent] = useState('');
  const [isImages, setIsImages] = useState<File[]>([]);
  const [isDeleteImages, setIsDeleteImages] = useState<string[]>([])
  const [isUrlImages, setIsUrlImages] = useState<ImageData[]>([])
  const [isBoundary, setIsBoundary] = useState('ALL');
  const [isUserHashTags, setIsUserHashTags] = useState<string[]>([]);
  const [isTemp, setIsTemp] = useState<boolean>(true);
  const parm = useParams();
  const postId = Array.isArray(parm.postid) ? parm.postid[0]:parm.postid

  
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostEditData(+postId);
      setIsUrlImages(data.data.photos)
      setIsContent(data.data.postContent)
      setIsBoundary(data.data.boundary)
      setIsTemp(data.data.tempSave)
      setIsUserHashTags(data.data.tags)
    };
    fetchData();
  }, [postId]);
  
  const handleImageChange = (images: SetStateAction<File[]>) => {
    setIsImages(images);
  };
  const handleDeleteImageChange = (images: SetStateAction<string[]>) => {
    setIsDeleteImages(images);
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
  
  console.log("게시글",isContent,"이미지 파일",isImages,"삭제 이미지",isDeleteImages, "url 이미지",isUrlImages, "공개",isBoundary, "해시태그",isUserHashTags, "임시저장",isTemp);
  
  // 업로드 관련
  const handleSubmit = async (event: FormEvent, temp: boolean) => {
    event.preventDefault();

    const postData = {
      content:{ 
      postContent: isContent,
      tags: isUserHashTags.map((tag) => ({ tagName: tag.replace('#', '') })),
      tempSave: isTemp,
      boundary: isBoundary,
      photos: isImages.map((file) => {
        const formData = new FormData();
        formData.append('mediaFile', file);
        return { mediaFile: formData };
      }),
    }
  }
  };

  return (
    <div className="CreatePostContainer overflow-y-scroll">
      <div className="flex flex-col items-center">
        <div className="sticky top-0 z-20 flex h-[73px] w-full items-center justify-end bg-white">
          <button
            onClick={() => handleTempChange(false)}
            type="submit"
            form="postCreateForm"
            className="mr-[12px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple"
          >
            완료
          </button>
        </div>
        <form
          className="w-[55%] min-w-[512px]"
          id="postCreateForm"
          onSubmit={(e) => handleSubmit(e, isTemp)}
        >
          {/* 이미지 */}
          <ImageUploadContainer editImages={isUrlImages} onImageChange={handleImageChange} onDeleteImageChange={handleDeleteImageChange}/>
          {/* 내용 */}
          <ContentContainer editContent={isContent} onContentChange={handleContentChange} />
          {/* 해시태그 */}
          <HashTagContainer editUserHashTags={isUserHashTags} onHashTagChange={handleUserHashTagsChange} />
          {/* 공개설정 */}
          <PrivacySettingContainer editBoundary={isBoundary} onBoundaryChange={handleBoundaryChange} />
        </form>
      </div>
    </div>
  );
}
