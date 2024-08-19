'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectCommonModalStatus,
} from '../../../../store/slices/modalSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import MyArchiveFolder from '../../../../public/assets/svg/my-archive-folder.svg';
import CloseIcon from '../../../../public/assets/svg/big-close.svg';
import FolderIcon from '../../../../public/assets/svg/folder-icon.svg';
import { postArchiveCreate } from '../../../../api/archive/postArchiveCreate';


export default function MyArchiveModal() {
  const [isName, setIsName] = useState('');
  const [isBoundary, setIsBoundary] = useState('ALL');
  const { isCommonModalShow, whichCommonModal } = useSelector(
    selectCommonModalStatus,
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(commonModalClose());
  };

  const archiveName = (e: ChangeEvent<HTMLInputElement>) => {
    setIsName(e.target.value);
  };

  const boundaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBoundary(e.target.value);
  };

  const createArchive = async(isName: string, isBoundary: string) => {
    const success = await postArchiveCreate(isName, isBoundary);
    console.log(success);
  }
  
  return (
    whichCommonModal === 'archive' && (
      <div
        className={`commonModal ${!isCommonModalShow && 'hidden'} pointer-events-auto absolute z-50 flex h-screen w-screen items-center justify-center bg-modalBackgroundColor`}
      >
        <div className="flex h-[370px] w-[800px] flex-col items-center justify-start overflow-hidden rounded-[20px] border-[1px] border-purple bg-white">
          <div className="bg-gray flex h-[55px] w-full items-center border-b-[1px] border-navMenuBotSolidGray">
            <div className="flex h-full w-[20%] min-w-[155px] items-center pl-[20px]">
              <MyArchiveFolder />
              <p className="pl-[12px] text-[14px] font-bold text-purple">
                내 아카이브
              </p>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <p className="pl-[50px] text-[16px] font-bold text-textDarkPurple">
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
          <div className="flex w-full flex-1">
            <div className="h-full w-[20%] min-w-[155px] bg-menuLightGray px-[10px] text-[14px] font-bold">
              <button
                className={`mt-[10px] h-[28px] w-full rounded-full bg-darkPurple`}
              >
                <p className={``}>새로운 아카이브 생성</p>
              </button>
              <button
                className={`mt-[5px] h-[28px] w-full rounded-full bg-darkPurple px-[10px]`}
              >
                <p className={``}>내 아카이브</p>
              </button>
            </div>
            <div className="flex flex-1 flex-col px-[80px]">
              <div className="flex justify-between pt-[20px]">
                <p className="text-[16px] text-textDarkPurple">
                  최대 4개의 아카이브를 무료로 생성할 수 있습니다.
                </p>
                <button className="h-[28px] w-[138px] rounded-full border-[2px] border-purple text-[14px] text-purple">
                  <p>무제한 아카이브</p>
                </button>
              </div>
              <div className="flex h-[160px] pt-[18px]">
                <div className="flex h-full w-[148px] flex-col items-center pl-[16px] pr-[36px]">
                  <p className="pb-[10px] text-[14px]">(남은 개수: 4개)</p>
                  <FolderIcon />
                  <p className="pt-[5px] w-full text-ellipsis overflow-hidden whitespace-nowrap">{isName}</p>
                </div>
                <div className="flex flex-col">
                  <input
                    className="h-[40px] w-[320px] rounded-full bg-darkGray px-[12px] py-[16px] text-[14px]"
                    type="text"
                    placeholder="폴더 이름을 입력해주세요."
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
                <button className="h-[40px] w-[250px] rounded-full bg-purple" onClick={e => createArchive(isName, isBoundary)}>
                  아카이브 생성
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
