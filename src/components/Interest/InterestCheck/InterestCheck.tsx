import { Checkbox, Col, Row } from "antd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InterestBtn from "@/components/Interest/InterestButton/InterestBtn";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "@/components/Interest/InterestCheck/antdCheckbox.css";
type Interest = {
  id: number;
  name: string;
};
type InterestsData = {
  interests: Interest[];
};
type InterestCheckType = {
  InterestValue: InterestsData;
  checkedValues: CheckboxValueType[];
  setCheckedValues: (check: CheckboxValueType[]) => void;
};

const InterestCheck = ({
  InterestValue,
  setCheckedValues,
  checkedValues,
}: InterestCheckType) => {
  const onChange = (check: CheckboxValueType[]) => {
    console.log("선택된 값:", check);
    setCheckedValues(check);
  };

  return (
    <>
      <Checkbox.Group
        style={{
          width: "100%",
          marginTop: "108px",
          marginBottom: "108px",
        }}
        onChange={onChange}
      >
        <Row>
          {InterestValue.interests.map((valueInterest: Interest) => (
            <Col key={valueInterest.id}>
              <Checkbox value={valueInterest.name} className="checkboxHidden">
                {checkedValues.includes(valueInterest.name) ? (
                  <InterestBtn
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

export default InterestCheck;
