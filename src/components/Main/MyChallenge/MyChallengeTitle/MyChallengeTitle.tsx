import arrowRight from "@/assets/icon/arrow-right.svg";
import { useEffect, useState } from "react";

type MyChallengeTitleType = {
  title: string;
  point: number;
  authTime?: string;
  repositoryName?: string;
};

const MyChallengeTitle = ({
  title,
  point,
  authTime,
  repositoryName,
}: MyChallengeTitleType) => {
  const [mobView, setMobView] = useState(false);

  useEffect(() => {
    const Resize = () => {
      const viewportWidth = window.innerWidth;
      const mobileWidth = viewportWidth <= 400;
      setMobView(mobileWidth);
    };

    Resize();

    window.addEventListener("resize", Resize);
    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, []);

  const mobTitle = title.length <= 8 ? title : title.slice(0, 8) + "...";
  const pcTitle = title.length <= 12 ? title : title.slice(0, 12) + "...";
  const mobRepositoryName = repositoryName
    ? repositoryName.length <= 12
      ? repositoryName
      : repositoryName.slice(0, 12) + "..."
    : "";
  const pcRepositoryName = repositoryName
    ? repositoryName.length <= 20
      ? repositoryName
      : repositoryName.slice(0, 20) + "..."
    : "";
  const displayTitle = mobView ? mobTitle : pcTitle;
  const displayRepositoryName = mobView ? mobRepositoryName : pcRepositoryName;

  return (
    <div>
      <h3 className="text-[1.6rem] font-medium text-black">{displayTitle}</h3>
      <div className="flex text-[#777777] flex-col">
        <span className="whitespace-nowrap font-normal text-[12px]">
          보상 {point}P
        </span>
        {authTime && (
          <span className="font-normal text-[10px]">인증시간: {authTime}</span>
        )}
        {repositoryName && (
          <span className="text-[1rem] font-normal text-[#777] ">
            {displayRepositoryName}
          </span>
        )}
      </div>
      <img
        src={arrowRight}
        alt="화살표 아이콘"
        className="absolute right-0 top-[2rem] w-[1.15rem] h-[1.8rem]"
      />
    </div>
  );
};

export default MyChallengeTitle;
