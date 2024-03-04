import postPaymentSuccess from "@/apis/postPaymentSuccess";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import redCheck from "@/assets/icon/red-check-success.svg";
import MobCard from "@/components/Common/MobCard";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import { PATH } from "@/constants/path";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    postPaymentSuccess({
      encryptedSecretKey: encryptedSecretKey,
      orderId: requestData.orderId,
      amount: requestData.amount,
      paymentKey: requestData.paymentKey,
    });
  }, []);

  return (
    <MobCard>
      <div className="w-full flex justify-center flex-col items-center px-[6.6rem] pt-[17.6rem]">
        <div className="flex flex-col items-center mb-[4.8rem]">
          <img
            src={redCheck}
            alt="redCheck"
            className="w-[11.4rem] mb-[4rem]"
          />
          <h3 className="text-[1.8rem] font-bold">결제에 성공하였습니다</h3>
        </div>
        <div className="w-full flex justify-center">
          <ul className="w-[24.7rem] text-[1.4rem]">
            <li className="w-full flex justify-between mb-[1.2rem]">
              <span className="text-[#666666]">paymentKey</span>
              <span>{`${searchParams.get("paymentKey")}`}</span>
            </li>
            <li className="w-full flex justify-between mb-[1.2rem]">
              <span className="text-[#666666]">주문번호</span>
              <span>{`${searchParams.get("orderId")}`}</span>
            </li>
            <li className="w-full flex justify-between mb-[1.2rem]">
              <span className="text-[#666666]">결제금액</span>
              <span>{`${Number(
                searchParams.get("amount")
              ).toLocaleString()}원`}</span>
            </li>
          </ul>
        </div>
        <BottomButton
          onClick={navigate(PATH.HOME)}
          content="홈으로"
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
};
export default Success;
