import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

const MyChallengeHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const location = useLocation();
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
      <header className="relative h-[11.7rem]">
        <h2 className="pt-[2.2rem] _sm:pt-[2rem] text-[1.8rem] font-bold text-black">
          마이챌린지
        </h2>
        <div className="w-full flex justify-center left-0 bottom-0 absolute">
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
