import whiteCheckIcon from "@/assets/icon/white-check.svg";

function Title() {
  return (
    <>
      <div className="flex gap-[1.7rem] items-center">
        <div className="w-[3rem] h-[3rem] rounded-[0.4rem] flex justify-center items-center bg-_coral-70">
          <img src={whiteCheckIcon} alt="체크 아이콘" width={11} />
        </div>
        <p className="text-[1.6rem] font-medium">
          신고할 항목을 선택해 주세요.
        </p>
      </div>
      <p className="mt-[1.3rem] text-[1.4rem] font-medium text-[#777]">
        신고는 인증 성공한 항목만 가능합니다.
      </p>
    </>
  );
}

export default Title;
