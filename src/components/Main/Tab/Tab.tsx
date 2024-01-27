import { cls } from "@/utils/mergeTailwind";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  content: string;
  path: string;
}

function Tab({ content, path }: Props) {
  const navigate = useNavigate();
  const onClickTab = (path: string) => {
    navigate(path, { replace: true });
  };
  const lastUrl = useLocation().pathname;
  const isActive = lastUrl === path;

  return (
    <button
      onClick={() => onClickTab(path)}
      className={cls(
        "w-full max-w-[17rem] h-[4.6rem] flex justify-center items-center text-[1.6rem] _sm:text-[1.4rem] font-medium leading-_normal relative",
        isActive ? "text-black" : "text-[#777]"
      )}
    >
      {content}
      {isActive && (
        <div className="w-[93%] _sm:max-w-[6.6rem] h-[0.3rem] bg-black absolute bottom-0 left-1/2 -translate-x-1/2 " />
      )}
    </button>
  );
}

export default Tab;
