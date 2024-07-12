'use client'

import { Suspense } from 'react'
import useAllPosts from '../../hooks/useAllPosts'
import PostBox from './PostBox'
import Loading from '../../app/loading'



export default function PostsBox() {

  const postsData = useAllPosts()
  console.log(postsData)

  return (
    <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y'>
      <Suspense fallback={<Loading/>}>
        {
          postsData && 
          postsData.data.content.map((item:any, index:number) => (
              <PostBox key={index} postId={item.postId} photoId={item.photoId} photoUrl={item.photoUrl} like={item.like} saved={item.saved} createdDate={item.createdDate} />
            ))
          }
          </Suspense>
      </div>
  )
}