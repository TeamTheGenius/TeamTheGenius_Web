interface Props {
  content: string;
}
function ChallengePeriod({ content }: Props) {
  return <p className="text-[1.6rem] font-normal">{content}</p>;
}

export default ChallengePeriod;
