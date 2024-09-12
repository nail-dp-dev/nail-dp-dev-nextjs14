import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants/icons';
import { shareMenuElements } from '../../constants';

interface ShareMenuListProps {
  onClick: (message: string) => void;
  selected?: string;
  imageUrl: string;
  type: 'post' | 'archive';
  id: number;
}
// 공유 리스트 (채팅으로 공유, 카카오톡 공유, URL복사)
export default function ShareMenuList({
  onClick,
  selected,
  imageUrl,
  type,
  id,
}: ShareMenuListProps) {
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  const getValidImageUrl = () => {
    if (!imageUrl.startsWith('http')) {
      return `${window.location.origin}${imageUrl}`;
    }
    return imageUrl;
  };

  const handleKakaoShare = () => {
    const validImageUrl = getValidImageUrl();

    if (!validImageUrl || !validImageUrl.startsWith('http')) {
      console.error('Invalid imageUrl:', validImageUrl);
      alert('이미지 URL이 올바르지 않습니다. 공유할 수 없습니다.');
      return;
    }

    const shareUrl =
      type === 'post'
        ? `${window.location.origin}/post/${id}`
        : `${window.location.origin}/archive/${id}`;

    if (isKakaoReady && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '네디플',
          description: `세상의 모든 네일아트, 여기서 만나보세요! 트렌디한 디자인과 나만의 스타일을 찾을 수 있는 네일아트 플랫폼`,
          imageUrl: validImageUrl,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      });
      onClick('카카오톡 공유');
    } else {
      console.error('Kakao SDK is not loaded');
    }
  };

  const handleCopyUrl = () => {
    const shareUrl =
      type === 'post'
        ? `${window.location.origin}/post/${id}`
        : `${window.location.origin}/archive/${id}`;

    navigator.clipboard.writeText(shareUrl).then(
      () => {
        onClick('URL 복사');
        alert('URL이 복사되었습니다.');
      },
      (err) => {
        console.error('URL 복사 실패', err);
      },
    );
  };

  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      setIsKakaoReady(true);
    }
  }, []);

  return (
    <>
      {shareMenuElements.map((item, index) => {
        const IconComponent = Icons[item.icon as keyof typeof Icons];
        return (
          <div
            key={index}
            onClick={() => {
              if (item.label === '카카오톡 공유') handleKakaoShare();
              if (item.label === 'URL 복사') handleCopyUrl();
            }}
            className="group/icon 
            flex cursor-pointer items-center rounded-xl px-3 py-[5px] hover:bg-white 
            hover:font-bold hover:text-purple hover:shadow-option-slice-shadow"
          >
            <IconComponent
              className="mr-1 fill-textDarkPurple 
            group-hover/icon:fill-purple"
            />
            {item.label}
          </div>
        );
      })}
    </>
  );
}
