import { paymentsData } from "@/data/paymentsData";
import React from "react";

type PaymentsProps = {
  selectedPoint: string;
  setSelectedPoint: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};
const PaymentsGoods = ({
  selectedPoint,
  setSelectedPoint,
  setAmount,
  amount,
}: PaymentsProps) => {
  const handlePointClick = (p: string, a: number) => {
    setSelectedPoint(p);
    setAmount(a);
  };

  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <span className="text-[1.8rem] font-medium mb-[1.8rem] block">
        충전액수
      </span>
      <div className="flex justify-center items-center flex-col w-full mb-[10rem]">
        <div>
          <span className="font-bold text-[2.4rem]">
            {formatNumber(amount)} 원
          </span>
        </div>
        <span className="w-full h-[0.2rem] my-[1.65rem] bg-[#FF4356]"></span>
        <ul className="flex flex-row justify-between w-[37.8rem]">
          {paymentsData.map((point, index) => (
            <li key={index} className="">
              <button
                className="w-[72px] h-[38px] bg-white border border-gray-300 shadow-lg rounded-full"
                onClick={() => handlePointClick(point.value, point.amount)}
                style={{
                  backgroundColor:
                    point.value === selectedPoint ? "#FF4356" : "",
                  color: point.value === selectedPoint ? "#ffffff" : "",
                }}
              >
                <span className="font-normal text-[1.6rem]">
                  {point.value}p
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PaymentsGoods;
