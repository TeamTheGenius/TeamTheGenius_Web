import moreIcon from "@/assets/icon/next-icon.svg";
import { useNavigate } from "react-router-dom";

interface TabProps {
  tab: "home" | "popular" | "new" | "suggestion";
}

interface Props {
  keyUrl: TabProps["tab"];
}

function MoreButton({ keyUrl }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/main/tab/${keyUrl}`);
  };
  return (
    <img
      src={moreIcon}
      alt="챌린지 더보기 아이콘"
      className="w-[1.155rem] cursor-pointer"
      onClick={onClick}
    />
  );
}

export default MoreButton;
