export default function PostCreate() {
  return (
    <section className="CreatePostContainer w-full h-full">
      <div className="flex w-full h-max-[72px] justify-end my-[16px]">
        <button className="w-[124px] h-[40px] mr-[12px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple">
          임시저장
        </button>
        <button className="w-[124px] h-[40px] mr-[12px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple">
          업로드
        </button>
      </div>
      <form action="">
        <div className="flex flex-col items-center justify-items-center">
          <div className="flex flex-col">
            <div className="flex">
              <p className="flex-1 text-[24px] bold text-center">새 게시글 작성</p>
              <p>x</p>
            </div>
            <div className="w-[480px] h-[202.5px] border border-purple border-dashed  mb-[28px]"></div>
          </div>
          <div>
            <p>내용</p>
            <div className="w-[480px] h-[144px] border ">
              <input type="text" />
            </div>
          </div>
          <div>
            <p>해시태그</p>
            <div className="w-[480px] h-[56px] border">
              <input type="text" />
            </div>
            <div>

            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
