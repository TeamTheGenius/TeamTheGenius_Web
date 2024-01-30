import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "@/components/Common/BottomNav/BottomNavStyle.css";
import icon_off_home from "@/assets/icon/icon_off_home.svg";
import icon_off_myChallenge from "@/assets/icon/icon_off_myChallenge.svg";
import icon_off_pet from "@/assets/icon/icon_off_pet.svg";
import icon_off_myPage from "@/assets/icon/icon_off_myPage.svg";
import icon_on_home from "@/assets/icon/icon_on_home.svg";
import icon_on_myChallenge from "@/assets/icon/icon_on_myChallenge.svg";
import icon_on_pet from "@/assets/icon/icon_on_pet.svg";
import icon_on_myPage from "@/assets/icon/icon_on_myPage.svg";
import { PATH } from "@/constants/path";

function BottomNav() {
  const navData = [
    { to: PATH.HOME, title: "홈" },
    { to: PATH.MY_CHALLENGE, title: "마이챌린지" },
    { to: PATH.PET, title: "펫" },
    { to: PATH.MY_PAGE, title: "마이페이지" },
  ];
  const iconOff = [
    icon_off_home,
    icon_off_myChallenge,
    icon_off_pet,
    icon_off_myPage,
  ];
  const iconOn = [
    icon_on_home,
    icon_on_myChallenge,
    icon_on_pet,
    icon_on_myPage,
  ];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavLinkClick = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <>
      <ul className="fixed w-full bottom-0 bg-white shadow-md flex items-center justify-around max-w-[773px] mx-auto">
        {navData.map((data, i) => {
          const offIcon = iconOff[i];
          const onIcon = iconOn[i];
          const isActive = activeIndex === i;
          return (
            <li className="w-full" key={i}>
              {!imageLoaded ? (
                <></>
              ) : (
                <>
                  <NavLink
                    to={data.to}
                    className={isActive ? "nav-active" : "nav-pending"}
                    onClick={() => handleNavLinkClick(i)}
                  >
                    <img
                      src={isActive ? onIcon : offIcon}
                      className={isActive ? "loaded" : "pending"}
                      alt={`아이콘 off ${i + 1}`}
                    />
                    <span>{data.title}</span>
                  </NavLink>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default BottomNav;
