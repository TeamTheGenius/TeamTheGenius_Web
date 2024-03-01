import { CertificationResult } from "@/components/Common/CertificationResult/CertificationResult";
import { myCertificationResultData } from "@/data/myCertificationResultData";
import { Fragment, useState } from "react";

function ReportSelect() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const onChangeCheckbox = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isChecked = (id: string) => {
    return checkedItems.includes(id.toString());
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-[54rem] grid grid-cols-7 _sm:grid-cols-5 _md:grid-cols-6 gap-x-[2rem] gap-y-[5rem] ">
        {myCertificationResultData.map((item, index) => (
          <Fragment key={index}>
            {item.result === "success" && (
              <>
                <input
                  type="checkbox"
                  id={item.index.toString()}
                  className="hidden"
                  checked={isChecked(item.index.toString())}
                  onChange={() => onChangeCheckbox(item.index.toString())}
                />
                <label htmlFor={item.index.toString()}>
                  <div className="mx-auto cursor-pointer">
                    <CertificationResult>
                      <CertificationResult.InActiveOrdinal
                        content={item.index}
                      />
                      {isChecked(item.index.toString()) ? (
                        <CertificationResult.ReportWrapper>
                          <CertificationResult.ReportCheckIcon />
                        </CertificationResult.ReportWrapper>
                      ) : (
                        <CertificationResult.EmptyWrapper>
                          <CertificationResult.ReportNotCheckIcon />
                        </CertificationResult.EmptyWrapper>
                      )}
                    </CertificationResult>
                  </div>
                </label>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ReportSelect;
