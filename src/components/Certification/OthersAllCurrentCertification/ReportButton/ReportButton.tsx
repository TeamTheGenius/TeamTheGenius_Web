import { Link } from "react-router-dom";

function ReportButton() {
  return (
    <Link
      to={"report"}
      className="text-[1.6rem] _sm:text-[1.2rem] font-medium text-white flex justify-center items-center rounded-[1rem] w-[12rem] _sm:w-[8rem] h-[4.5rem] _sm:h-[3rem] bg-_coral-70"
    >
      신고하기
    </Link>
  );
}

export default ReportButton;
