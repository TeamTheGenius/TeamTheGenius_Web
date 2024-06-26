import { PATH } from "@/constants/path";
import { encrypt } from "@/hooks/useCrypto";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type MyChallengeLinkWrapType = {
  instanceId: number;
  children: ReactNode;
};

const MyChallengeLinkWrap = ({
  instanceId,
  children,
}: MyChallengeLinkWrapType) => {
  const encryptedInstanceId = encrypt(instanceId);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`${PATH.CERTIFICATION}/${encryptedInstanceId}/my-week`);
  };
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex justify-between gap-[1.8rem] _sm:gap-[1.1rem] h-[12.6rem]"
    >
      {children}
    </div>
  );
};
export default MyChallengeLinkWrap;
