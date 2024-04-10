import { PATH } from "@/constants/path";
import Tab from "../Tab/Tab";
import { encrypt } from "@/hooks/useCrypto";

interface Params {
  id: number;
}

function Tabs({ id }: Params) {
  const encryptedInstanceId = encrypt(id);
  return (
    <div className="flex justify-center">
      <Tab
        content="나의 인증 현황"
        path={`${PATH.CERTIFICATION}/${encryptedInstanceId}/my-week`}
      />
      <Tab
        content="참가자 인증 현황"
        path={`${PATH.CERTIFICATION}/${encryptedInstanceId}/others-week`}
      />
    </div>
  );
}

export default Tabs;
