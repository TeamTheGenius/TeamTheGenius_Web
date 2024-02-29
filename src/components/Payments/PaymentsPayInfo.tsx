type paymentsPayInfoProps = {
  amount: number;
};

const PaymentsPayInfo = ({ amount }: paymentsPayInfoProps) => {
  return (
    <>
      <span className="text-[1.8rem] font-medium mb-[3.7rem] block">
        포인트 충전 및 결제
      </span>
      <div className="flex justify-center flex-col items-center">
        <div className="flex justify-between text-[1.4rem] w-11/12 mb-[1.4rem]">
          <span className="font-normal">충전 전 포인트</span>
          <span className="font-medium">0 P</span>
        </div>
        <div className="flex justify-between text-[1.4rem] w-11/12 mb-[3rem]">
          <span className="font-normal">충전 후 포인트</span>
          <span className="font-medium">100 P</span>
        </div>
        <div className="flex justify-between w-11/12">
          <span className="font-bold text-[1.8rem]">결제 금액</span>
          <span className="font-bold text-[2.2rem] text-[#FF4356]">
            {amount} 원
          </span>
        </div>
      </div>
    </>
  );
};
export default PaymentsPayInfo;
