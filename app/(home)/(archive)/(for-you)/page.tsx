import Link from 'next/link';
import HeartButton from '../../../../components/buttons/HeartButton';

export default function ForYouPage() {

  return (
    <div className="ForYouContainer w-full h-full">
      ForYouContainer 입니다.
      <HeartButton />
      <Link href='example'> Open the modal</Link>
    </div>
  );
}