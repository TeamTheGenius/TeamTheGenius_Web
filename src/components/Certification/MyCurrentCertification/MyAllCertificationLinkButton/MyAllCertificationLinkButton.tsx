import { Link } from "react-router-dom";
import myAllCertificationLinkIcon from "@/assets/icon/arrow-right.svg";

function MyAllCertificationLinkButton() {
  return (
    <div className="flex justify-end">
      <Link className="text-[1.2rem] font-normal w-[19rem] h-[3.2rem] rounded-[0.6rem] border flex justify-center items-center gap-[0.7rem] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]">
        나의 전체 인증 현황 보러가기
        <img src={myAllCertificationLinkIcon} alt="전체 인증 현황 보러가기" />
      </Link>
    </div>
  );
}

export default MyAllCertificationLinkButton;
