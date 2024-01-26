import { ChangeEvent, KeyboardEvent, SetStateAction, Dispatch } from "react";
import searchIcon from "@/assets/icon/search-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}

function MainHeader({ searchQuery, setSearchQuery }: Props) {
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const onClickKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentUrl !== "/main/search") {
      navigate("/main/search");
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-[4.7rem] _sm:h-[3.8rem] flex items-center">
      <div className="w-[11.6rem] _sm:w-[6.8rem] _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black">
        로고
      </div>
      <div className="flex items-center bg-[#EEE] w-full max-w-[54.2rem] h-full rounded-[0.5rem] px-[1.2rem]">
        <img src={searchIcon} alt="검색 아이콘" />
        <input
          type="text"
          placeholder="관심 챌린지를 검색해보세요"
          className="w-full ml-[0.7rem] font-extralight bg-[#EEE] text-[1.4rem] _sm:text-[1.2rem] leading-_normal placeholder:text-[#767676] focus:outline-none"
          value={searchQuery}
          onChange={onChange}
          onKeyDown={onClickKeyPress}
        />
      </div>
      <div className="w-[11.6rem] _sm:w-[6.8rem] _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black">
        알림
      </div>
    </div>
  );
}

export default MainHeader;