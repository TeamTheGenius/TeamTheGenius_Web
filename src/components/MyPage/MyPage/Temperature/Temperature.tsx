import temperatureIndicator from "@/assets/icon/temperature-indicator.svg";

interface Props {
  temperature: number;
}

function Temperature({ temperature }: Props) {
  temperature += 36.5;

  if (temperature <= 0) {
    temperature = 0;
  } else if (temperature >= 100) {
    temperature = 100;
  }

  const temperatureColorConditions = [
    { max: 10, color: "#7EC7FC" },
    { max: 20, color: "#72EF86" },
    { max: 36.5, color: "#FFEF5C" },
    { max: 65, color: "#FFAD62" },
    { max: 100, color: "#E76B6B" },
  ];

  const getTemperatureColor = () => {
    for (const condition of temperatureColorConditions) {
      if (temperature <= condition.max) {
        return `bg-[${condition.color}]`;
      }
    }
  };

  return (
    <div className="w-[21.5rem] _sm:w-[18rem] h-[2.5rem] _sm:h-[1.9rem] flex relative">
      <div
        className="z-10 w-[4.5rem] absolute top-[-2.7rem] -translate-x-[0.75rem]"
        style={{ left: `${temperature}%` }}
      >
        <p className="text-center text-[1.4rem] _sm:text-[1.2rem] font-medium text-[#777] -translate-x-[1.5rem]">
          {temperature}℃
        </p>
        <img
          src={temperatureIndicator}
          alt="temperature-indicator"
          className="w-[1.5rem]"
        />
      </div>

      <div className="relative h-full w-full bg-[#D9D9D9] rounded-[2.4rem]">
        <div
          className={`${getTemperatureColor()} absolute h-full rounded-[2.4rem]`}
          style={{ width: `${temperature}%` }}
        />
      </div>
    </div>
  );
}

export default Temperature;
