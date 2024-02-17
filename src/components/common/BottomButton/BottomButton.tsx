import React, { ReactNode } from "react";
import Button from "@/components/Common/Button";

const BottomButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 box-shodow z-[99999] bg-white">
      <div className="mx-[15.3rem] my-[1.9rem]">{children}</div>
    </div>
  );
};

export default BottomButton;
