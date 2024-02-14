import ChallengeInformation from "@/components/Certification/Certification/ChallengeInformation/ChallengeInformation";
import Tabs from "@/components/Certification/Certification/Tabs/Tabs";
import DynamicBackIcon from "@/components/Common/DynamicBackIcon/DynamicBackIcon";
import MobCard from "@/components/Common/MobCard";
import { allChallengeData } from "@/data/allChallengeData";

import { Outlet, useParams } from "react-router-dom";

function Certification() {
  const { id } = useParams();
  const selectedChallenge = allChallengeData.find(
    (challenge) => challenge.id.toString() === id
  );

  if (!selectedChallenge) {
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
          <Tabs id={selectedChallenge.id} />
          <Outlet />
        </div>
      </div>
    </MobCard>
  );
}

export default Certification;
