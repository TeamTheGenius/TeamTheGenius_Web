import { Link } from "react-router-dom";
import pointIcon from "@/assets/icon/point-big-icon.svg";
import paymentLinkButton from "@/assets/icon/gray-next-arrow.svg";
import { PATH } from "@/constants/path";
import { useGetMyProfile } from "@/hooks/queries/useProfileQuery";

function MyPoint() {
  const { data: profilePoint } = useGetMyProfile();

  return (
    <div className="pl-[1.7rem] py-[1.8rem] pr-[3rem] _sm:pr-[1.8rem] flex w-full  h-[14.7rem] _sm:h-[13.7rem] rounded-[1rem] border border-[#E1E1E1] shadow-[0_4px_10px_0_rgba(225,225,225)]">
      <img
        src={pointIcon}
        alt="point 아이콘"
        className="_sm:w-[9.9rem] w-[11rem] self-center"
      />

      <div className="ml-[2.7rem] _sm:ml-[1.4rem] flex justify-between w-full">
        <div className="flex flex-col gap-[0.3rem] mt-[0.5rem] ">
          <p className="text-[1.2rem] font-medium text-[#777]">포인트</p>
          <p className="text-[2rem] font-medium">{profilePoint?.point}P</p>
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
