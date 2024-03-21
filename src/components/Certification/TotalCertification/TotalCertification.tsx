import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import useModal from "@/hooks/useModal";
import { getIsToday } from "@/utils/getIsToday";
import { getSlashDate } from "@/utils/getSlashDate";
import { useState } from "react";
import CertificationPRLinkModal from "../CertificationModal/CertificationPRLinkModal/CertificationPRLinkModal";
import { createPortal } from "react-dom";
import { Modal, ModalLayer } from "@/components/Common/Modal/Modal";

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

interface CertificationModal {
  prLinks: string[];
  certificationAttempt: number;
  certificatedAt: string;
}

function TotalCertification({ data }: Data) {
  const { openModal, closeModal, isModalOpened } = useModal();
  const [modal, setModal] = useState(<></>);

  const LAST_ATTEMPT = data.certifications[data.certifications.length - 1]
    ? data.certifications[data.certifications.length - 1].certificationAttempt
    : 0;
  const EMPTY_CERTIFICATION_COUNT =
    data.totalAttempts - data.certifications.length < 0
      ? 0
      : data.totalAttempts - data.certifications.length;

  const onClickSuccessCertification = ({
    prLinks,
    certificatedAt,
    certificationAttempt,
  }: CertificationModal) => {
    setModal(
      <CertificationPRLinkModal
        prLinks={prLinks}
        certificatedAt={certificatedAt}
        certificationAttempt={certificationAttempt}
      />
    );
    openModal();
  };

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
            <div key={`today_not_yet_${index}`} className="mx-auto">
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
            <div key={`not_today_not_yet_${index}`} className="mx-auto">
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
            <div key={`today_certificated_${index}`} className="mx-auto">
              <CertificationResult>
                <CertificationResult.ActiveOrdinal
                  content={item.certificationAttempt}
                />
                <CertificationResult.SuccessWrapper
                  onClick={() =>
                    onClickSuccessCertification({
                      prLinks: item.prLinks,
                      certificationAttempt: item.certificationAttempt,
                      certificatedAt: item.certificatedAt,
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
            <div className="mx-auto">
              <CertificationResult>
                <CertificationResult.InActiveOrdinal
                  content={item.certificationAttempt}
                />
                <CertificationResult.SuccessWrapper
                  onClick={() =>
                    onClickSuccessCertification({
                      prLinks: item.prLinks,
                      certificationAttempt: item.certificationAttempt,
                      certificatedAt: item.certificatedAt,
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
            <div className="mx-auto">
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
                  <CertificationResult.PassIcon />
                </CertificationResult.SuccessWrapper>
              </CertificationResult>
            </div>
          );
        else if (NOT_TODAY_PASSED)
          return (
            <div className="mx-auto">
              <CertificationResult>
                <CertificationResult.InActiveOrdinal
                  content={item.certificationAttempt}
                />
                <CertificationResult.PassIcon />
                <CertificationResult.SuccessWrapper />
              </CertificationResult>
            </div>
          );
      })}

      {[...Array(EMPTY_CERTIFICATION_COUNT)].map((_, index) => (
        <div className="mx-auto">
          <CertificationResult>
            <CertificationResult.InActiveOrdinal
              content={LAST_ATTEMPT + 1 + index}
            />
            <CertificationResult.EmptyWrapper />
          </CertificationResult>
        </div>
      ))}
    </>
  );
}

export default TotalCertification;
