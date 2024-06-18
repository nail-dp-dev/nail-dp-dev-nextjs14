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
      <Link href={url} className={`${path === url ? 'bg-menuLightGray' : ''} w-full h-[40px] flex items-center justify-start py-[12px] px-[8px] rounded-2xl group-hover:bg-purple group-hover:text-white`}>
        <Icon className="menuIcon fill-black mr-[12px] fill-current text-black group-hover:fill-white" />
        <span className={`mr-[30px] text-[14px] ${path === url ? 'font-[700]' : 'font-[500]'}`}>{name}</span>
        <span className={`text-[12px] font-[700] hidden group-hover:block`}>{desc}</span>
      </Link>
    </div>
  );
}