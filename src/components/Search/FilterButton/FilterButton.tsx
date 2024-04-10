import { cls } from "@/utils/mergeTailwind";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  content: string;
  path: string;
}

function FilterButton({ content, path }: Props) {
  const navigate = useNavigate();
  const onClickTab = (path: string) => {
    navigate(path, { replace: true });
  };

  const url = useLocation().pathname;
  const isActive = url === path;

  return (
    <button
      onClick={() => onClickTab(path)}
      className={cls(
        "h-[3rem] px-[1.2rem] text-[1.2rem] font-medium",
        isActive
          ? "bg-[#282828] rounded-[1.5rem] text-white leading-_normal"
          : "text-black leading-_normal"
      )}
    >
      {content}
    </button>
  );
}

export default FilterButton;
