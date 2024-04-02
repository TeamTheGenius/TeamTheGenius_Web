import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import searchIcon from "@/assets/icon/search-icon.svg";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { PATH } from "@/constants/path";
import deskTopLogo from "@/assets/icon/desktop-logo.svg";
import mobileLogo from "@/assets/icon/mobile-logo.svg";
import debounce from "lodash/debounce";

interface OutletProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

interface Props {
  setSearchEnter?: React.Dispatch<React.SetStateAction<boolean>>;
}

function HomeHeader({ setSearchEnter }: Props) {
  const { searchQuery, setSearchQuery } = useOutletContext<OutletProps>();
  const [logo, setLogo] = useState(deskTopLogo);
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    if (window.innerWidth <= 393) setLogo(mobileLogo);
    else setLogo(deskTopLogo);
  }, 300);

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

  return (
    <div className="px-[2.2rem] h-[4.7rem] _sm:h-[3.8rem] flex items-center">
      <img
        src={logo}
        className="w-[14rem] mr-[0.7rem] _sm:w-[3.7rem] _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black"
      ></img>
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
      {/*
      <div className="w-[11.6rem] _sm:w-[6.8rem] _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black">
        알림
      </div>
         */}
    </div>
  );
}

export default HomeHeader;
