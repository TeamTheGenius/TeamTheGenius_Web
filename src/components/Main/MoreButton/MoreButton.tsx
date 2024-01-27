import moreIcon from "@/assets/icon/next-icon.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
}

function MoreButton({ path }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(path);
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
