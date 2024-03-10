import { Checkbox, Col, Row } from "antd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InterestBtn from "@/components/Interest/InterestButton/InterestBtn";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "@/components/Interest/InterestCheck/antdCheckbox.css";
import Interest from "@/pages/Interest/Interest";
import { useQuery } from "react-query";
import { tagsType } from "@/types/interestTagsType";
import getInterestTags from "@/apis/getInterestTags";
import { useState } from "react";

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
  const { data } = useQuery<string[]>({
    queryKey: ["interestTags"],
    queryFn: () => getInterestTags(),
    onSuccess: (data) => {
      setCheckedValues(data);
    },
  });

  const onChange = (check: CheckboxValueType[]) => {
    console.log("선택된 값:", check);
    setCheckedValues(check);
  };

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
