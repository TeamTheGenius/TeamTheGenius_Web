import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import { getSlashDate } from "@/utils/getSlashDate";

interface AllOthersCertificationProps {
  index: number;
  result: string;
  date: string;
}

interface Props {
  data: AllOthersCertificationProps[];
}

function OthersAllCertificationResult({ data }: Props) {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-[54rem] grid grid-cols-7 _sm:grid-cols-5 _md:grid-cols-6 gap-x-[2rem] gap-y-[5rem] ">
        {data.map((item, index) => (
          <div key={index} className="mx-auto">
            <CertificationResult key={item.index}>
              {item.result === "fail" && (
                <>
                  <CertificationResult.InActiveOrdinal content={item.index} />
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
                  <CertificationResult.InActiveOrdinal content={item.index} />
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
        ))}
      </div>
    </div>
  );
}

export default OthersAllCertificationResult;
