import checkIcon from "@/assets/icon/red-check-icon.svg";
import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import HorizontalScroll from "@/components/Home/HorizontalScroll/HorizontalScroll";
import { getSlashDate } from "@/utils/getSlashDate";
import { getIsToday } from "@/utils/getIsToday";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { useQuery } from "@tanstack/react-query";
import getCertificationWeek from "@/apis/getCertificationWeek";

interface Data {
  certificationId: number;
  certificationAttempt: number;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED";
  prCount: number;
  prLinks: string[];
}

function ThisWeekCertification() {
  const [clickPossible, setClickPossible] = useState<boolean>(true);

  const { id } = useParams();
  const identifier = localStorage.getItem(IDENTIFIER);

  const { data } = useQuery<Data[]>({
    queryKey: ["certificationWeek", { id }],
    queryFn: () =>
      id && identifier
        ? getCertificationWeek({
            instanceId: parseInt(id),
            identifier: identifier,
          })
        : Promise.resolve(null),
  });

  if (!data) {
    return;
  }

  const firstAttempt = data[0] ? data[0].certificationAttempt : 1;

  const onClickSuccessCertification = (prLink: string) => {
    if (clickPossible) {
      window.open(prLink);
    }
  };

  return (
    <>
      <div className="flex gap-[1.5rem]">
        <img src={checkIcon} alt="레드 체크 모양 아이콘" />
        <p className="text-[1.4rem] font-medium">이번 주 인증 모아보기</p>
      </div>
      <div className=" mt-[2.3rem] pb-[5rem]">
        <HorizontalScroll setClickPossible={setClickPossible}>
          <div className="pl-[2.5rem] _sm:pl-[0.4rem] max-w-[5rem] _sm:max-w-[4rem] flex gap-[1.2rem] _sm:gap-[0.2rem] pb-[0.6rem]">
            {[...Array(7)].map((_, index) => {
              return (
                <div key={index} className="pl-[0.4rem] pr-[0.4rem]">
                  {data[index] &&
                    data[index].certificateStatus === "NOT_YET" && (
                      <CertificationResult key={index}>
                        {getIsToday({
                          date: data[index].certificatedAt,
                        }) ? (
                          <CertificationResult.ActiveOrdinal
                            content={data[index].certificationAttempt}
                          />
                        ) : (
                          <CertificationResult.InActiveOrdinal
                            content={data[index].certificationAttempt}
                          />
                        )}
                        <CertificationResult.FailWrapper>
                          <CertificationResult.FailDate
                            content={getSlashDate({
                              date: data[index].certificatedAt,
                            })}
                          />
                          <CertificationResult.FailIcon />
                        </CertificationResult.FailWrapper>
                      </CertificationResult>
                    )}
                  {data[index] &&
                    data[index].certificateStatus === "CERTIFICATED" && (
                      <CertificationResult key={index}>
                        {getIsToday({
                          date: data[index].certificatedAt,
                        }) ? (
                          <CertificationResult.ActiveOrdinal
                            content={data[index].certificationAttempt}
                          />
                        ) : (
                          <CertificationResult.InActiveOrdinal
                            content={data[index].certificationAttempt}
                          />
                        )}
                        <CertificationResult.SuccessWrapper
                          onClick={() =>
                            onClickSuccessCertification(data[index].prLinks[0])
                          }
                        >
                          <CertificationResult.SuccessDate
                            content={getSlashDate({
                              date: data[index].certificatedAt,
                            })}
                          />
                          <CertificationResult.SuccessIcon />
                        </CertificationResult.SuccessWrapper>
                      </CertificationResult>
                    )}
                  {!data[index] && (
                    <CertificationResult key={index}>
                      <CertificationResult.InActiveOrdinal
                        content={firstAttempt + index}
                      />
                      <CertificationResult.EmptyWrapper />
                    </CertificationResult>
                  )}
                </div>
              );
            })}
          </div>
        </HorizontalScroll>
      </div>
    </>
  );
}

export default ThisWeekCertification;
