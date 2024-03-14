import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import { getIsToday } from "@/utils/getIsToday";
import { getSlashDate } from "@/utils/getSlashDate";

interface Data {
  data: {
    totalAttempts: number;
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

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

function TotalCertification({ data }: Data) {
  const lastAttempt = data.certifications[data.certifications.length - 1]
    ? data.certifications[data.certifications.length - 1].certificationAttempt
    : 0;

  const onClickSuccessCertification = (prLink: string) => {
    window.open(prLink);
  };

  return (
    <>
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
            <div
              key={`today_not_yet_${index}`}
              className="pl-[0.4rem] pr-[0.4rem]"
            >
              <CertificationResult>
                <CertificationResult.ActiveOrdinal
                  content={item.certificationAttempt}
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
            <div
              key={`not_today_not_yet_${index}`}
              className="pl-[0.4rem] pr-[0.4rem]"
            >
              <CertificationResult>
                <CertificationResult.InActiveOrdinal
                  content={item.certificationAttempt}
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
            <div
              key={`today_certificated_${index}`}
              className="pl-[0.4rem] pr-[0.4rem]"
            >
              <CertificationResult>
                <CertificationResult.ActiveOrdinal
                  content={item.certificationAttempt}
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
                  content={item.certificationAttempt}
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
                  content={item.certificationAttempt}
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
                  content={item.certificationAttempt}
                />
                <CertificationResult.SuccessWrapper />
              </CertificationResult>
            </div>
          );
      })}

      {[...Array(data.totalAttempts - data.certifications.length)].map(
        (_, index) => (
          <div className="pl-[0.4rem] pr-[0.4rem]">
            <CertificationResult>
              <CertificationResult.InActiveOrdinal
                content={lastAttempt + 1 + index}
              />
              <CertificationResult.EmptyWrapper />
            </CertificationResult>
          </div>
        )
      )}
    </>
  );
}

export default TotalCertification;
