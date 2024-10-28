import { rowMenuElements } from "../../constants";
import MenuButton from "../buttons/MenuButton";
import LoginInfoBox from "../../components/boxes/LoginInfoBox";

export default function RowMenuBar() {

  return (
    <div className="xsMenuDiv w-full h-[10%] max-h-[70px] flex items-center justify-center sm:hidden z-40 px-[10px] pb-[10px] ">
      <div className='w-full h-full bg-white rounded-[20px] shadow-sm shadow-black bg-naverGreen'>
        <div className="menuBarSection w-full h-full md:p-[16px] flex items-center justify-between shadow-black shadow-menu-shadow rounded-[20px] transition-all ">
          <div className='w-full h-full flex items-center justify-start gap-[6px] md:gap-[0px] overflow-hidden overflow-x-scroll hide-scrollbar'>
            {
              rowMenuElements.map((item, index) => (
                <MenuButton
                  key={index}
                  icon={item.icon}
                  name={item.name}
                  url={item.url}
                  desc={item.desc}
                  isLast={item.isLast}
                  where={'row'}
                />
              ))
            }
          </div> 
        </div>
      </div>
    </div>
  );
}
