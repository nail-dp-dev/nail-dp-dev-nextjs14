'use client';

import { useRef, useState } from 'react';
import CloseIcon from '../../../../public/assets/svg/bigclose.svg';
import HashtagArrowIcon from '../../../../public/assets/svg/hashtag-arrow.svg';
import PlusIcon from '../../../../public/assets/svg/image-uplode-plus.svg';
import CloseImageIcon from '../../../../public/assets/svg/close-post-image.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function PostCreate() {
  //태그 관련
  const [isTagList, setIsTagList] = useState([
    '유광',
    '무광',
    '짧은손톱',
    '긴손톱',
    '케어',
    '글러터',
    '스퀘어',
    '라운드스퀘어',
    '아몬드',
    '스탈레토',
    '발레리나',
    '라운드',
    '오벌',
    '오벌라운드',
    '코핀',
    '아크릴',
    '연장',
  ]);
  // 이미지 업로드 관련
  const [isImages, setIsImages] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const imageUplodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  const imageUplodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      const files = [...isImages, file];
      setIsImages(files);
      e.target.value = '';
    }
  };

  const imageUplodeRemove = (index: number) => {
    URL.revokeObjectURL(isImages[index]);
    const updatedImages = isImages.filter((_, i) => i !== index);
    console.log(updatedImages);
    setIsImages(updatedImages);
  };

  // 내용 작성 관련

  // 공개 관련

  return (
    <section className="CreatePostContainer flex w-full flex-col items-center overflow-y-scroll">
      <div className="h-max-[72px] sticky top-0 my-[16px] flex w-full justify-end bg-white">
        <button className="mr-[12px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple">
          임시저장
        </button>
        <button className="mr-[12px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple">
          업로드
        </button>
      </div>
      <form className="w-[55%] min-w-[512px]" action="">
        <div className="flex flex-col">
          <div className="flex h-[36vh] flex-col px-[16px] py-[12px]">
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
                onChange={imageUplodeChange}
                style={{ display: 'none' }}
              />
              {isImages.length < 1 && (
                <div className="absolute bottom-[13px] w-full">
                  <div className="text-[18px]">
                    <span>네일아트 디자인을 업로드해 보세요.</span>
                    <span className="text-red">*</span>
                  </div>
                  <button
                    className="mt-[24px] h-[40px] w-[124px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple"
                    onClick={imageUplodeClick}
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
                        sizes="100vw, 50vw, 33vw"
                      />
                      <button
                        className="absolute right-[3px] top-[3px] z-10"
                        onClick={() => imageUplodeRemove(index)}
                      >
                        <CloseImageIcon />
                      </button>
                    </div>
                  ))}
                  <button onClick={imageUplodeClick} className="relative flex h-[49%] w-[19.4%] items-center justify-center overflow-hidden rounded-[5px] border border-dashed border-addFolderGray">
                    <PlusIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex h-[23vh] flex-col px-[16px] py-[12px]">
            <p className="pb-[8px] text-[16px] font-bold">내용</p>
            <div className="h-full w-full overflow-hidden rounded-lg border border-postInputGray focus-within:border-purple">
              <textarea className="h-full w-full resize-none rounded-lg p-[15px] focus:outline-none" />
            </div>
          </div>
          <div className="flex flex-col px-[16px] py-[12px]">
            <div className="pb-[8px] text-[16px]">
              <span className="font-bold">해시태그</span>
              {/* 값에 따라 없어지고 나타남 */}
              <span className="text-red">*</span>
            </div>
            <div className="h-[56px] w-full rounded-lg border border-postInputGray text-center focus-within:border-purple">
              <input
                className="w-full rounded-lg p-[15px] text-[16px] focus:outline-none"
                type="text"
                placeholder="게시물에 해당하는 해시태그 아래에서 선택 후 추가로 입력해 주세요."
              />
              <button className="hidden">
                <HashtagArrowIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="felx py-[28px]">
          {isTagList.map((itme, index) => (
            <button
              className="mb-[6px] ml-[6px] h-[32px] rounded-full bg-hashTagGray px-[16px] text-[14px] font-bold hover:bg-purple"
              key={index}
            >
              {`#${itme}`}
            </button>
          ))}
        </div>
        <div className="px-[16px] pb-[50px] pt-[12px]">
          <p className="pb-[8px] text-[16px] font-bold">공개 범위 설정</p>
          <div className="flex">
            <div className="mr-[16px] flex items-center hover:border-purple">
              <input
                className="mr-[10px] h-[16px] w-[16px]"
                type="radio"
                name="public-radio"
                id="public-1"
              />
              <label className="text-[14px] font-bold" htmlFor="public-1">
                공개
              </label>
            </div>
            <div className="mr-[16px] flex items-center">
              <input
                className="mr-[10px] h-[16px] w-[16px] "
                type="radio"
                name="public-radio"
                id="public-2"
              />
              <label className="text-[14px] font-bold" htmlFor="public-2">
                비공개
              </label>
            </div>
            <div className="flex items-center">
              <input
                className="mr-[10px] h-[16px] w-[16px] "
                type="radio"
                name="public-radio"
                id="public-3"
              />
              <label className="text-[14px] font-bold" htmlFor="public-3">
                팔로워 공개
              </label>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
