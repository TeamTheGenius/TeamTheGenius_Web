import checkIcon from "@/assets/icon/red-check-icon.svg";
import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import HorizontalScroll from "@/components/Home/HorizontalScroll/HorizontalScroll";
import { myCertificationResultData } from "@/data/myCertificationResultData";
import { getSlashDate } from "@/utils/getSlashDate";
import { useState } from "react";

function ThisWeekCertification() {
  const [clickPossible, setClickPossible] = useState<boolean>(true);
  return (
    <>
      <div className="flex gap-[1.5rem]">
        <img src={checkIcon} alt="레드 체크 모양 아이콘" />
        <p className="text-[1.4rem] font-medium">이번 주 인증 모아보기</p>
      </div>
      <div className=" mt-[2.3rem] pb-[5rem]">
        <HorizontalScroll setClickPossible={setClickPossible}>
          <div className="pl-[2.5rem] _sm:pl-[0.4rem] max-w-[5rem] _sm:max-w-[4rem] flex gap-[1.2rem] _sm:gap-[0.2rem] pb-[0.6rem]">
            {myCertificationResultData.map(
              (item, index) =>
                index < 7 && (
                  <div key={index} className="pl-[0.4rem] pr-[0.4rem]">
                    <CertificationResult key={item.index}>
                      {item.result === "fail" && (
                        <>
                          <CertificationResult.InActiveOrdinal
                            content={item.index}
                          />
                          <CertificationResult.FailWrapper>
                            <CertificationResult.FailDate
                              content={getSlashDate({ date: item.date })}
                            />
                            <CertificationResult.FailIcon />
                          </CertificationResult.FailWrapper>
                        </>
                      )}
                      {item.result === "success" && (
                        <>
                          <CertificationResult.InActiveOrdinal
                            content={item.index}
                          />
                          <CertificationResult.SuccessWrapper>
                            <CertificationResult.SuccessDate
                              content={getSlashDate({ date: item.date })}
                            />
                            <CertificationResult.SuccessIcon />
                          </CertificationResult.SuccessWrapper>
                        </>
                      )}
                    </CertificationResult>
                  </div>
                )
            )}
          </div>
        </HorizontalScroll>
      </div>
    </>
  );
}

export default ThisWeekCertification;
