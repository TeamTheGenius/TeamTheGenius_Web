import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import Header from "@/components/Common/Header/Header";
import { allChallengeData } from "@/data/allChallengeData";

function InterestChallenge() {
  return (
    <>
      <Header content="관심 목록" />
      <div className="mx-auto flex justify-center items-center">
        <div className="px-[2.2rem] pt-[8.6rem] w-full max-w-[51.5rem] grid grid-cols-3 gap-x-[2.2rem]  _sm:grid-cols-2">
          {allChallengeData.map((item, index) => (
            <div className="mt-[1.8rem]" key={index}>
              <ChallengeItem>
                <ChallengeItem.Image
                  imgSrc={item.imgSrc}
                  alt={item.alt}
                  direction="vertical"
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
