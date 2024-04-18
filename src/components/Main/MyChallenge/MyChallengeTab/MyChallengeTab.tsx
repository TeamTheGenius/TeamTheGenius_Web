import { cls } from "@/utils/mergeTailwind";
import { useLocation, NavLink } from "react-router-dom";

interface Props {
  content: string;
  path: string;
}

function MyChallengeTab({ content, path }: Props) {
  const url = useLocation().pathname;
  const isActive = url === path;

  return (
    <NavLink
      to={path}
      replace={true}
      className={cls(
        "flex justify-center items-center w-1/3 mr-[1rem] _sm:mr-[0.5rem] rounded-t-[1.2rem] last:m-0",
        isActive ? "bg-[#282828] h-[3.6rem]" : "bg-[#dddddd] h-[2.8rem]"
      )}
    >
      <span
        className={cls(
          "font-medium",
          isActive ? "text-white text-[13px]" : "text-#7C7C7C text-[12px]"
        )}
      >
        {content}
      </span>
    </NavLink>
  );
}

export default MyChallengeTab;
