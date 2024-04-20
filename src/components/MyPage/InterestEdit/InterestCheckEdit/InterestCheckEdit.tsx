import { Checkbox, Col, Row } from "antd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InterestBtn from "@/components/Interest/InterestButton/InterestBtn";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "@/components/Interest/InterestCheck/antdCheckbox.css";
import Interest from "@/pages/Interest/Interest";

import { useGetMyProfileInterestTag } from "@/hooks/queries/useProfileQuery";
import { useEffect } from "react";

type InterestCheckType = {
  InterestValue: Interest[];
  checkedValues: CheckboxValueType[];
  setCheckedValues: (check: CheckboxValueType[]) => void;
};

const InterestCheckEdit = ({
  InterestValue,
  checkedValues,
  setCheckedValues,
}: InterestCheckType) => {
  const { data } = useGetMyProfileInterestTag();

  const onChange = (check: CheckboxValueType[]) => {
    setCheckedValues(check);
  };

  useEffect(() => {
    if (data) setCheckedValues(data);
  }, [data]);

  return (
    <>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        value={checkedValues}
        onChange={onChange}
      >
        <Row>
          {InterestValue.map((valueInterest: Interest) => (
            <Col key={valueInterest.id}>
              <Checkbox value={valueInterest.name} className="checkboxHidden">
                {checkedValues.includes(valueInterest.name) ? (
                  <InterestBtn
                    key={valueInterest.id}
                    bgColor="bg-[#282828]"
                    textColor="text-white"
                    checkText={valueInterest.name}
                    icon={faCheck}
                  />
                ) : (
                  <InterestBtn
                    bgColor="bg-[#dddddd]"
                    textColor="text-black"
                    checkText={valueInterest.name}
                    icon={faPlus}
                  />
                )}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </>
  );
};

export default InterestCheckEdit;
