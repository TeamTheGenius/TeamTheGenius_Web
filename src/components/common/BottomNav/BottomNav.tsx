import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "@/components/Common/BottomNav/BottomNavStyle.css";
import icon_off_1 from "@/assets/icon/icon_off_1.png";
import icon_off_2 from "@/assets/icon/icon_off_2.png";
import icon_off_3 from "@/assets/icon/icon_off_3.png";
import icon_off_4 from "@/assets/icon/icon_off_4.png";
import icon_on_1 from "@/assets/icon/icon_on_1.png";
import icon_on_2 from "@/assets/icon/icon_on_2.png";
import icon_on_3 from "@/assets/icon/icon_on_3.png";
import icon_on_4 from "@/assets/icon/icon_on_4.png";

function BottomNav() {
  const navData = [
    { to: "/main/home", title: "홈" },
    { to: "/main/mychallenge", title: "마이챌린지" },
    { to: "/main/pet", title: "펫" },
    { to: "/main/mypage", title: "마이페이지" },
  ];
  const iconOff = [icon_off_1, icon_off_2, icon_off_3, icon_off_4];
  const iconOn = [icon_on_1, icon_on_2, icon_on_3, icon_on_4];
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
