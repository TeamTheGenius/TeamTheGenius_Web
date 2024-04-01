import OthersAllCertificationLinkButtonIcon from "@/assets/icon/next-icon.svg";
import { PATH } from "@/constants/path";
import { encrypt } from "@/hooks/useCrypto";
import { Link } from "react-router-dom";

interface Props {
  instanceId: number;
  userId: number;
}

function OthersAllCertificationLinkButton({ instanceId, userId }: Props) {
  const encryptedInstanceId = encrypt(instanceId);
  const encryptedUserId = encrypt(userId);
  return (
    <Link
      to={`${PATH.CERTIFICATION}/${encryptedInstanceId}/others-all/${encryptedUserId}`}
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
