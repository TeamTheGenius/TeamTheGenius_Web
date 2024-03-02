import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import successStamp from "@/assets/icon/success-stamp.svg";
import { PATH } from "@/constants/path";
import { allChallengeData } from "@/data/allChallengeData";

const MyChallengeProgress = () => {
  const data = [
    {
      challengeItem: allChallengeData[0],
      labelText: "인증 필요",
      repositoryName: "dddddddddddddddddddddddd",
    },
    {
      challengeItem: allChallengeData[1],
      labelText: "패스 완료",
      repositoryName: "dddddddddddddddddddddddd",
    },
    {
      challengeItem: allChallengeData[2],
      labelText: "인증 갱신",
      repositoryName:
        "아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
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
              link={`${PATH.CHALLENGE_DETAIL}/${item.challengeItem.id}`}
            >
              <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                <ChallengeItem>
                  <ChallengeItem.Image
                    imgSrc={item.challengeItem.imgSrc}
                    alt={item.challengeItem.alt}
                    direction="vertical"
                  >
                    {item.labelText == "인증 갱신" && (
                      <img
                        src={successStamp}
                        alt="성공 스탬프"
                        className="bottom-[1rem] right-[1rem] absolute "
                      />
                    )}
                  </ChallengeItem.Image>
                </ChallengeItem>
              </div>
              <MyChallengeTitle
                title={item.challengeItem.title}
                point={item.challengeItem.point}
                authTime={item.challengeItem.authTime}
                repositoryName={item.repositoryName}
              />
              <MyChallengeLabel
                labelText={
                  item.labelText as "인증 필요" | "패스 완료" | "인증 갱신"
                }
              />
            </MyChallengeLinkWrap>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeProgress;
