import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import { allChallengeData } from "@/data/allChallengeData";
import { PATH } from "@/constants/path";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";

const MyChallengeStart = () => {
  const data = [
    {
      challengeItem: allChallengeData[0],
      labelText: "시작 전",
    },
    {
      challengeItem: allChallengeData[1],
      labelText: "시작 전",
    },
    {
      challengeItem: allChallengeData[2],
      labelText: "시작 전",
    },
  ];

  return (
    <>
      <MyChallengeWrap>
        {data.map((item) => {
          if (!item.challengeItem) return null;

          return (
            <li className="flex justify-between w-full relative mb-[1.3rem]">
              <MyChallengeLinkWrap
                key={item.challengeItem.id}
                link={`${PATH.CHALLENGE_DETAIL}/${item.challengeItem.id}`}
              >
                <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={item.challengeItem.imgSrc}
                      alt={item.challengeItem.alt}
                      direction="vertical"
                    >
                      <ChallengeItem.Overlay
                        text={`D - ${item.challengeItem.dDay}`}
                      />
                      <ChallengeItem.NumberOfParticipant
                        numberOfParticipants={
                          item.challengeItem.numberOfParticipants
                        }
                      />
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>

                <div className="flex flex-col gap-[4.7rem]">
                  <MyChallengeTitle
                    title={item.challengeItem.title}
                    point={item.challengeItem.point}
                  />
                </div>
              </MyChallengeLinkWrap>
              <MyChallengeLabel labelText={item.labelText as "시작 전"} />
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeStart;
