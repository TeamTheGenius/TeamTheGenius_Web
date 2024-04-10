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
  const categoryOfUrl = useLocation().pathname.split("/");
  const categoryOfPath = path.split("/");

  const isActive =
    categoryOfUrl[categoryOfUrl.length - 1] ===
    categoryOfPath[categoryOfPath.length - 1];

  return (
    <button
      onClick={() => onClickTab(path)}
      className={cls(
        "w-full max-w-[27.4rem] h-[5.7rem] _sm:h-[4.7rem] flex justify-center items-center text-[1.6rem] _sm:text-[1.3rem] font-medium leading-_normal relative",
        isActive ? "text-black" : "text-[#757575]"
      )}
    >
      {content}
      {isActive && (
        <div className="w-[93%] _sm:w-[90%] h-[0.3rem] bg-black absolute bottom-0 left-1/2 -translate-x-1/2 " />
      )}
    </button>
  );
}

export default Tab;
