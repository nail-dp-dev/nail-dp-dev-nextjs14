import PostBox from "../../../components/boxes/PostBox";
import { newPosts } from "../../../constants/example";

export default function MyPagePage() {
  return (
    <section className="MyPageContainer w-full h-full">
      <div className="outBox flex flex-1 flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y">
        {newPosts &&
          newPosts.map((item, index) => <PostBox key={index} item={item} />)}
      </div>
    </section>
  );
}
