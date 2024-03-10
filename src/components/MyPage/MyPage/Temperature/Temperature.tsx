import temperatureIndicator from "@/assets/icon/temperature-indicator.svg";
interface Props {
  temperature: number;
}
function Temperature({ temperature }: Props) {
  return (
    <div className="w-[22.4rem] _sm:w-[18rem] h-[2.5rem] _sm:h-[1.9rem] flex relative">
      <img
        src={temperatureIndicator}
        alt="temperature-indicator"
        className="absolute top-[-1rem] "
        style={{ left: `calc(${36.5 + temperature}% - 0.78rem)` }}
      />
      <div className="bg-[#7EC7FC] w-[12%] h-full rounded-l-[2.4rem]" />
      <div className="bg-[#72EF86] w-[21%] h-full" />
      <div className="bg-[#FFEF5C] w-[24%] h-full" />
      <div className="bg-[#FFAD62] w-[21%] h-full" />
      <div className="bg-[#E76B6B] w-[22%] h-full rounded-r-[2.4rem]" />
    </div>
  );
}

export default Temperature;
