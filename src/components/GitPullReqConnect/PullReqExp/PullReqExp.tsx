import { useState } from "react";
import dropDownIcon from "@/assets/icon/arrow-down.svg";
import diaIcon from "@/assets/icon/dia-icon.svg";

type PullReqType = {
  label: string;
};

function PullReqExp({ label }: PullReqType) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col w-full`}>
      <div className="flex w-8/12 _sm:w-full _sm:max-w-[33.5rem] _md:w-11/12 items-center justify-between mb-[1.5rem] ml-[6.5rem] _md:ml-0 _sm:ml-0">
        <span className={`text-[1.8rem] font-medium relative mr-[1.2rem]`}>
          {label}
        </span>
        <div>
          <img
            src={dropDownIcon}
            alt="dropDownIcon"
            className={`transform ${isOpen ? "rotate-180" : ""} cursor-pointer`} // isOpen 상태에 따라 이미지의 회전을 조정합니다.
            onClick={handleClick}
          />
        </div>
      </div>
      {!isOpen && (
        <div className="flex items-center ml-[8.5rem] _md:ml-[2rem] _sm:ml-[2rem] pt-[2.5rem]">
          <ul>
            <li className="flex mb-[1.8rem]">
              <img src={diaIcon} alt="diaIcon" className="mr-[1.3rem]" />
              <span className="text-[1.5rem] text-[#333333]">방법 설명</span>
            </li>
            <li className="flex mb-[1.8rem]">
              <img src={diaIcon} alt="diaIcon" className="mr-[1.3rem]" />
              <span className="text-[1.5rem] text-[#333333]">방법 설명</span>
            </li>
            <li className="flex mb-[1.8rem]">
              <img src={diaIcon} alt="diaIcon" className="mr-[1.3rem]" />
              <span className="text-[1.5rem] text-[#333333]">방법 설명</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default PullReqExp;
