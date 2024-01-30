import ChallengeItem from "../ChallengeItem/ChallengeItem";

interface ChallengeItemProps {
  imgSrc: string;
  alt: string;
  numberOfParticipants: number;
  title: string;
}

interface Props {
  data: ChallengeItemProps[];
}

function VerticalChallengeItems({ data }: Props) {
  return (
    <div className="w-full max-w-[72.2rem] grid grid-cols-4 gap-x-[2.2rem] _md:grid-cols-3 _sm:grid-cols-2">
      {data.map((item, index) => (
        <ChallengeItem key={index}>
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
      ))}
    </div>
  );
}

export default VerticalChallengeItems;
