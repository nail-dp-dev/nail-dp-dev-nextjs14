import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants/icons';
import { shareMenuElements } from '../../constants';

interface ShareMenuListProps {
  onClick: (message: string) => void;
  selected?: string;
  imageUrl: string;
}

export default function ShareMenuList({
  onClick,
  selected,
  imageUrl,
}: ShareMenuListProps) {
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleKakaoShare = () => {
    if (!imageUrl || !imageUrl.startsWith('http')) {
      console.error('Invalid imageUrl:', imageUrl);
      alert('이미지 URL이 올바르지 않습니다. 공유할 수 없습니다.');
      return;
    }

    if (isKakaoReady && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '네디플',
          description: `세상의 모든 네일아트, 여기서 만나보세요! 트렌디한 디자인과 나만의 스타일을 찾을 수 있는 네일아트 플랫폼`,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      });
      onClick('카카오톡 공유');
    } else {
      console.error('Kakao SDK is not loaded');
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).then(
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
