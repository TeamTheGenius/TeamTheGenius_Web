import ChallengeImage from "../ChallengeImage/ChallengeImage";
import ChallengeTitle from "../ChallengeTitle/ChallengeTitle";
import { allChallengeData } from "@/data/allChallengeData";
import ParticipantCount from "../ParticipantCount/ParticipantCount";
import ChallengePeriod from "../ChallengePeriod/ChallengePeriod";
import ChallengeReward from "../ChallengeReward/ChallengeReward";
import Information from "../Information/Information";
import Line from "../Line/Line";
import ChallengeDetailLinkButton from "../ChallengeDetailLinkButton/ChallengeDetailLinkButton";
import { useParams } from "react-router-dom";

function ChallengeInformation() {
  const { id } = useParams();
  const selectedChallenge = allChallengeData.find(
    (challenge) => challenge.id.toString() === id
  );

  if (!selectedChallenge) {
    return;
  }

  return (
    <>
      <div className="relative">
        <ChallengeImage
          imgSrc={selectedChallenge.imgSrc}
          alt={selectedChallenge.alt}
        />

        <div className="absolute bottom-[1.8rem] w-full px-[2.2rem]">
          <div className="flex flex-wrap w-full justify-between ">
            <div>
              <ChallengeTitle content={selectedChallenge.title} />
              <ParticipantCount
                content={selectedChallenge.numberOfParticipants}
              />
            </div>
            <div className="self-end mt-[1rem]">
              <ChallengeDetailLinkButton id={selectedChallenge.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[1.2rem] px-[2.2rem]">
        <ChallengePeriod content={selectedChallenge.period} />
      </div>
      <div className="mt-[0.9rem] px-[2.2rem]">
        <ChallengeReward point={selectedChallenge.point} />
      </div>
      <div className="mt-[2.7rem] px-[2.2rem]">
        <Information
          title="인증 기준"
          content="인증 가능 시간대는 00:00:00 부터 ... 어쩌고"
        />
      </div>
      <div className="mt-[1.5rem]">
        <Line />
      </div>
    </>
  );
}

export default ChallengeInformation;
