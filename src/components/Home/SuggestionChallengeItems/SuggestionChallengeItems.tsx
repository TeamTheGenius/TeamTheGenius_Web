import { suggestionChallengeData } from "@/data/suggestionChallengeData";
import Title from "../Title/Title";
import MoreButton from "../MoreButton/MoreButton";
import { PATH } from "@/constants/path";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
function SuggestionChallengeItems() {
  return (
    <div>
      <div className="flex gap-[2.851rem] _sm:justify-between items-center pr-[2.2rem] mb-[1.5rem]">
        <Title content="추천 챌린지" />
        <MoreButton path={PATH.SUGGESTION_CHALLENGE} />
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
  );
}

export default SuggestionChallengeItems;
