import { ErrorHeaderType } from "@/pages/Error/Error";

const ErrorHeader = ({ errNum, errorTxt }: ErrorHeaderType) => {
  return (
    <p className="flex items-center flex-col mb-[63rem] pt-[31rem]">
      <h1 className="font-bold text-_h1 mb-12">{errNum} ERROR</h1>
      {errorTxt ? (
        <span className="text-[2.4rem] font-medium">{errorTxt}</span>
      ) : (
        <span className="text-[2.4rem] font-medium">
          페이지 정보가 없습니다
        </span>
      )}
    </p>
  );
};

export default ErrorHeader;
