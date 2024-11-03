import Title from "../Title/Title";
import MoreButton from "../MoreButton/MoreButton";
import { PATH } from "@/constants/path";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { encrypt } from "@/hooks/useCrypto";
import { useGetPopularInstance } from "@/hooks/queries/useHomeInstanceQuery";
import EmptyDataComponent from "../EmptyDataComponent/EmptyDataComponent";

function PopularChallengeItems() {
  const [clickPossible, setClickPossible] = useState<boolean>(true);

  const navigate = useNavigate();

  const onClick = (id: number, clickPossible: boolean) => {
    if (clickPossible) {
      const encryptId = encrypt(id);
      navigate(`${PATH.CHALLENGE_DETAIL}/${encryptId}`);
    }
  };

  const { data } = useGetPopularInstance();

  return (
    <div>
      <div className="flex gap-[2.851rem] _sm:justify-between items-center pr-[2.2rem] mb-[1.5rem]">
        <Title content="인기 챌린지" />
        <MoreButton path={PATH.POPULAR_CHALLENGE} />
      </div>
      {!data?.posts.length && (
        <div className="pr-[2.2rem]">
          <EmptyDataComponent title="현재 인기있는 챌린지가 없어요" />
        </div>
      )}
      <HorizontalScroll setClickPossible={setClickPossible}>
        <div className="max-w-[18.8rem] flex gap-[2.2rem]">
          {Array.isArray(data?.posts) &&
            data.posts.map(
              (item, index) =>
                index < 7 && (
                  <div key={index} className="my-[0.4rem] ">
                    <ChallengeItem
                      onClick={() => onClick(item.instanceId, clickPossible)}
                    >
                      <ChallengeItem.Image
                        imgSrc={makeBase64IncodedImage({
                          uri: item.fileResponse.encodedFile,
                          format: "jpg",
                        })}
                        alt="챌린지 사진"
                        direction="horizontal"
                      >
                        <ChallengeItem.NumberOfParticipant
                          numberOfParticipants={item.participantCnt}
                        />
                      </ChallengeItem.Image>
                      <ChallengeItem.Title title={item.title} />
                      <ChallengeItem.Reward point={item.pointPerPerson} />
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
