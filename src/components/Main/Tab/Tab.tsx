import { cls } from "@/utils/mergeTailwind";
import { useNavigate, useLocation } from "react-router-dom";

interface TabProps {
  tab: "home" | "popular" | "new" | "suggestion";
}

interface Props {
  content: string;
  keyUrl: TabProps["tab"];
}

function Tab({ content, keyUrl }: Props) {
  const navigate = useNavigate();
  const onClickTab = (keyUrl: TabProps["tab"]) => {
    navigate(`/main/tab/${keyUrl}`, { replace: true });
  };
  const lastUrl = useLocation().pathname.split("/").pop();
  const isActive = lastUrl === keyUrl;

  return (
    <button
      onClick={() => onClickTab(keyUrl)}
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
