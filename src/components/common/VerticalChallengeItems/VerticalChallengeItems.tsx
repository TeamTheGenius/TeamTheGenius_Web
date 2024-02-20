import { useNavigate } from "react-router-dom";
import ChallengeItem from "../ChallengeItem/ChallengeItem";
import { PATH } from "@/constants/path";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";

interface ChallengeItemProps {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

interface Props {
  data: ChallengeItemProps[];
}

function VerticalChallengeItems({ data }: Props) {
  const navigate = useNavigate();
  const onClick = (instanceId: number) => {
    navigate(`${PATH.CHALLENGE_DETAIL}/${instanceId}`);
  };
  return (
    <div className="w-full max-w-[72.2rem] grid grid-cols-4 gap-x-[2.2rem] gap-y-[0.3rem] _md:grid-cols-3 _sm:grid-cols-2">
      {data.map((item, index) => (
        <div key={index} className="my-[0.4rem] ">
          <ChallengeItem key={index} onClick={() => onClick(item.instanceId)}>
            <ChallengeItem.Image
              imgSrc={makeBase64IncodedImage({
                uri: item.fileResponse.encodedFile,
                format: "jpg",
              })}
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
    </div>
  );
}

export default VerticalChallengeItems;
