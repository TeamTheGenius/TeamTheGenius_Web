import { useParams } from "react-router-dom";
import BackIcon from "@/components/ChallengeDetail/BackIcon/BackIcon";
import Bottom from "@/components/ChallengeDetail/Bottom/Bottom";
import CoreInformation from "@/components/ChallengeDetail/CoreInformation/CoreInformation";
import Image from "@/components/ChallengeDetail/Image/Image";
import Information from "@/components/ChallengeDetail/Information/Information";
import Line from "@/components/ChallengeDetail/Line/Line";
import MobCard from "@/components/Common/MobCard";
import { allChallengeData } from "@/data/allChallengeData";

function ChallengeDetail() {
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
        <BackIcon />
      </div>

      <div className="pb-[8rem] flex flex-col items-center">
        <div className="max-w-[54.6rem] w-full flex flex-col gap-[2.3rem]">
          <Image />
          <CoreInformation
            challengeTitle={selectedChallenge.title}
            applicant={selectedChallenge.numberOfParticipants}
            period={selectedChallenge.period}
            dDay={selectedChallenge.dDay}
            point={selectedChallenge.point}
          />
          <Line />
          <Information title="상세 정보" content="상세 정보 어쩌구" />
          <Line />
          <Information title="인증 방법" content="깃허브 커밋 ~ 어쩌고" />
          <Line />
          <Information
            title="유의 사항"
            content="인증은 참가자에게만 공개됩니다. 00시 00분 ~ 23시 59분 사이에 인증 하셔야 합니다."
          />
          <Line />
        </div>

        <div className="px-[2.2rem] max-w-[59rem] w-full z-10 fixed bottom-0">
          <Bottom>
            <Bottom.Heart isActive={true} heartCount={13} />
            <Bottom.Button />
          </Bottom>
        </div>
      </div>
    </MobCard>
  );
}

export default ChallengeDetail;
