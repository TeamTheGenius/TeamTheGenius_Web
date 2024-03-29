import { PATH } from "@/constants/path";
import Tab from "../Tab/Tab";

interface Params {
  id: number;
}

function Tabs({ id }: Params) {
  return (
    <div className="flex justify-center">
      <Tab
        content="나의 인증 현황"
        path={`${PATH.CERTIFICATION}/${id}/my-week`}
      />
      <Tab
        content="참가자 인증 현황"
        path={`${PATH.CERTIFICATION}/${id}/others-week`}
      />
    </div>
  );
}

export default Tabs;
