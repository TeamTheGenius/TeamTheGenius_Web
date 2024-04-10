import MobCard from "@/components/Common/MobCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import redWarning from "@/assets/icon/red-warning.svg";
import { useEffect } from "react";
import postPaymentFail from "@/apis/postPaymentFail";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import { PATH } from "@/constants/path";

export function Fail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const requestData = {
      code: searchParams.get("code"),
      message: searchParams.get("message"),
      orderId: searchParams.get("orderId"),
    };

    postPaymentFail({
      orderId: requestData.orderId,
      message: requestData.message,
    });
  }, []);
  return (
    <MobCard>
      <div className="w-full flex justify-center flex-col items-center px-[6.6rem] pt-[17.6rem]">
        <div className="flex flex-col items-center mb-[4.8rem]">
          <img
            src={redWarning}
            alt="redCheck"
            className="w-[11.4rem] mb-[4rem]"
          />
          <h3 className="text-[1.8rem] font-bold">결제에 실패했습니다</h3>
        </div>
        <div className="w-full flex justify-center">
          <ul className="w-[24.7rem] text-[1.4rem]">
            <li className="w-full flex justify-between mb-[1.2rem]">
              <span className="text-[#666666]">에러 코드</span>
              <span>{`${searchParams.get("code")}`}</span>
            </li>
            <li className="w-full flex justify-between mb-[1.2rem]">
              <span className="text-[#666666]">에러 메세지</span>
              <span>{`${searchParams.get("message")}`}</span>
            </li>
            <li className="w-full flex justify-between mb-[1.2rem]">
              <span className="text-[#666666]">주문 번호</span>
              <span>{`${searchParams.get("orderId")}`}</span>
            </li>
          </ul>
        </div>
        <BottomButton
          onClick={navigate(PATH.PAYMENTS)}
          content="결제창으로"
          borderColor="border-[#FF4356]"
          btnColor="bg-[#ffffff]"
          btnHeight="h-[6.1rem]"
          btnMaxWidth="max-w-[46.7rem]"
          btnTextColor="text-[#FF4356]"
          marginX="mx-[2rem]"
        />
      </div>
    </MobCard>
  );
}
