type MyChallengePassItemType = {
  onClick: (e: React.MouseEvent) => void;
  passCount: number;
};
function MyChallengePassItem({ onClick, passCount }: MyChallengePassItemType) {
  return (
    <button className="self-end h-[1.5rem] mb-[0.7rem]" onClick={onClick}>
      <span className="whitespace-nowrap   text-[#3a89d1] hover:border-b-[1px] hover:border-[#3a89d1] underline">
        인증 패스권 사용하기 (보유:{passCount})
      </span>
    </button>
  );
}

export default MyChallengePassItem;
