import { breakLine } from "@/utils/breakLine";
import { cls } from "@/utils/mergeTailwind";
import React from "react";

interface ModalLayerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface ModalContentBoxProps {
  width: string;
  height: string;
  children: React.ReactNode;
}

interface ModalContentProps {
  content: string;
}

function ModalContentBox({ width, height, children }: ModalContentBoxProps) {
  const onClickModalBox = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClickModalBox}
      className={cls(
        `relative overflow-scroll scrollbar-hide bg-white z-[9999] mx-[2.2rem] rounded-[2rem] p-[1.7rem] flex justify-center items-center`,
        width,
        height
      )}
    >
      {children}
    </div>
  );
}

function ModalContent({ content }: ModalContentProps) {
  return (
    <p className="break-all text-center  text-[1.8rem] font-medium text-black whitespace-pre-wrap">
      {breakLine(content)}
    </p>
  );
}
export function ModalLayer({ children, onClick }: ModalLayerProps) {
  return (
    <div
      onClick={onClick}
      className="z-[9999] w-full h-full fixed top-0 left-0 flex justify-center items-center bg-[#00000080]"
    >
      {children}
    </div>
  );
}

export const Modal = {
  ModalContentBox,
  ModalContent,
};
