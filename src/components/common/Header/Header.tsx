import backIcon from "@/assets/icon/back-icon.svg";

interface Props {
  content: string;
}

function Header({ content }: Props) {
  return (
    <div>
      <div className="bg-white max-w-[77.3rem] w-full z-10 fixed pl-[1.9rem] py-[1.3rem]">
        <img src={backIcon} alt="뒤로가기 아이콘" />
      </div>
      <div className="max-w-[77.3rem] w-full z-10 fixed py-[1.3rem] flex justify-center items-center">
        <p className="text-[1.8rem] font-semibold">{content}</p>
      </div>
    </div>
  );
}

export default Header;
