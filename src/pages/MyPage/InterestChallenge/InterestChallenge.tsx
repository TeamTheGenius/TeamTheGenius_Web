import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import Header from "@/components/Common/Header/Header";
import { allChallengeData } from "@/data/allChallengeData";

function InterestChallenge() {
  return (
    <>
      <Header content="관심 목록" />
      <div className="px-[2.2rem]  mx-auto flex justify-center items-center">
        <div className="pt-[5.3rem] w-full max-w-[51.5rem] _sm:max-w-[34.9rem] grid grid-cols-3 gap-x-[1rem]  _sm:grid-cols-2">
          {allChallengeData.map((item, index) => (
            <div className="pt-[3.7rem] _sm:pt-[2.3rem]" key={index}>
              <ChallengeItem>
                <ChallengeItem.Image
                  imgSrc={item.imgSrc}
                  alt={item.alt}
                  direction="vertical"
                  maxWidth="max-w-[16.5rem]"
                  paddingBottom="pb-[72.7%]"
                >
                  <ChallengeItem.Heart />
                </ChallengeItem.Image>
                <ChallengeItem.Title title={item.title} />
                <ChallengeItem.Reward point={item.point} />
              </ChallengeItem>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InterestChallenge;
