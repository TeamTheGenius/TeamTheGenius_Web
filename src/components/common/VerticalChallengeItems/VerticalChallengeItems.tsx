import { useNavigate } from "react-router-dom";
import ChallengeItem from "../ChallengeItem/ChallengeItem";
import { PATH } from "@/constants/path";

interface ChallengeItemProps {
  imgSrc: string;
  alt: string;
  numberOfParticipants: number;
  title: string;
  id: number;
}

interface Props {
  data: ChallengeItemProps[];
}

function VerticalChallengeItems({ data }: Props) {
  const navigate = useNavigate();
  const onClick = (id: number) => {
    navigate(`${PATH.CHALLENGE_ITEM}/${id}`);
  };
  return (
    <div className="w-full max-w-[72.2rem] grid grid-cols-4 gap-x-[2.2rem] _md:grid-cols-3 _sm:grid-cols-2">
      {data.map((item, index) => (
        <div key={index} className="my-[0.4rem] ">
          <ChallengeItem key={index} onClick={() => onClick(item.id)}>
            <ChallengeItem.Image
              imgSrc={item.imgSrc}
              alt={item.alt}
              direction="vertical"
            >
              <ChallengeItem.NumberOfParticipant
                numberOfParticipants={item.numberOfParticipants}
              />
            </ChallengeItem.Image>
            <ChallengeItem.Title title={item.title} />
          </ChallengeItem>
        </div>
      ))}
    </div>
  );
}

export default VerticalChallengeItems;
