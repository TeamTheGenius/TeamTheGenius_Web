import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import HorizontalScroll from "@/components/Home/HorizontalScroll/HorizontalScroll";
import { getSlashDate } from "@/utils/getSlashDate";
import { getIsToday } from "@/utils/getIsToday";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import { createPortal } from "react-dom";
import { Modal, ModalLayer } from "@/components/Common/Modal/Modal";
import CertificationPRLinkModal from "../CertificationModal/CertificationPRLinkModal/CertificationPRLinkModal";
import { cls } from "@/utils/mergeTailwind";

interface Props {
  data: {
    userId: number;
    certifications: CertificationData[];
  };
  paddingLeft?: string;
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

interface CertificationModal {
  prLinks: string[];
  certificationAttempt: number;
  certificatedAt: string;
}

function ThisWeekCertification({ data, paddingLeft }: Props) {
  const [clickPossible, setClickPossible] = useState<boolean>(true);
  const { openModal, closeModal, isModalOpened } = useModal();
  const [modal, setModal] = useState(<></>);

  const onClickSuccessCertification = ({
    prLinks,
    certificatedAt,
    certificationAttempt,
  }: CertificationModal) => {
    if (!clickPossible) return;
    setModal(
      <CertificationPRLinkModal
        prLinks={prLinks}
        certificatedAt={certificatedAt}
        certificationAttempt={certificationAttempt}
      />
    );
    openModal();
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

  const emptyCount = data.certifications[0]
    ? DayOfWeek[data.certifications[0].dayOfWeek] - 1
    : 0;
  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>
            <Modal.ModalContentBox width="w-[46.2rem]" height="h-[39.5rem]">
              {modal}
            </Modal.ModalContentBox>
          </ModalLayer>,
          document.body
        )}

      <HorizontalScroll setClickPossible={setClickPossible}>
        <div
          className={cls(
            "_sm:pl-[0.4rem] max-w-[5rem] _sm:max-w-[4rem] flex gap-[1.2rem] _sm:gap-[0.2rem] pb-[0.6rem]",
            paddingLeft ? paddingLeft : ""
          )}
        >
          {[...Array(emptyCount)].map((_, index) => (
            <div key={index} className="pl-[0.4rem] pr-[0.4rem]">
              <CertificationResult>
                <CertificationResult.InActiveOrdinal
                  content={DayOfWeekIndex[index + 1]}
                />
                <CertificationResult.EmptyWrapper />
              </CertificationResult>
            </div>
          ))}

          {data.certifications.map((item, index) => {
            const isToday = getIsToday({ date: item.certificatedAt });
            const TODAY_NOT_YET =
              isToday && item.certificateStatus === "NOT_YET";
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
                      onClick={() =>
                        onClickSuccessCertification({
                          prLinks: item.prLinks,
                          certificatedAt: item.certificatedAt,
                          certificationAttempt: item.certificationAttempt,
                        })
                      }
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
                      onClick={() =>
                        onClickSuccessCertification({
                          prLinks: item.prLinks,
                          certificatedAt: item.certificatedAt,
                          certificationAttempt: item.certificationAttempt,
                        })
                      }
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

          {7 - data.certifications.length - emptyCount >= 0 &&
            [...Array(7 - data.certifications.length - emptyCount)].map(
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
    </>
  );
}

export default ThisWeekCertification;
