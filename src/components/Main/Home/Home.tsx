import ChallengeItem from "../ChallengeItem/ChallengeItem";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import MoreButton from "../MoreButton/MoreButton";
import Title from "../Title/Title";
import { popularChallengeData } from "@/data/pupularChallengeData";
import { suggestionChallengeData } from "@/data/suggestionChallengeData";

function Home() {
  return (
    <div className="pl-[2.2rem]">
      <div className="flex gap-[2.851rem] justify-between items-center pr-[2.2rem] py-[1.5rem]">
        <Title content="추천 챌린지" />
        <MoreButton keyUrl="suggestion" />
      </div>

      <HorizontalScroll>
        <div className="flex gap-[2.2rem]">
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
      </HorizontalScroll>

      <div className="flex gap-[2.851rem] justify-between items-center pr-[2.2rem] py-[1.5rem]">
        <Title content="인기 챌린지" />
        <MoreButton keyUrl="popular" />
      </div>

      <HorizontalScroll>
        <div className="flex gap-[2.2rem] ">
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
      </HorizontalScroll>
    </div>
  );
}

export default Home;
