import Link from 'next/link';

export default async function PhonePage () {
  return(
    <div> 폰 페이지 

      <Link href="/sign-up/nickname">
        동의완료
      </Link>

    </div>
  )
}