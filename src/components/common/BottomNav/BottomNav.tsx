import { NavLink } from "react-router-dom";
import "@/components/Common/BottomNav/BottomNavStyle.css";
const navData = [
  { to: "/main/home", title: "홈" },
  { to: "/main/my-challenge", title: "마이챌린지" },
  { to: "/main/pet", title: "펫" },
  { to: "/main/my-page", title: "마이페이지" },
];
function BottomNav() {
  return (
    <>
      <ul className="fixed w-full bottom-0 bg-white shadow-md flex items-center justify-around max-w-[773px] mx-auto">
        {navData.map((data, i) => {
          return (
            <li className="w-full" key={i}>
              <NavLink
                to={data.to}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "nav-pending"
                    : isActive
                    ? "nav-active"
                    : "nav-pending"
                }
              >
                <span>{data.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default BottomNav;
