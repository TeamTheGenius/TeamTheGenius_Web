interface Props {
  successCount: number;
  failureCount: number;
  remainCount: number;
}

function MyCertificationSummary({
  successCount,
  failureCount,
  remainCount,
}: Props) {
  return (
    <>
      <div className="flex flex-1 w-full h-[9.6rem] border border-[#E1E1E1] rounded-[1rem] shadow-[0_4px_10px_0_rgba(225,225,225)]">
        <div className="flex-1 text-center self-center">
          <p className="text-[1.3rem] font-medium text-[#777]">인증 성공</p>
          <p className="text-[1.8rem] font-medium">{successCount}</p>
        </div>
        <div className="flex-1 text-center self-center">
          <p className="text-[1.3rem] font-medium text-[#777]">인증 실패</p>
          <p className="text-[1.8rem] font-medium">{failureCount}</p>
        </div>
        <div className="flex-1 text-center self-center">
          <p className="text-[1.3rem] font-medium text-[#777]">남은 인증</p>
          <p className="text-[1.8rem] font-medium">{remainCount}</p>
        </div>
      </div>
    </>
  );
}

export default MyCertificationSummary;
