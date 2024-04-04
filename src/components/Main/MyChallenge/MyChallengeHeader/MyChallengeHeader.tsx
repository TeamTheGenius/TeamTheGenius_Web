import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PATH } from "@/constants/path";
import MainHeader from "@/components/Common/MainHeader/MainHeader";

const MyChallengeHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const location = useLocation();

  const handleNavLink = (index: number) => {
    setActiveIndex(index);
  };

  const tabs = [
    { label: "시작 전", to: PATH.MY_CHALLENGE_START },
    { label: "진행 중", to: PATH.MY_CHALLENGE_PROGRESS },
    { label: "완료", to: PATH.MY_CHALLENGE_COMPLETED },
  ];

  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.includes("start")) {
      setActiveIndex(0);
    } else if (pathName.includes("progress")) {
      setActiveIndex(1);
    } else if (pathName.includes("completed")) {
      setActiveIndex(2);
    }
  }, [location]);
  return (
    <>
      <header className="relative w-full h-[11.7rem]">
        <MainHeader headerText="마이 챌린지" />
        <div className="w-full flex justify-center left-0 bottom-0 absolute px-[2rem]">
          <ul className="flex justify-between items-end myChallenge-wrap">
            {tabs.map((tab, i) => {
              const tabActive = activeIndex === i;
              return (
                <li
                  key={i}
                  className={`w-1/3 mr-[10px] _sm:mr-[5px] rounded-t-xl last:m-0 ${
                    tabActive
                      ? "bg-[#282828] h-[36px]"
                      : "bg-[#dddddd] h-[28px]"
                  }`}
                >
                  <NavLink
                    to={tab.to}
                    replace={true}
                    className={"flex items-center justify-center w-full h-full"}
                    onClick={() => {
                      handleNavLink(i);
                    }}
                  >
                    <span
                      className={`${
                        tabActive
                          ? "text-white text-[13px]"
                          : "text-#7C7C7C text-[12px]"
                      } font-medium`}
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
