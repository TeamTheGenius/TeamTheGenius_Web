import { useNavigate } from "react-router-dom";
import ChallengeItem from "../ChallengeItem/ChallengeItem";
import { PATH } from "@/constants/path";
import { encrypt } from "@/hooks/useCrypto";

interface ChallengeItemProps {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    accessURI: string;
  };
}

interface Props {
  data: ChallengeItemProps[];
}

function VerticalChallengeItems({ data }: Props) {
  const navigate = useNavigate();
  const onClick = (instanceId: string) => {
    navigate(`${PATH.CHALLENGE_DETAIL}/${instanceId}`);
  };
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="my-[0.4rem] ">
          <ChallengeItem
            key={index}
            onClick={() => onClick(encrypt(item.instanceId))}
          >
            <ChallengeItem.Image
              imgSrc={item.fileResponse.accessURI}
              direction="vertical"
              alt="챌린지 이미지"
            >
              <ChallengeItem.NumberOfParticipant
                numberOfParticipants={item.participantCnt}
              />
            </ChallengeItem.Image>
            <ChallengeItem.Title title={item.title} />
            <ChallengeItem.Reward point={item.pointPerPerson} />
          </ChallengeItem>
        </div>
      ))}
    </>
  );
}

export default VerticalChallengeItems;
