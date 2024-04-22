import grayExclamationMark from "@/assets/icon/gray-exclamation-mark.svg";

interface Props {
  title: string;
}
function EmptyDataComponent({ title }: Props) {
  return (
    <div className="py-[3rem] w-full flex flex-col justify-center items-center">
      <img
        src={grayExclamationMark}
        alt="빈 콘텐츠 아이콘"
        className="w-[3rem]"
      />
      <p className="mt-[0.6rem] font-medium text-[1.3rem] text-[#777]">
        {title}
      </p>
    </div>
  );
}

export default EmptyDataComponent;
