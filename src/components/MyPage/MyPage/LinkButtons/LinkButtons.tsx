import { PATH } from "@/constants/path";
import { Link } from "react-router-dom";

function LinkButtons() {
  return (
    <div className="w-full">
      <Link
        to={PATH.MY_PAGE_INTEREST_CHALLENGE}
        className="flex gap-[1.9rem] items-center"
      >
        <div className="w-[2rem] h-[2rem] bg-[#C6C6C6]" />
        <p className="text-[1.5rem] font-medium ">관심 목록</p>
      </Link>
      <Link className="flex gap-[1.9rem] mt-[3rem] items-center">
        <div className="w-[2rem] h-[2rem] bg-[#C6C6C6]" />
        <p className="text-[1.5rem] font-medium">관심사 수정</p>
      </Link>
    </div>
  );
}

export default LinkButtons;
