import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import HorizontalScroll from "@/components/Home/HorizontalScroll/HorizontalScroll";
import { getSlashDate } from "@/utils/getSlashDate";
import { getIsToday } from "@/utils/getIsToday";
import { useState } from "react";

interface Data {
  data: {
    userId: number;
    certifications: CertificationData[];
  };
}

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: DayOfWeek;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED" | "PASSED";
  prCount: number;
  prLinks: string[];
}

interface DayOfWeekIndex {
  [key: number]: string;
}

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

function ThisWeekCertification({ data }: Data) {
  const [clickPossible, setClickPossible] = useState<boolean>(true);

  const onClickSuccessCertification = (prLink: string) => {
    if (clickPossible) {
      window.open(prLink);
    }
  };

  const DayOfWeek = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
  };

  const DayOfWeekIndex: DayOfWeekIndex = {
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
    7: "일",
  };

  const emptyCount = DayOfWeek[data.certifications[0].dayOfWeek] - 1;

  return (
    <HorizontalScroll setClickPossible={setClickPossible}>
      <div className="pl-[2.5rem] _sm:pl-[0.4rem] max-w-[5rem] _sm:max-w-[4rem] flex gap-[1.2rem] _sm:gap-[0.2rem] pb-[0.6rem]">
        {[...Array(emptyCount)].map((_, index) => (
          <div key={index} className="pl-[0.4rem] pr-[0.4rem]">
            <CertificationResult>
              <CertificationResult.InActiveOrdinal
                content={DayOfWeekIndex[index]}
              />
              <CertificationResult.EmptyWrapper />
            </CertificationResult>
          </div>
        ))}

        {data.certifications.map((item, index) => {
          const isToday = getIsToday({ date: item.certificatedAt });
          const TODAY_NOT_YET = isToday && item.certificateStatus === "NOT_YET";
          const NOT_TODAY_NOT_YET =
            !isToday && item.certificateStatus === "NOT_YET";
          const TODAY_CERTIFICATED =
            isToday && item.certificateStatus === "CERTIFICATED";
          const NOT_TODAY_CERTIFICATED =
            !isToday && item.certificateStatus === "CERTIFICATED";
          const TODAY_PASSED = isToday && item.certificateStatus === "PASSED";
          const NOT_TODAY_PASSED =
            !isToday && item.certificateStatus === "PASSED";

          if (TODAY_NOT_YET)
            return (
              <div className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.ActiveOrdinal
                    content={DayOfWeekIndex[emptyCount + 1 + index]}
                  />
                  <CertificationResult.EmptyWrapper>
                    <CertificationResult.FailDate
                      content={getSlashDate({
                        date: item.certificatedAt,
                      })}
                    />
                  </CertificationResult.EmptyWrapper>
                </CertificationResult>
              </div>
            );
          else if (NOT_TODAY_NOT_YET)
            return (
              <div className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.InActiveOrdinal
                    content={DayOfWeekIndex[emptyCount + 1 + index]}
                  />
                  <CertificationResult.FailWrapper>
                    <CertificationResult.FailDate
                      content={getSlashDate({
                        date: item.certificatedAt,
                      })}
                    />
                    <CertificationResult.FailIcon />
                  </CertificationResult.FailWrapper>
                </CertificationResult>
              </div>
            );
          else if (TODAY_CERTIFICATED)
            return (
              <div className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.ActiveOrdinal
                    content={DayOfWeekIndex[emptyCount + 1 + index]}
                  />
                  <CertificationResult.SuccessWrapper
                    onClick={() => onClickSuccessCertification(item.prLinks[0])}
                  >
                    <CertificationResult.SuccessDate
                      content={getSlashDate({
                        date: item.certificatedAt,
                      })}
                    />
                    <CertificationResult.SuccessIcon />
                  </CertificationResult.SuccessWrapper>
                </CertificationResult>
              </div>
            );
          else if (NOT_TODAY_CERTIFICATED)
            return (
              <div className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.InActiveOrdinal
                    content={DayOfWeekIndex[emptyCount + 1 + index]}
                  />
                  <CertificationResult.SuccessWrapper
                    onClick={() => onClickSuccessCertification(item.prLinks[0])}
                  >
                    <CertificationResult.SuccessDate
                      content={getSlashDate({
                        date: item.certificatedAt,
                      })}
                    />
                    <CertificationResult.SuccessIcon />
                  </CertificationResult.SuccessWrapper>
                </CertificationResult>
              </div>
            );
          else if (TODAY_PASSED)
            return (
              <div className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.ActiveOrdinal
                    content={DayOfWeekIndex[emptyCount + 1 + index]}
                  />

                  <CertificationResult.SuccessWrapper>
                    <CertificationResult.SuccessDate
                      content={getSlashDate({
                        date: item.certificatedAt,
                      })}
                    />
                  </CertificationResult.SuccessWrapper>
                </CertificationResult>
              </div>
            );
          else if (NOT_TODAY_PASSED)
            return (
              <div className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.InActiveOrdinal
                    content={DayOfWeekIndex[emptyCount + 1 + index]}
                  />
                  <CertificationResult.SuccessWrapper />
                </CertificationResult>
              </div>
            );
        })}

        {[...Array(7 - data.certifications.length - emptyCount)].map(
          (_, index) => (
            <div className="pl-[0.4rem] pr-[0.4rem]">
              <CertificationResult>
                <CertificationResult.InActiveOrdinal
                  content={
                    DayOfWeekIndex[
                      emptyCount + index + 1 + data.certifications.length
                    ]
                  }
                />
                <CertificationResult.EmptyWrapper />
              </CertificationResult>
            </div>
          )
        )}
      </div>
    </HorizontalScroll>
  );
}

export default ThisWeekCertification;
