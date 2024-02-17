import backIcon from "@/assets/icon/back-icon.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  content: string;
}

function Header({ content }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    console.log("이미지가 클릭되었습니다.");
    navigate(-1);
  };

  return (
    <>
      <div className="bg-white h-[6rem] z-20 fixed pl-[1.9rem] py-[1.3rem] flex ">
        <img
          onClick={onClick}
          src={backIcon}
          alt="뒤로가기 아이콘"
          className="cursor-pointer"
          width={20}
        />
      </div>
      <div className="bg-white max-w-[77.3rem] w-full h-[6rem] z-10 fixed py-[1.3rem] flex justify-center items-center">
        <p className="text-[1.8rem] font-semibold">{content}</p>
      </div>
    </>
  );
}

export default Header;
