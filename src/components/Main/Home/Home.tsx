import ChallengeItem from "../ChallengeItem/ChallengeItem";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import MoreButton from "../MoreButton/MoreButton";
import Title from "../Title/Title";
import { popularChallengeData } from "@/data/pupularChallengeData";
import { suggestionChallengeData } from "@/data/suggestionChallengeData";

function Home() {
  return (
    <div className="pl-[2.2rem]  mt-[1.5rem] flex flex-col gap-[1.5rem]">
      <div>
        <div className="flex gap-[2.851rem] _sm:justify-between items-center pr-[2.2rem] mb-[1.5rem]">
          <Title content="추천 챌린지" />
          <MoreButton keyUrl="suggestion" />
        </div>

        <HorizontalScroll>
          <div className="max-w-[18.8rem] flex gap-[2.2rem]">
            {suggestionChallengeData.map((item, index) => (
              <ChallengeItem key={index}>
                <ChallengeItem.Image
                  imgSrc={item.imgSrc}
                  alt={item.alt}
                  direction="horizontal"
                >
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

      <div>
        <div className="flex gap-[2.851rem] _sm:justify-between items-center pr-[2.2rem] mb-[1.5rem]">
          <Title content="인기 챌린지" />
          <MoreButton keyUrl="popular" />
        </div>

        <HorizontalScroll>
          <div className="max-w-[18.8rem] flex gap-[2.2rem]">
            {popularChallengeData.map((item, index) => (
              <ChallengeItem key={index}>
                <ChallengeItem.Image
                  imgSrc={item.imgSrc}
                  alt={item.alt}
                  direction="horizontal"
                >
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
    </div>
  );
}

export default Home;
