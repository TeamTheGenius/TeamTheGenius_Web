import linkIcon from "@/assets/icon/link-icon.svg";
import failIcon from "@/assets/icon/cross-icon.svg";
import React from "react";

interface MainProps {
  children: React.ReactNode;
}

interface OrdinalProps {
  content: number;
}

interface SuccessWrapperProps {
  children: React.ReactNode;
}

interface FailWrapperProps {
  children: React.ReactNode;
}

interface EmptyWrapperProps {
  children: React.ReactNode;
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
  <div className="w-full h-[2.45rem] _sm:h-[2.1rem] bg-[#463F3F] text-white rounded-t-[1rem] text-[1.4rem] font-medium flex justify-center items-center">
    {content}
  </div>;
}

function SuccessWrapper({ children }: SuccessWrapperProps) {
  return (
    <div className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-[#61FBAB] rounded-b-[1rem]">
      {children}
    </div>
  );
}

function FailWrapper({ children }: FailWrapperProps) {
  return (
    <div className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-[#F88591] rounded-b-[1rem]">
      {children}
    </div>
  );
}

function EmptyWrapper({ children }: EmptyWrapperProps) {
  return (
    <div className="w-full h-[5.05rem] _sm:h-[3.9rem] bg-[#E6E6E6] rounded-b-[1rem]">
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
      <img src={linkIcon} alt="링크 연결 아이콘" />
    </div>
  );
}

function FailIcon() {
  return (
    <div className="mt-[0.5rem] _sm:mt-[0.05rem]  flex justify-center items-center">
      <img src={failIcon} alt="링크 연결 아이콘" />
    </div>
  );
}

export const CertificationResult = Object.assign(Main, {
  InActiveOrdinal: InActiveOrdinal,
  ActiveOrdinal: ActiveOrdinal,
  SuccessWrapper: SuccessWrapper,
  FailWrapper: FailWrapper,
  EmptyWrapper: EmptyWrapper,
  SuccessDate: SuccessDate,
  FailDate: FailDate,
  SuccessIcon: SuccessIcon,
  FailIcon: FailIcon,
});
