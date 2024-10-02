'use client';

import { FormEvent, SetStateAction, useEffect, useState } from 'react';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ContentContainer from '../../components/ContentContainer';
import HashTagContainer from '../../components/HashTagContainer';
import PrivacySettingContainer from '../../components/PrivacySettingContainer';
import { useParams, useRouter } from 'next/navigation';
import { getPostEditData } from '../../../../../../api/post/getPostEditData';
import { postEdit } from '../../../../../../api/post/postEdit';

type ImageData = {
  fileName: string;
  fileSize: number;
  fileUrl: string;
};

export default function PostEdit() {
  const [isContent, setIsContent] = useState('');
  const [isImages, setIsImages] = useState<File[]>([]);
  const [isDeleteImages, setIsDeleteImages] = useState<string[]>([]);
  const [isUrlImages, setIsUrlImages] = useState<ImageData[]>([]);
  const [isBoundary, setIsBoundary] = useState('ALL');
  const [isUserHashTags, setIsUserHashTags] = useState<string[]>([]);
  const [isTemp, setIsTemp] = useState<boolean>(false);
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const parm = useParams();
  const postId = Array.isArray(parm.postid) ? parm.postid[0] : parm.postid;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostEditData(+postId);
      if (data) {
        setIsUrlImages(data.data.photos);
        setIsContent(data.data.postContent);
        setIsBoundary(data.data.boundary);
        setIsTemp(data.data.tempSave);
        setIsUserHashTags(data.data.tags);
      }
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

  const editButton =
    (isUserHashTags.length > 0 && isUrlImages.length > 0)
    // isUrlImages.length > 0;

  console.log("a",editButton);
  console.log("ba",isUrlImages.length > 0);
  console.log("b",isUserHashTags.length > 0);
  

  // 업로드 관련
  const handleSubmit = async (event: FormEvent, temp: boolean) => {
    event.preventDefault();

    const postData = {
      postId,
      postContent: isContent,
      tags: isUserHashTags.map((tag) => ({ tagName: tag })),
      tempSave: isTemp,
      boundary: isBoundary,
      deletedFileUrls: isDeleteImages,
      photos: isImages,
    };

    const success = await postEdit(postData);
    if (success) {
      router.push('/my-page?modal=수정');
    } else {
      setIsModal(true);
    }
  };

  return (
    <div className="CreatePostContainer overflow-y-scroll">
      <div className="flex flex-col items-center">
        <div className="sticky top-0 z-20 flex h-[73px] w-full items-center justify-end bg-white">
          {isTemp && (
            <div>
              <button
                type="submit"
                form="postEditForm"
                className={`mr-[12px] h-[40px] w-[124px] rounded-full button-color  hover:button-hover`}
                disabled={false}
              >
                임시저장
              </button>
              <button
                type="submit"
                form="postEditForm"
                className={`mr-[12px] h-[40px] w-[124px] rounded-full ${!editButton ? 'cursor-pointer bg-buttonLightGray' : 'button-color  hover:button-hover'}`}
                disabled={!editButton}
              >
                업로드
              </button>
            </div>
          )}
          {!isTemp && (
            <button
              type="submit"
              form="postEditForm"
              className={`mr-[12px] h-[40px] w-[124px] rounded-full ${!editButton ? 'cursor-pointer bg-buttonLightGray' : 'button-color  hover:button-hover'}`}
              disabled={!editButton}
            >
              완료
            </button>
          )}
        </div>
        <form
          className="w-[55%] min-w-[512px] md:min-w-[410px]"
          id="postEditForm"
          onSubmit={(e) => handleSubmit(e, isTemp)}
        >
          {/* 이미지 */}
          <ImageUploadContainer
            tempSave={isTemp}
            editImages={isUrlImages}
            onImageChange={handleImageChange}
            onDeleteImageChange={handleDeleteImageChange}
          />
          {/* 내용 */}
          <ContentContainer
            editContent={isContent}
            onContentChange={handleContentChange}
          />
          {/* 해시태그 */}
          <HashTagContainer
            editUserHashTags={isUserHashTags}
            onHashTagChange={handleUserHashTagsChange}
          />
          {/* 공개설정 */}
          <PrivacySettingContainer
            editBoundary={isBoundary}
            onBoundaryChange={handleBoundaryChange}
          />
        </form>
      </div>
    </div>
  );
}
