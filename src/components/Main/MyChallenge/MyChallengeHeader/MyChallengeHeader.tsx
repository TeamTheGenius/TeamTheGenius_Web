import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

const MyChallengeHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // 타입을 number로 변경
  const navigate = useNavigate();

  const handleNavLink = (index: number) => {
    setActiveIndex(index);
    navigate(PATH.MY_CHALLENGE);
  };

  const tabs = [
    { label: "시작 전", to: "start" },
    { label: "진행 중", to: "progress" },
    { label: "완료", to: "completed" },
  ];

  return (
    <>
      <header className="relative h-[11.7rem] ">
        <h2 className="pt-[22px] text-[18px] font-bold text-black">
          마이챌린지
        </h2>
        <div className="w-full flex justify-center left-0 bottom-0 absolute">
          <ul className="flex justify-between items-end myChallenge-wrap">
            {tabs.map((tab, i) => {
              const isActive = activeIndex === i;
              return (
                <li
                  key={i}
                  className={`w-1/3 mr-[10px] _sm:mr-[5px] rounded-t-xl last:m-0 ${
                    isActive ? "bg-[#282828] h-[36px]" : "bg-[#dddddd] h-[28px]"
                  }`}
                >
                  <NavLink
                    to={tab.to}
                    className={"flex items-center justify-center w-full h-full"}
                    onClick={() => {
                      handleNavLink(i);
                    }}
                  >
                    <span
                      className={`${
                        isActive
                          ? "text-white text-[13px]"
                          : "text-#7C7C7C text-[12px]"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
};

export default MyChallengeHeader;
