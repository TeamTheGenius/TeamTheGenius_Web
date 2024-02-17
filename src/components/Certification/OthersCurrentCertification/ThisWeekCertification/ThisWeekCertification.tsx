import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import HorizontalScroll from "@/components/Home/HorizontalScroll/HorizontalScroll";
import { getSlashDate } from "@/utils/getSlashDate";
import { useState } from "react";

interface CertificationResultInformationProps {
  index: number;
  date: string;
  result: string;
}

interface Props {
  data: CertificationResultInformationProps[];
}

function ThisWeekCertification({ data }: Props) {
  const [clickPossible, setClickPossible] = useState<boolean>(true);
  return (
    <HorizontalScroll setClickPossible={setClickPossible}>
      <div className="pl-[0.4rem] max-w-[5rem] _sm:max-w-[4rem] flex gap-[1.2rem] _sm:gap-[0.2rem] pb-[0.6rem]">
        {data.map(
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
  );
}

export default ThisWeekCertification;
