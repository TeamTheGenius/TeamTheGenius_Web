import checkIcon from "@/assets/icon/red-check-icon.svg";
import { cls } from "@/utils/mergeTailwind";
function CurrentAchivementRate() {
  const percent: number = 75;
  return (
    <>
      <div className="flex gap-[1.5rem]">
        <img src={checkIcon} alt="레드 체크 모양 아이콘" />
        <p className="text-[1.4rem] font-medium">현재까지 달성률</p>
      </div>
      <div className="flex justify-center items-center ">
        <div className="relative mt-[2.3rem] w-full max-w-[39.3rem] h-[2.2rem] bg-[#DEDEDE] rounded-[1rem] border border-[#CCC]">
          <div className="absolute left-[85%] bottom-0 translate-y-1/2 w-[0.3rem] h-[1.7rem] bg-_coral-70" />
          <div className="absolute left-[85%] -translate-x-1/2 bottom-0 translate-y-10 w-0 h-0 border-b-[#FDEDE1] border-b-[1.5rem] border-l-[1.3rem] border-r-[1.3rem] border-l-transparent border-r-transparent" />
          <div
            className={cls(
              "relative rounded-l-[1rem] h-full",
              percent >= 85 ? "bg-[#37E788]" : " bg-_coral-70",
              percent === 100 ? "rounded-r-[1rem]" : ""
            )}
            style={{ width: `${percent}%` }}
          >
            <p className="text-[1.1rem] font-normal absolute bottom-0 translate-y-9 right-0 translate-x-1/2">
              4/30
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="mt-[2.2rem] _sm:w-[11rem] w-[15.2rem] py-[1.5rem] px-[1rem] text-center text-[1.1rem] font-medium bg-[#FDEDE1] rounded-[1rem] shadow-[2px_3px_3px_0_rgba(0,0,0,0.25)]">
          85% 이상 달성 시<br /> <span className="text-[#FF5252]">100P</span>
          획득 !
        </div>
      </div>
    </>
  );
}

export default CurrentAchivementRate;
