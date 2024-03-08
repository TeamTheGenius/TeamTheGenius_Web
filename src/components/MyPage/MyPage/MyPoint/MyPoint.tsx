import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pointBigIcon from "@/assets/icon/point-big-icon.svg";
import pointSmallIcon from "@/assets/icon/point-small-icon.svg";
import paymentLinkButton from "@/assets/icon/gray-next-arrow.svg";
import debounce from "lodash/debounce";
import { PATH } from "@/constants/path";

interface Props {
  point: number;
}

function MyPoint({ point }: Props) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 200);

  return (
    <div className="pl-[1.7rem] py-[1.8rem] pr-[3rem] _sm:pr-[1.8rem] flex w-full  h-[14.7rem] _sm:h-[13.7rem] rounded-[1rem] border border-[#E1E1E1] shadow-[0_4px_10px_0_rgba(225,225,225)]">
      {width > 396 ? (
        <img src={pointBigIcon} alt="point 아이콘" className="self-center" />
      ) : (
        <img src={pointSmallIcon} alt="point 아이콘" className="self-center" />
      )}
      <div className="ml-[2.7rem] _sm:ml-[1.4rem] flex justify-between w-full">
        <div className="flex flex-col gap-[0.3rem] mt-[0.5rem] ">
          <p className="text-[1.2rem] font-medium text-[#777]">포인트</p>
          <p className="text-[2rem] font-medium">{point}P</p>
        </div>
        <div className="self-end ">
          <Link to={PATH.PAYMENTS} className="flex gap-[1.6rem]">
            <p className="text-[1.4rem] font-medium text-[#777]">충전</p>
            <img src={paymentLinkButton} alt="결제창 이동 아이콘" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyPoint;
