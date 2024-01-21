import { cls } from "@/utils/mergeTailwind";

interface Props {
  content: string;
  isActive: boolean;
}

function Tab({ content, isActive }: Props) {
  return (
    <div
      className={cls(
        "w-full max-w-[17rem] h-[4.6rem] flex justify-center items-center text-[1.6rem] font-medium leading-_normal relative",
        isActive ? "text-black" : "text-[#777]"
      )}
    >
      {content}
      {isActive && (
        <div className="w-[93%] h-[0.3rem] bg-black absolute bottom-0 left-1/2 -translate-x-1/2 " />
      )}
    </div>
  );
}

export default Tab;
