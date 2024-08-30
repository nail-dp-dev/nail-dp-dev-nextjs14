'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectArchiveModalStatus,
  selectCommonModalStatus,
  setArchiveState
} from '../../../../store/slices/modalSlice';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import MyArchiveFolder from '../../../../public/assets/svg/my-archive-folder.svg';
import CloseIcon from '../../../../public/assets/svg/big-close.svg';
import FolderIcon from '../../../../public/assets/svg/folder-icon.svg';
import YellowIcon from '../../../../public/assets/svg/yellow-plus.svg';
import ArchiveNullIcon from '../../../../public/assets/svg/archive-modal-null.svg';
import ListMenu from '../../../../public/assets/svg/my-archive-list.svg';
import AlbumMenu from '../../../../public/assets/svg/my-archive-album.svg';
import SearchIcon from '../../../../public/assets/svg/search.svg';
import BellIcon from '../../../../public/assets/svg/bell.svg';
import DottedAlbum from '../../../../public/assets/svg/dotted_album.svg';
import { postArchiveCreate } from '../../../../api/archive/postArchiveCreate';
import { getArchiveData } from '../../../../api/archive/getArchiveData';
import { archiveModalElements } from '../../../../constants';
import Image from 'next/image';
import { postSetArchive } from '../../../../api/post/postSetArchive';
import { archiveArray } from '../../../../constants/interface';
import Video from '../../../ui/Video';

export default function MyArchiveModal() {
  const [isName, setIsName] = useState('');
  const [isBoundary, setIsBoundary] = useState('ALL');
  const [isArchiveMenu, setIsArchiveMenu] = useState('archiveCreate');
  const [isArchive, setIsArchive] = useState<archiveArray[]>([]);
  const [isArchiveName, setIsArchiveName] = useState('');
  const [isSelectArchive, setIsSelectArchive] = useState(0);
  const [isType, setIsType] = useState('album');
  const [isSearch, setIsSearch] = useState('');
  const [isBell, setIsBell] = useState(false);
  const { ArchivePostId } = useSelector(selectArchiveModalStatus);
  const { isCommonModalShow, whichCommonModal } = useSelector(
    selectCommonModalStatus,
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(commonModalClose());
  };

  const archiveMenuChange = (menu: string) => {
    setIsArchiveMenu(menu);
  };

  const archiveName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      setIsName(e.target.value);
    }
  };

  const boundaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBoundary(e.target.value);
  };

  const createArchive = async (
    isName: string,
    isBoundary: string,
    postId: number,
  ) => {
    if (isName.length > 0) {
      const success = await postArchiveCreate(isName, isBoundary);
      setArchive(success.data, postId);
    } else {
      console.log('모달로 변경: 아카이브이름을 입력해주세요!');
    }
  };

  const setArchive = async (archiveId: number, postId: number) => {
    console.log("여기",postId);
    const success = await postSetArchive(postId, archiveId);
    if (success.code == 2001) {
      dispatch(setArchiveState({state:true}))
      closeModal();
    } else {
      setIsBell(true);
      setTimeout(() => {
        setIsBell(false);
      }, 1500);
    }
  };

  const setArchiveName = (name: string, id: number) => {
    setIsArchiveName(name);
    setIsSelectArchive(id);
  };

  const archiveData = async () => {
    const data = await getArchiveData();
    if (data.data.postSummaryList.content[0]) {
      setIsArchive(data.data.postSummaryList.content);
      setIsArchiveName(data.data.postSummaryList.content[0].archiveName);
      setIsSelectArchive(data.data.postSummaryList.content[0].archiveId);
    }
  };

  const clickType = (e: any, type: string) => {
    e.stopPropagation();
    setIsType(type);
  };

  const searchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsSearch(e.currentTarget.value);
    }
  };

  const handleOnInput = (e: any, maxlength: number) => {
    const {
      target: { value },
    } = e;
    if (value.length > maxlength) e.target.value = value.substr(0, maxlength);
  };

  const filteredArchives = isArchive.filter((item) =>
    isSearch === '' ? true : item.archiveName.includes(isSearch),
  );

  useEffect(() => {
    archiveData();
  }, []);

  return (
    whichCommonModal === 'archive' && (
      <div
        className={`commonModal ${!isCommonModalShow && 'hidden'} pointer-events-auto absolute z-50 flex h-screen w-screen items-center justify-center bg-modalBackgroundColor`}
      >
        <div className="flex h-[370px] w-[800px] flex-col items-center justify-start overflow-hidden rounded-[20px] border-[1px] border-purple bg-white">
          {isArchiveMenu == 'myArchive' ? (
            <div className="bg-gray flex h-[55px] w-full items-center border-b-[1px] border-navMenuBotSolidGray">
              <div className="flex h-full w-[20%] min-w-[155px] items-center pl-[20px]">
                <MyArchiveFolder />
                <p className="pl-[12px] text-[0.9rem] font-bold text-purple">
                  내 아카이브
                </p>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="ml-[31px] flex h-[40px] w-[300px] items-center overflow-hidden rounded-full border-[1px] border-navMenuBotSolidGray shadow-sm">
                  <SearchIcon className="ml-[16px]" />
                  <input
                    className="ml-[10px] h-[24px] w-[240px] border-none text-[0.9rem] outline-none"
                    type="text"
                    placeholder="폴더 이름을 입력해주세요."
                    onKeyDown={(e) => searchKeyDown(e)}
                  />
                </div>
                <div className="flex">
                  <div className="mr-[24px] flex h-[24px] w-[58px] justify-between">
                    <button onClick={(e) => clickType(e, 'album')}>
                      <AlbumMenu
                        fill={`${isType === 'album' ? '#756982' : '#DADADA'}`}
                      />
                    </button>
                    <button onClick={(e) => clickType(e, 'list')}>
                      <ListMenu
                        fill={`${isType === 'list' ? '#756982' : '#DADADA'}`}
                      />
                    </button>
                  </div>
                  <button className="mr-[14px]">
                    <CloseIcon
                      width={18}
                      height={18}
                      onClick={() => {
                        closeModal();
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray flex h-[55px] w-full items-center border-b-[1px] border-navMenuBotSolidGray">
              <div className="flex h-full w-[20%] min-w-[155px] items-center pl-[20px]">
                <MyArchiveFolder />
                <p className="pl-[12px] text-[0.9rem] font-bold text-purple">
                  내 아카이브
                </p>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <p className="pl-[50px] text-[1rem] font-bold text-textDarkPurple">
                  내 아카이브 만들기
                </p>
                <button className="mr-[14px]">
                  <CloseIcon
                    width={18}
                    height={18}
                    onClick={() => {
                      closeModal();
                    }}
                  />
                </button>
              </div>
            </div>
          )}
          <div className="flex w-full flex-1">
            <div className="h-full w-[20%] min-w-[155px] bg-menuLightGray px-[10px] text-[0.9rem] font-bold">
              <div className="mt-[5px]">
                {archiveModalElements.map((item: any, index: number) => {
                  return (
                    <button
                      key={index}
                      className={`mt-[5px] h-[28px] w-full ${isArchiveMenu == item.name ? 'rounded-full bg-darkPurple' : ''}`}
                      onClick={(e) => archiveMenuChange(item.name)}
                    >
                      <p
                        className={`${isArchiveMenu == item.name ? 'text-white' : ''}`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            {isArchiveMenu == 'archiveCreate' && (
              <div className="flex flex-1 flex-col px-[80px]">
                <div className="flex justify-between pt-[20px]">
                  <p className="text-[1rem] text-textDarkPurple">
                    최대 4개의 아카이브를 무료로 생성할 수 있습니다.
                  </p>
                  <button className="flex h-[28px] w-[138px] items-center justify-center rounded-full border-[2px] border-purple text-[0.9rem] text-purple">
                    <YellowIcon />
                    <p className="pl-[7px]">무제한 아카이브</p>
                  </button>
                </div>
                <div className="flex h-[160px] pt-[18px]">
                  <div className="flex h-full w-[148px] flex-col pl-[16px] pr-[36px]">
                    <p className="pb-[10px] text-[0.9rem]">
                      (남은 개수: {4 - isArchive.length}개)
                    </p>
                    <FolderIcon />
                    <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap pt-[5px] text-center">
                      {isName}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <input
                      onInput={(e) => handleOnInput(e, 8)}
                      className="my-[16px] h-[40px] w-[320px] rounded-full border-none bg-darkGray pl-[12px] text-[0.9rem] outline-none"
                      type="text"
                      placeholder="폴더 이름을 입력해주세요.(최대 8글자)"
                      value={isName}
                      onChange={(e) => archiveName(e)}
                    />
                    <div className="pl-[14px] pt-[20px]">
                      <p className="font-bold">공개 범위 설정</p>
                      <div className="flex pt-[10px]">
                        <div className="mr-[16px] flex items-center hover:border-purple">
                          <input
                            className="mr-[10px] h-[16px] w-[16px]"
                            type="radio"
                            name="public-radio"
                            id="public-1"
                            value="ALL"
                            onChange={boundaryChange}
                            checked={isBoundary === 'ALL'}
                          />
                          <label
                            className="text-[0.875rem] font-bold"
                            htmlFor="public-1"
                          >
                            공개
                          </label>
                        </div>
                        <div className="mr-[16px] flex items-center">
                          <input
                            className="mr-[10px] h-[16px] w-[16px] "
                            type="radio"
                            name="public-radio"
                            id="public-2"
                            value="NONE"
                            onChange={boundaryChange}
                            checked={isBoundary === 'NONE'}
                          />
                          <label
                            className="text-[0.875rem] font-bold"
                            htmlFor="public-2"
                          >
                            비공개
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            className="mr-[10px] h-[16px] w-[16px] "
                            type="radio"
                            name="public-radio"
                            id="public-3"
                            value="FOLLOW"
                            onChange={boundaryChange}
                            checked={isBoundary === 'FOLLOW'}
                          />
                          <label
                            className="text-[0.875rem] font-bold"
                            htmlFor="public-3"
                          >
                            팔로워 공개
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center pt-[25px]">
                  <button
                    className={`${isName.length >= 1 ? "text-white bg-purple": "text-darkModeGray bg-lightGray"} h-[40px] w-[250px] rounded-full font-bold`}
                    onClick={(e) =>
                      createArchive(isName, isBoundary, ArchivePostId!)
                    }
                  >
                    아카이브 생성
                  </button>
                </div>
              </div>
            )}
            {isArchiveMenu == 'myArchive' && isArchive[0] ? (
              <div className="flex flex-1 flex-col justify-between">
                <div className="max-h-[235px] overflow-y-auto px-[44px]">
                  {/* <div className="hidden">
                    <p className="pt-[20px] text-[16px]">
                      최근에 사용한 아카이브
                    </p>
                    <div className="flex h-[48px]">
                      {image.map((item, index) => {
                        return (
                          <button
                            key={index}
                            className="group flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[5px] border-purple hover:border-[4px]"
                          >
                            <Image
                              className="h-[40px] w-[40px] rounded-[5px] group-hover:h-full group-hover:w-full group-hover:rounded-[0px]"
                              src={item}
                              alt={''}
                              width={40}
                              height={40}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div> */}
                  <div className="pt-[25px]">
                    <div className="flex flex-wrap">
                      {filteredArchives.map((item, index) => {
                        return (
                          <button
                            key={index}
                            className={`${isType == 'album' ? `relative mb-[20px] flex h-[190px] w-[130px] flex-col items-center overflow-hidden rounded-[18px] px-[5px] ${(index + 1) % 4 !== 0 ? 'mr-[7px]' : ''}` : `flex h-[72px] w-[50%] items-center`}`}
                            onClick={(e) =>
                              setArchiveName(item.archiveName, item.archiveId)
                            }
                          >
                            <div
                              className={`flex items-center justify-center ${isType == 'album' ? 'h-[130px] w-[130px] rounded-[17px]' : 'h-[66px] w-[66px] rounded-[11px]'} ${isSelectArchive == item.archiveId ? 'border-[5px] border-purple' : ''} `}
                            >
                              {item.archiveImgUrl !== null ? (
                                item.archiveImgUrl.endsWith('.mov') ||
                                item.archiveImgUrl.endsWith('.mp4') ? (
                                  <Video
                                    src={item.archiveImgUrl}
                                    width={'100%'}
                                    height={'100%'}
                                  />
                                ) : (
                                  <Image
                                    className={`${isType == 'album' ? 'h-[120px] w-[120px] rounded-[12px]' : 'h-[56px] w-[56px] rounded-[6px]'} `}
                                    src={item.archiveImgUrl}
                                    alt={''}
                                    width={120}
                                    height={120}
                                  />
                                )
                              ) : (
                                <ArchiveNullIcon
                                  width={`${isType == 'album' ? 120 : 56}`}
                                  height={`${isType == 'album' ? 120 : 56}`}
                                  viewBox="0 0 120 120"
                                />
                              )}
                            </div>
                            <div
                              className={`${isType == 'album' ? 'w-full' : 'pl-[16px]'} mt-[7px] text-start`}
                            >
                              <p className="text-[1rem] font-bold">
                                {item.archiveName}
                              </p>
                              <p className="text-[0.9rem] text-darkPurple">
                                {item.postCount} designs
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={`flex h-[80px] w-full justify-center bg-white`}>
                  <button
                    className="my-[20px] h-[40px] w-[250px] rounded-full bg-purple"
                    onClick={(e) => setArchive(isSelectArchive, ArchivePostId!)}
                  >
                    ‘{isArchiveName}’ 아카이브에 저장
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`${isArchiveMenu == 'myArchive' ? '' : 'hidden'} relative flex flex-1 flex-col items-center justify-center`}
              >
                <DottedAlbum />
                <div className="absolute h-[30px] w-[90px] rounded-full bg-lightGray text-center">
                  <p className="text-[18px]">비어있음</p>
                </div>
                <p className="mt-[20px] text-[18px] text-darkGray">
                  새로운 아카이브를 생성하세요.
                </p>
              </div>
            )}
          </div>
        </div>
        {isBell && (
          <div
            className={`absolute bottom-[20px] flex h-[56px] w-[290px] items-center justify-center rounded-full bg-red leading-[56px]`}
          >
            <BellIcon />
            <p className="pl-[6px] text-[1.3rem] font-bold text-white">
              이미 저장된 게시물입니다.
            </p>
          </div>
        )}
      </div>
    )
  );
}
