import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import { PATH } from "@/constants/path";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import getMyChallengePreActivity from "@/apis/getMyChallengePreActivity";
import { useQuery } from "@tanstack/react-query";

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
  });

  if (!data) {
    return;
  }

  return (
    <>
      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className="flex justify-between w-full relative mb-[1.3rem]"
            >
              <MyChallengeLinkWrap
                key={index}
                link={`${PATH.CHALLENGE_DETAIL}/${item.instanceId}`}
              >
                <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={item.fileResponse.encodedFile}
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

                <div className="flex flex-col gap-[4.7rem]">
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                  />
                </div>
              </MyChallengeLinkWrap>
              <MyChallengeLabel labelText="시작 전" />
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeStart;
