import linkIcon from "@/assets/icon/link-icon.svg";
import failIcon from "@/assets/icon/cross-icon.svg";
import reportCheckIcon from "@/assets/icon/white-check.svg";
import reportNotCheckIcon from "@/assets/icon/gray-check.svg";
import React from "react";

interface MainProps {
  children: React.ReactNode;
}

interface OrdinalProps {
  content: string | number;
}

interface WrapperProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

interface DateProps {
  content: string;
}

function Main({ children }: MainProps) {
  return (
    <div className="w-[5rem] _sm:w-[4rem] h-[7.5rem] _sm:h-[6rem] rounded-[1rem] shadow-[0_3px_3px_2px_rgba(0,0,0,0.15)]">
      {children}
    </div>
  );
}

function InActiveOrdinal({ content }: OrdinalProps) {
  return (
    <div className="w-full h-[2.45rem] _sm:h-[2.1rem] bg-white text-black rounded-t-[1rem] text-[1.4rem] font-medium flex justify-center items-center">
      {content}
    </div>
  );
}

function ActiveOrdinal({ content }: OrdinalProps) {
  return (
    <div className="w-full h-[2.45rem] _sm:h-[2.1rem] bg-[#463F3F] text-white rounded-t-[1rem] text-[1.4rem] font-medium flex justify-center items-center">
      {content}
    </div>
  );
}

function EmptyOrdinal() {
  return (
    <div className="w-full h-[2.45rem] _sm:h-[2.1rem] bg-[#E6E6E6] text-white rounded-t-[1rem] text-[1.4rem] font-medium flex justify-center items-center" />
  );
}

function SuccessWrapper({ children, onClick }: WrapperProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-[#61FBAB] rounded-b-[1rem] cursor-pointer"
    >
      {children}
    </div>
  );
}

function FailWrapper({ children }: WrapperProps) {
  return (
    <div className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-[#F88591] rounded-b-[1rem]">
      {children}
    </div>
  );
}

function EmptyWrapper({ children }: WrapperProps) {
  return (
    <div className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-[#E6E6E6] rounded-b-[1rem] flex flex-col justify-start items-center">
      {children}
    </div>
  );
}

function ReportWrapper({ children }: WrapperProps) {
  return (
    <div className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-_coral-70 rounded-b-[1rem] flex justify-center items-center">
      {children}
    </div>
  );
}

function SuccessDate({ content }: DateProps) {
  return (
    <p className="text-[1rem] font-medium text-[#7D7D72] pt-[0.4rem] flex justify-center items-center">
      {content}
    </p>
  );
}

function FailDate({ content }: DateProps) {
  return (
    <p className="text-[1rem] font-medium text-[#7E6868] pt-[0.4rem] flex justify-center items-center">
      {content}
    </p>
  );
}

function SuccessIcon() {
  return (
    <div className="mt-[0.1rem] _sm:mt-[-0.5rem] _sm:ml-[0.1rem] flex justify-center items-center">
      <img
        src={linkIcon}
        alt="링크 연결 아이콘"
        width={2.5}
        className="_sm:w-[2.5rem] w-[2.5rem]"
      />
    </div>
  );
}

function FailIcon() {
  return (
    <div className="mt-[0.5rem] _sm:mt-[0.05rem]  flex justify-center items-center">
      <img
        src={failIcon}
        alt="링크 연결 아이콘"
        width={1.3}
        className="_sm:w-[1.2rem] w-[1.3rem]"
      />
    </div>
  );
}

function PassIcon() {
  return (
    <div className="_sm:mt-[-0.35rem] flex justify-center items-center">
      <p className="text-[1.7rem] _sm:text-[1.5rem] font-medium text-white">
        P
      </p>
    </div>
  );
}

function ReportCheckIcon() {
  return (
    <div className="flex justify-center items-center">
      <img
        src={reportCheckIcon}
        alt="신고 아이콘"
        width={21}
        className="w-[2.1rem] _sm:w-[1.1rem]"
      />
    </div>
  );
}

function ReportNotCheckIcon() {
  return (
    <div className="flex justify-center items-center">
      <img
        src={reportNotCheckIcon}
        alt="신고 아이콘"
        width={21}
        className="w-[2.1rem] _sm:w-[1.1rem]"
      />
    </div>
  );
}

export const CertificationResult = Object.assign(Main, {
  InActiveOrdinal: InActiveOrdinal,
  ActiveOrdinal: ActiveOrdinal,
  EmptyOrdinal: EmptyOrdinal,
  SuccessWrapper: SuccessWrapper,
  FailWrapper: FailWrapper,
  EmptyWrapper: EmptyWrapper,
  ReportWrapper: ReportWrapper,
  SuccessDate: SuccessDate,
  FailDate: FailDate,
  SuccessIcon: SuccessIcon,
  FailIcon: FailIcon,
  PassIcon: PassIcon,
  ReportCheckIcon: ReportCheckIcon,
  ReportNotCheckIcon: ReportNotCheckIcon,
});
