import ChallengeImage from "../ChallengeImage/ChallengeImage";
import ChallengeTitle from "../ChallengeTitle/ChallengeTitle";
import ParticipantCount from "../ParticipantCount/ParticipantCount";
import ChallengePeriod from "../ChallengePeriod/ChallengePeriod";
import ChallengeReward from "../ChallengeReward/ChallengeReward";
import Information from "../Information/Information";
import Line from "../Line/Line";
import ChallengeDetailLinkButton from "../ChallengeDetailLinkButton/ChallengeDetailLinkButton";
import { useParams } from "react-router-dom";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import getCertificationInstanceDetail from "@/apis/getCertificationInstanceDetail ";
import { useQuery } from "react-query";

interface Data {
  instanceId: number;
  title: string;
  participantCount: number;
  pointPerPerson: number;
  certificationMethod: string;
  startDate: string;
  completedDate: string;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

function ChallengeInformation() {
  const { id } = useParams();

  const { data } = useQuery<Data>({
    queryKey: ["certificationInstanceDetail", { id }],
    queryFn: () =>
      id
        ? getCertificationInstanceDetail({ instanceId: parseInt(id) })
        : Promise.resolve(null),
  });

  if (!data) {
    return;
  }

  return (
    <>
      <div className="relative">
        <ChallengeImage
          imgSrc={makeBase64IncodedImage({
            uri: data.fileResponse.encodedFile,
            format: "jpg",
          })}
          alt={"챌린지 이미지"}
        />

        <div className="absolute bottom-[1.8rem] w-full px-[2.2rem]">
          <div className="flex flex-wrap w-full justify-between ">
            <div>
              <ChallengeTitle content={data.title} />
              <ParticipantCount content={data.participantCount} />
            </div>
            <div className="self-end mt-[1rem]">
              <ChallengeDetailLinkButton id={data.instanceId} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[1.2rem] px-[2.2rem]">
        <ChallengePeriod
          content={`${data.startDate} - ${data.completedDate} / 매일`}
        />
      </div>
      <div className="mt-[0.9rem] px-[2.2rem]">
        <ChallengeReward point={data.pointPerPerson} />
      </div>
      <div className="mt-[2.7rem] px-[2.2rem]">
        <Information title="인증 방법" content={data.certificationMethod} />
      </div>
      <div className="mt-[1.5rem]">
        <Line />
      </div>
    </>
  );
}

export default ChallengeInformation;
