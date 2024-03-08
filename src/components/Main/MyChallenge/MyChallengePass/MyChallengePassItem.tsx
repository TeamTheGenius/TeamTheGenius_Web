type MyChallengePassItemType = { onClick: () => void; passCount: number };
function MyChallengePassItem({ onClick, passCount }: MyChallengePassItemType) {
  return (
    <button className="h-[1.5rem] mb-[0.7rem]" onClick={passModal}>
      <span className="whitespace-nowrap relative text-[#3a89d1] hover:border-b-[1px] hover:border-[#3a89d1]">
        인증 패스권 사용하기 (보유:{passCount})
      </span>
    </button>
  );
}

export default MyChallengePassItem;
