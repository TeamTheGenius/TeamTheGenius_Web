import { Checkbox, Col, Row } from "antd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InterestBtn from "@/components/Interest/InterestButton/InterestBtn";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import ScrolloBar from "@/components/Common/ScrolloBar";

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

  const dataLength = InterestValue.interests.length;

  const style = {
    width: "100%",
    height: "40rem",
    marginTop: "6rem",
    marginBottom: "6rem",
  };

  return (
    <>
      {dataLength > 35 ? (
        // 스크롤바 라이브러리
        <ScrolloBar style={style}>
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              onChange(e);
            }}
          >
            <Row>
              {InterestValue.interests.map((valueInterest: Interest) => (
                <Col key={valueInterest.id}>
                  <Checkbox value={valueInterest.name}>
                    {checkedValues.includes(valueInterest.name) ? (
                      <InterestBtn
                        bgColor="bg-_primary-30"
                        textColor="text-white"
                        checkText={valueInterest.name}
                        icon={faCheck}
                      />
                    ) : (
                      <InterestBtn
                        bgColor="bg-_primary-10"
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
        </ScrolloBar>
      ) : (
        <Checkbox.Group
          style={{
            width: "100%",
            marginTop: "108px",
            marginBottom: "108px",
          }}
          onChange={(e) => {
            onChange(e);
          }}
        >
          <Row>
            {InterestValue.interests.map((valueInterest: Interest) => (
              <Col span={6} key={valueInterest.id}>
                <Checkbox value={valueInterest.name}>
                  {checkedValues.includes(valueInterest.name) ? (
                    <InterestBtn
                      bgColor="bg-_primary-10"
                      textColor="text-black"
                      checkText={valueInterest.name}
                      icon={faCheck}
                    />
                  ) : (
                    <InterestBtn
                      bgColor="bg-_primary-30"
                      textColor="text-white"
                      checkText={valueInterest.name}
                      icon={faPlus}
                    />
                  )}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}
    </>
  );
};

export default InterestCheck;
