'use client'

import { useState } from 'react'

export default function SimpleModal() {

  const [isModalShow, setIsModalShow] = useState<boolean>(true)

  const closeModal = () => {
    setIsModalShow(false)
  }

  return (
    <div className={`${isModalShow ? 'fixed flex' :'hidden'} top-0 left-0 w-screen h-screen z-50 items-center justify-center bg-modalBackgroundColor`}>
      <div className='w-[800px] h-[600px] rounded-[20px] flex items-center justify-center bg-white'>
        <button onClick={closeModal}>
          <span>닫기</span>
        </button>
      </div>
    </div>
  )
}