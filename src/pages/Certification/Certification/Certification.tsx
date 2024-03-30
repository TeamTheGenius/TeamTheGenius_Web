import ChallengeInformation from "@/components/Certification/Certification/ChallengeInformation/ChallengeInformation";
import Tabs from "@/components/Certification/Certification/Tabs/Tabs";
import DynamicBackIcon from "@/components/Common/DynamicBackIcon/DynamicBackIcon";
import MobCard from "@/components/Common/MobCard";
import { decrypt } from "@/hooks/useCrypto";
import { Outlet, useParams } from "react-router-dom";

function Certification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);

  if (!id) {
    return;
  }
  return (
    <MobCard>
      <div className="max-w-[77.3rem] w-full z-10 fixed ml-[1.9rem] top-[1.3rem]">
        <DynamicBackIcon />
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-[54.6rem] w-full flex flex-col">
          <ChallengeInformation />
          <Tabs id={decryptedInstanceId} />
          <Outlet />
        </div>
      </div>
    </MobCard>
  );
}

export default Certification;
