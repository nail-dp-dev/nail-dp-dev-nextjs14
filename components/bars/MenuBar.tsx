import { bottomMenuElements, topMenuElements } from "../../constants";
import MenuButton from "../buttons/MenuButton";
import LoginInfoBox from "../../components/boxes/LoginInfoBox";

export default function MenuBar() {

  return (
    <section className="menuBarSection w-[50px] md:w-[305px] h-full md:p-[16px] flex flex-col items-center justify-between shadow-black shadow-menu-shadow rounded-[20px] transition-all">
      <div className="w-full flex flex-col items-center justify-center md:justify-start rounded-2xl pt-[16px] md:pt-[0px] gap-[6px] md:gap-[5px] ">
        <LoginInfoBox />
        <div className='w-full flex flex-col items-center justify-start gap-[6px] md:gap-[0px]'>
          {topMenuElements.map((item, index) => (
            <MenuButton
              key={index}
              icon={item.icon}
              name={item.name}
              url={item.url}
              desc={item.desc}
              isLast={item.isLast}
              where={'top'}
            />
          ))}
        </div> 
      </div>
      <div className="w-full rounded-2xl flex flex-col items-center justify-start gap-[6px] md:gap-[0px] mb-[16px] md:mb-0">
        {
          bottomMenuElements.map((item, index) => (
          <MenuButton
            key={index}
            icon={item.icon}
            name={item.name}
            url={item.url}
            desc={item.desc}
            isLast={item.isLast}
            where={'bottom'}
          />
          ))
        }
      </div>
    </section>
  );
}
