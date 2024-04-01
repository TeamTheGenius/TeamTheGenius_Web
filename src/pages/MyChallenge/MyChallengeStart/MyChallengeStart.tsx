import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import getMyChallengePreActivity from "@/apis/getMyChallengePreActivity";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "react-query";

interface Data {
  instanceId: number;
  title: string;
  remainDays: number;
  participantCount: number;
  pointPerPerson: number;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

const MyChallengeStart = () => {
  const { data } = useQuery<Data[]>({
    queryKey: ["myChallengePreActivity"],
    queryFn: () => getMyChallengePreActivity(),
    suspense: true,
  });

  if (!data) {
    return;
  }

  return (
    <>
      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <li key={index} className="mb-[1.3rem] list-none">
              <MyChallengeLinkWrap key={index} instanceId={item.instanceId}>
                <div className="min-w-[16.4rem] w-[16.4rem] h-[12.6rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={makeBase64IncodedImage({
                        uri: item.fileResponse.encodedFile,
                        format: "jpg",
                      })}
                      alt={"챌린지 이미지"}
                      direction="vertical"
                    >
                      <ChallengeItem.Overlay text={`D - ${item.remainDays}`} />
                      <ChallengeItem.NumberOfParticipant
                        numberOfParticipants={item.participantCount}
                      />
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>

                <div className="w-full justify-between flex flex-col ">
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                  />
                  <MyChallengeLabel
                    labelText="시작 전"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </MyChallengeLinkWrap>
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeStart;
