import Title from "../Title/Title";
import MoreButton from "../MoreButton/MoreButton";
import { PATH } from "@/constants/path";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { allChallengeData } from "@/data/allChallengeData";
import { useNavigate } from "react-router-dom";

function PopularChallengeItems() {
  const navigate = useNavigate();
  const onClick = (id: number) => {
    navigate(`${PATH.CHALLENGE_ITEM}/${id}`);
  };
  return (
    <div>
      <div className="flex gap-[2.851rem] _sm:justify-between items-center pr-[2.2rem] mb-[1.5rem]">
        <Title content="인기 챌린지" />
        <MoreButton path={PATH.POPULAR_CHALLENGE} />
      </div>

      <HorizontalScroll>
        <div className="max-w-[18.8rem] flex gap-[2.2rem]">
          {allChallengeData.map(
            (item, index) =>
              index < 7 && (
                <div className="my-[0.4rem] ">
                  <ChallengeItem key={index} onClick={() => onClick(item.id)}>
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
                    <ChallengeItem.Reward point={item.point} />
                  </ChallengeItem>
                </div>
              )
          )}
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default PopularChallengeItems;
