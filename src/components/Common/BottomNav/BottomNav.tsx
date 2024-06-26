import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "@/components/Common/BottomNav/bottomNavStyle.css";
import icon_off_home from "@/assets/icon/icon_off_home.svg";
import icon_off_myChallenge from "@/assets/icon/icon_off_myChallenge.svg";
// 교체할 이미지
import icon_off_shop from "@/assets/icon/icon_off_shop.svg";
import icon_on_shop from "@/assets/icon/icon_on_shop.svg";
import icon_off_myPage from "@/assets/icon/icon_off_myPage.svg";
import icon_on_home from "@/assets/icon/icon_on_home.svg";
import icon_on_myChallenge from "@/assets/icon/icon_on_myChallenge.svg";
import icon_on_myPage from "@/assets/icon/icon_on_myPage.svg";
import { PATH } from "@/constants/path";

function BottomNav() {
  const navData = [
    { to: PATH.HOME, title: "홈" },
    { to: PATH.MY_CHALLENGE_PROGRESS, title: "마이챌린지" },
    { to: PATH.SHOP, title: "포인트상점" },
    { to: PATH.MY_PAGE, title: "마이페이지" },
  ];
  const isActiveData = [
    {
      url: [
        PATH.HOME,
        PATH.POPULAR_CHALLENGE,
        PATH.SUGGESTION_CHALLENGE,
        PATH.NEW_CHALLENGE,
        PATH.SEARCH_ACTIVITY,
        PATH.SEARCH_ALL,
        PATH.SEARCH_DONE,
        PATH.SEARCH_PREACTIVITY,
      ],
    },
    {
      url: [
        PATH.MY_CHALLENGE,
        PATH.MY_CHALLENGE_PROGRESS,
        PATH.MY_CHALLENGE_COMPLETED,
        PATH.MY_CHALLENGE_START,
      ],
    },
    {
      url: [PATH.SHOP],
    },
    {
      url: [PATH.MY_PAGE],
    },
  ];

  const iconOff = [
    icon_off_home,
    icon_off_myChallenge,
    icon_off_shop,
    icon_off_myPage,
  ];
  const iconOn = [
    icon_on_home,
    icon_on_myChallenge,
    icon_on_shop,
    icon_on_myPage,
  ];
  const [imageLoaded, setImageLoaded] = useState(false);
  const url = useLocation().pathname;

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <>
      <ul className="fixed w-full bottom-0 bg-white shadow-md flex items-center justify-around max-w-[773px] mx-auto">
        {navData.map((data, i) => {
          const offIcon = iconOff[i];
          const onIcon = iconOn[i];
          const isActive = isActiveData[i].url.includes(url);
          return (
            <li className="w-full" key={i}>
              {!imageLoaded ? (
                <></>
              ) : (
                <div>
                  <NavLink
                    to={data.to}
                    className={isActive ? "nav-active" : "nav-pending"}
                  >
                    <img
                      src={isActive ? onIcon : offIcon}
                      className={isActive ? "loaded" : "pending"}
                      alt={`아이콘 off ${i + 1}`}
                    />
                    <span>{data.title}</span>
                  </NavLink>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default BottomNav;
