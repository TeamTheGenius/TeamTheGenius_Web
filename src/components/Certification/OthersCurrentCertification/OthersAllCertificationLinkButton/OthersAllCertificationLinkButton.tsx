import OthersAllCertificationLinkButtonIcon from "@/assets/icon/next-icon.svg";
import { PATH } from "@/constants/path";
import { Link } from "react-router-dom";

interface Props {
  instanceId: number;
  userId: number;
}

function OthersAllCertificationLinkButton({ instanceId, userId }: Props) {
  return (
    <Link
      to={`${PATH.CERTIFICATION}/${instanceId}/others-all/${userId}`}
      className="flex justify-center items-center"
    >
      <img
        src={OthersAllCertificationLinkButtonIcon}
        alt="참가자 인증 전체 현황 보기 버튼 아이콘"
        height={18.62}
      />
    </Link>
  );
}

export default OthersAllCertificationLinkButton;
