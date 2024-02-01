import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import MyChallengePic from "@/components/Main/MyChallenge/MyChallengePic/MyChallengePic";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import { allChallengeData } from "@/data/allChallengeData";
import { PATH } from "@/constants/path";

const MyChallengeStart = () => {
  const data = [
    {
      challengeItem: allChallengeData[0],
      labelText: "시작 전",
      labelState: false,
    },
    {
      challengeItem: allChallengeData[1],
      labelText: "시작 전",
      labelState: false,
    },
    {
      challengeItem: allChallengeData[2],
      labelText: "시작 전",
      labelState: false,
    },
  ];

  return (
    <>
      <MyChallengeWrap>
        {data.map((item) => {
          if (!item.challengeItem) return null;

          return (
            <MyChallengeLinkWrap
              key={item.challengeItem.id}
              link={`${PATH.CHALLENGE_ITEM}/${item.challengeItem.id}`}
            >
              <MyChallengePic
                overlayState={true}
                overlayText={`D - ${item.challengeItem.dDay}`}
                img={item.challengeItem.imgSrc}
                alt={item.challengeItem.alt}
                people={item.challengeItem.numberOfParticipants}
              />
              <MyChallengeTitle
                title={item.challengeItem.title}
                point={item.challengeItem.point}
              />
              <MyChallengeLabel
                labelState={item.labelState}
                labelText={item.labelText}
              />
            </MyChallengeLinkWrap>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeStart;
