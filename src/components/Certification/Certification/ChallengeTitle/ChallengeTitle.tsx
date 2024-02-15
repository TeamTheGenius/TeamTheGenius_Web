interface Props {
  content: string;
}

function ChallengeTitle({ content }: Props) {
  return <p className="text-[2.3rem] font-semibold text-white">{content}</p>;
}

export default ChallengeTitle;
