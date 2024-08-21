import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostsDetailData, CommentData } from '../types/dataType';
import { getPostsDetailData } from '../api/post/getPostsDetailData';
import { getCommentData } from '../api/post/getCommentsDetailData';

type UserDetail = {
  post: PostsDetailData['data'];
  comments: CommentData['data']['contents']['content'];
};

export default function usePostDetail() {
  const { postId } = useParams();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [numericPostId, setNumericPostId] = useState<number | null>(null);
  const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (postId) {
      const parsedPostId = Number(postId);
      if (!isNaN(parsedPostId)) {
        setNumericPostId(parsedPostId);
      } else {
        console.error('Invalid postId:', postId);
      }
    }
  }, [postId]);

  useEffect(() => {
    if (numericPostId !== null) {
      const fetchData = async () => {
        try {
          const postData = await getPostsDetailData(numericPostId);
          const commentsData = await getCommentData(numericPostId);

          if (postData?.data && commentsData?.data?.contents?.content) {
            setUserDetail({
              post: postData.data,
              comments: commentsData.data.contents.content,
            });
            setCommentsLoaded(true);
          } else {
            console.error('Invalid data structure:', { postData, commentsData });
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // 처음에만 데이터 로드
      if (!commentsLoaded) {
        fetchData();
      }
    }
  }, [numericPostId, commentsLoaded]);

  return { userDetail, numericPostId };
}
