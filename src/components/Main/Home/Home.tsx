import ChallengeItem from "../ChallengeItem/ChallengeItem";
import MoreButton from "../MoreButton/MoreButton";
import Title from "../Title/Title";
import { popularChallengeData } from "@/data/pupularChallengeData";
import { suggestionChallengeData } from "@/data/suggestionChallengeData";

function Home() {
  return (
    <>
      <div className="flex gap-[2.851rem] justify-between items-center">
        <Title content="추천 챌린지" />
        <MoreButton keyUrl="suggestion" />
      </div>

      <div className="overflow-auto">
        <div className="flex gap-[2.2rem] w-screen">
          {suggestionChallengeData.map((item, index) => (
            <ChallengeItem key={index}>
              <ChallengeItem.Image imgSrc={item.imgSrc} alt={item.alt}>
                <ChallengeItem.NumberOfParticipant
                  numberOfParticipants={item.numberOfParticipants}
                />
              </ChallengeItem.Image>
              <ChallengeItem.Title title={item.title} />
            </ChallengeItem>
          ))}
        </div>
      </div>

      <div className="flex gap-[2.851rem] justify-between items-center">
        <Title content="인기 챌린지" />
        <MoreButton keyUrl="popular" />
      </div>

      <div className="overflow-auto">
        <div className="flex gap-[2.2rem] w-screen">
          {popularChallengeData.map((item, index) => (
            <ChallengeItem key={index}>
              <ChallengeItem.Image imgSrc={item.imgSrc} alt={item.alt}>
                <ChallengeItem.NumberOfParticipant
                  numberOfParticipants={item.numberOfParticipants}
                />
              </ChallengeItem.Image>
              <ChallengeItem.Title title={item.title} />
            </ChallengeItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
