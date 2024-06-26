import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import searchIcon from "@/assets/icon/search-icon.svg";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { PATH } from "@/constants/path";
import deskTopLogo from "@/assets/icon/desktop-logo.svg";
import mobileLogo from "@/assets/icon/mobile-logo.svg";
//import alram from "@/assets/icon/alarm.svg";
interface OutletProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

interface Props {
  setSearchEnter?: React.Dispatch<React.SetStateAction<boolean>>;
}

function HomeHeader({ setSearchEnter }: Props) {
  const { searchQuery, setSearchQuery } = useOutletContext<OutletProps>();
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const onClickKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      currentUrl !== PATH.SEARCH &&
      currentUrl !== PATH.SEARCH_ALL &&
      currentUrl !== PATH.SEARCH_PREACTIVITY &&
      currentUrl !== PATH.SEARCH_ACTIVITY &&
      currentUrl !== PATH.SEARCH_DONE
    ) {
      navigate(PATH.SEARCH_ALL);
    } else if (event.key === "Enter") {
      if (setSearchEnter) {
        setSearchEnter(true);
      }
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onClickLogo = () => {
    navigate(PATH.HOME);
  };

  return (
    <div className="px-[2.2rem] h-[4.7rem] _sm:h-[3.8rem] flex items-center">
      <img
        onClick={onClickLogo}
        src={deskTopLogo}
        className="_sm:hidden cursor-pointer w-[14rem] mr-[0.7rem] _sm:w-[3.7rem] _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black"
      />

      <img
        onClick={onClickLogo}
        src={mobileLogo}
        className="_md:hidden _ld:hidden cursor-pointer w-[14rem] mr-[0.7rem] _sm:w-[3.7rem] _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black"
      />

      <div className="flex items-center bg-[#EEE] w-full max-w-[54.2rem] h-full rounded-[0.5rem] px-[1.2rem]">
        <img src={searchIcon} alt="검색 아이콘" />
        <input
          type="text"
          placeholder="관심 챌린지를 검색해보세요"
          className="w-full ml-[0.7rem] font-extralight bg-[#EEE] text-[1.4rem] _sm:text-[1.2rem] leading-_normal placeholder:text-[#767676] text-black focus:outline-none"
          value={searchQuery}
          onChange={onChange}
          onKeyDown={onClickKeyPress}
        />
      </div>
      <div className="w-[11.6rem] _sm:w-[3rem] _sm:shrink-0 ml-[1.2rem] h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black">
        {/* <img src={alram} alt="알람" className="ml-auto w-[3.8rem]" /> */}
      </div>
    </div>
  );
}

export default HomeHeader;
