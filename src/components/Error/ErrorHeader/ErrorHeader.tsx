import { ErrorHeaderType } from "@/pages/Error/Error";

const ErrorHeader = ({ errNum, errorTxt }: ErrorHeaderType) => {
  return (
    <div className="flex items-center flex-col mb-[63rem] pt-[31rem]">
      <span className="font-bold text-_h1 mb-12">{errNum} ERROR</span>
      {errorTxt ? (
        <span className="text-[2.4rem] font-medium">{errorTxt}</span>
      ) : (
        <span className="text-[2.4rem] font-medium">
          페이지 정보가 없습니다
        </span>
      )}
    </div>
  );
};

export default ErrorHeader;
