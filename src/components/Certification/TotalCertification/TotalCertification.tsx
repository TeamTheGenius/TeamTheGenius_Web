import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import { getIsToday } from "@/utils/getIsToday";
import { getSlashDate } from "@/utils/getSlashDate";
import { Fragment } from "react";

interface Data {
  data: {
    totalAttempts: number;
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

function TotalCertification({ data }: Data) {
  const firstAttempt = data.certifications[0]
    ? data.certifications[0].certificationAttempt
    : 1;

  const onClickSuccessCertification = (prLink: string) => {
    window.open(prLink);
  };

  return (
    <>
      {[...Array(data.totalAttempts)].map((_, index) => {
        if (!data.certifications[index])
          return (
            <div className="mx-auto" key={index}>
              <CertificationResult key={index}>
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
          <Fragment key={index}>
            {certificateStatus === "NOT_YET" && (
              <div className="mx-auto" key={index}>
                <CertificationResult>
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
              </div>
            )}
            {certificateStatus === "CERTIFICATED" && (
              <div className="mx-auto" key={index}>
                <CertificationResult>
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
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default TotalCertification;
