interface Props {
  point: number;
}
function ChallengeReward({ point }: Props) {
  return (
    <p className="text-[1.6rem] font-normal">
      완료 보상 <span className="font-medium">{point}P</span>
    </p>
  );
}

export default ChallengeReward;
