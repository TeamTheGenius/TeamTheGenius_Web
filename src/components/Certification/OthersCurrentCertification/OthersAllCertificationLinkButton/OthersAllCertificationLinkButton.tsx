import OthersAllCertificationLinkButtonIcon from "@/assets/icon/next-icon.svg";
import { Link } from "react-router-dom";

interface Props {
  othersId: number;
}

function OthersAllCertificationLinkButton({ othersId }: Props) {
  return (
    <Link to={`${othersId}`} className="flex justify-center items-center">
      <img
        src={OthersAllCertificationLinkButtonIcon}
        alt="참가자 인증 전체 현황 보기 버튼 아이콘"
        height={18.62}
      />
    </Link>
  );
}

export default OthersAllCertificationLinkButton;
