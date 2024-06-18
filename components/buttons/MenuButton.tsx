import Link from 'next/link';

interface MenuElementsProps{
  icon:  React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string,
  name: string,
  desc: string,
  isLast: boolean;
  path: string;
}

export default function MenuButton({ icon: Icon, url, name, desc, isLast, path }: MenuElementsProps) {

  return (
    <div className={`w-full ${!isLast && 'mb-[8px]'} group`}>
      <Link href={url} className={`${path === url ? 'bg-menuLightGray' : ''} w-full h-[40px] flex items-center justify-between py-[12px] px-[8px] rounded-2xl group-hover:bg-purple group-hover:text-white`}>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-[36px] h-[24px]'>
            <Icon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${path === url && 'fill-black'}`} />
          </div>
          <span className={` text-[14px] ${path === url ? 'font-[700]' : 'font-[500]'}`}>{name}</span>
        </div>
        <span className={`text-[12px] pr-[20px] left-0 font-[700] r-0 hidden group-hover:block`}>{desc}</span>
      </Link>
    </div>
  );
}