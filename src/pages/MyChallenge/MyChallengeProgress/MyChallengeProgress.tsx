import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import { PATH } from "@/constants/path";
import { allChallengeData } from "@/data/allChallengeData";

const MyChallengeProgress = () => {
  const data = [
    {
      challengeItem: allChallengeData[0],
      labelText: "인증 필요",
      labelState: true,
    },
    {
      challengeItem: allChallengeData[1],
      labelText: "인증 완료",
      labelState: false,
    },
    {
      challengeItem: allChallengeData[2],
      labelText: "인증 완료",
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
              <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                <ChallengeItem>
                  <ChallengeItem.Image
                    imgSrc={item.challengeItem.imgSrc}
                    alt={item.challengeItem.alt}
                    direction="vertical"
                  />
                </ChallengeItem>
              </div>
              <MyChallengeTitle
                title={item.challengeItem.title}
                point={item.challengeItem.point}
                authTime={item.challengeItem.authTime}
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

export default MyChallengeProgress;
