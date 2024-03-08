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
  dayOfWeek: string;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED";
  prCount: number;
  prLinks: string[];
}

function ThisWeekCertification({ data }: Data) {
  const [clickPossible, setClickPossible] = useState<boolean>(true);

  if (!data) {
    return;
  }

  const firstAttempt = data.certifications[0]
    ? data.certifications[0].certificationAttempt
    : 1;

  const onClickSuccessCertification = (prLink: string) => {
    if (clickPossible) {
      window.open(prLink);
    }
  };

  return (
    <HorizontalScroll setClickPossible={setClickPossible}>
      <div className="pl-[2.5rem] _sm:pl-[0.4rem] max-w-[5rem] _sm:max-w-[4rem] flex gap-[1.2rem] _sm:gap-[0.2rem] pb-[0.6rem]">
        {[...Array(7)].map((_, index) => {
          if (!data.certifications[index])
            return (
              <div key={index} className="pl-[0.4rem] pr-[0.4rem]">
                <CertificationResult>
                  <CertificationResult.InActiveOrdinal
                    content={firstAttempt + index}
                  />
                  <CertificationResult.EmptyWrapper />
                </CertificationResult>
              </div>
            );

          const {
            certificationAttempt,
            certificatedAt,
            certificateStatus,
            prLinks,
          } = data.certifications[index];
          return (
            <div key={index} className="pl-[0.4rem] pr-[0.4rem]">
              {certificateStatus === "NOT_YET" && (
                <CertificationResult key={index}>
                  {getIsToday({
                    date: certificatedAt,
                  }) ? (
                    <CertificationResult.ActiveOrdinal
                      content={certificationAttempt}
                    />
                  ) : (
                    <CertificationResult.InActiveOrdinal
                      content={certificationAttempt}
                    />
                  )}
                  {getIsToday({ date: certificatedAt }) ? (
                    <CertificationResult.EmptyWrapper>
                      <CertificationResult.FailDate
                        content={getSlashDate({
                          date: certificatedAt,
                        })}
                      />
                    </CertificationResult.EmptyWrapper>
                  ) : (
                    <CertificationResult.FailWrapper>
                      <CertificationResult.FailDate
                        content={getSlashDate({
                          date: certificatedAt,
                        })}
                      />
                      <CertificationResult.FailIcon />
                    </CertificationResult.FailWrapper>
                  )}
                </CertificationResult>
              )}
              {certificateStatus === "CERTIFICATED" && (
                <CertificationResult key={index}>
                  {getIsToday({
                    date: certificatedAt,
                  }) ? (
                    <CertificationResult.ActiveOrdinal
                      content={certificationAttempt}
                    />
                  ) : (
                    <CertificationResult.InActiveOrdinal
                      content={certificationAttempt}
                    />
                  )}
                  <CertificationResult.SuccessWrapper
                    onClick={() => onClickSuccessCertification(prLinks[0])}
                  >
                    <CertificationResult.SuccessDate
                      content={getSlashDate({
                        date: certificatedAt,
                      })}
                    />
                    <CertificationResult.SuccessIcon />
                  </CertificationResult.SuccessWrapper>
                </CertificationResult>
              )}
            </div>
          );
        })}
      </div>
    </HorizontalScroll>
  );
}

export default ThisWeekCertification;
