interface Props {
  content: number;
}

function ParticipantCount({ content }: Props) {
  return (
    <p className="text-[1.6rem] font-medium text-white">
      참가자 총 {content}명
    </p>
  );
}

export default ParticipantCount;
