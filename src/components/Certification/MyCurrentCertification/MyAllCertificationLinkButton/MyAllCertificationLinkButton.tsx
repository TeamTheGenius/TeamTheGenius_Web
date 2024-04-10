import { Link, useParams } from "react-router-dom";
import myAllCertificationLinkIcon from "@/assets/icon/arrow-right.svg";
import { PATH } from "@/constants/path";
import { decrypt, encrypt } from "@/hooks/useCrypto";

interface Props {
  userId: number;
}

function MyAllCertificationLinkButton({ userId }: Props) {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const encryptedInstanceId = encrypt(decryptedInstanceId);
  const encryptedUserId = encrypt(userId);

  return (
    <div className="flex justify-end">
      <Link
        to={`${PATH.CERTIFICATION}/${encryptedInstanceId}/my-all/${encryptedUserId}`}
        className="text-[1.2rem] font-normal w-[19rem] h-[3.2rem] rounded-[0.6rem] border flex justify-center items-center gap-[0.7rem] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]"
      >
        나의 전체 인증 현황 보러가기
        <img src={myAllCertificationLinkIcon} alt="전체 인증 현황 보러가기" />
      </Link>
    </div>
  );
}

export default MyAllCertificationLinkButton;
