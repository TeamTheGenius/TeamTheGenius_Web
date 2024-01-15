import { adminmodalCard } from "@/utils/modalCard";
import { Button, DatePicker, Form, Input } from "antd";
import { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";

type InstanceEditModalType = {
  setinstanceEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  instanceEditModalIsOpen: boolean;
  instanceEditModalData: any;
};

const InstanceEditModal = ({
  setinstanceEditModalIsOpen,
  instanceEditModalIsOpen,
  instanceEditModalData,
}: InstanceEditModalType) => {
  const InstanceEditModalClose = () => {
    setinstanceEditModalIsOpen(false);
  };

  const instanceSumbit = (fieldsValue: any) => {
    const rangeValue = fieldsValue["range-picker"];
    const values = {
      ...fieldsValue,
      "range-picker": [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    console.log("토픽 값", values);
  };
  console.log("instanceEditModalData", instanceEditModalData);

  return (
    <Modal
      isOpen={instanceEditModalIsOpen}
      onRequestClose={InstanceEditModalClose}
      contentLabel="sign complete message"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={adminmodalCard}
    >
      <Form
        onFinish={instanceSumbit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        className="w-full"
      >
        <FormDesc />
        <FormPoint />
        <FormRangePicker />
        <SubmitButtom InstanceModalClose={InstanceEditModalClose} />
      </Form>
    </Modal>
  );
};
const FormDesc = () => {
  return (
    <>
      <Form.Item
        label="간단한 소개"
        name="simpleInfo"
        initialValue={"infoprops"}
      >
        <Input.TextArea allowClear showCount defaultValue={"infoprops"} />
      </Form.Item>
      <Form.Item label="유의사항" name="notice" initialValue={"noticeprops"}>
        <Input.TextArea allowClear showCount defaultValue={"noticeprops"} />
      </Form.Item>
    </>
  );
};

const FormPoint = () => {
  return (
    <>
      <Form.Item label="포인트" name="point" initialValue={"pointprops"}>
        <Input defaultValue={"pointprops"} />
      </Form.Item>
    </>
  );
};
const FormRangePicker = () => {
  const { RangePicker } = DatePicker;

  return (
    <>
      <Form.Item name="range-picker" label="챌린지 기간">
        <RangePicker format="YYYY-MM-DD" />
      </Form.Item>
    </>
  );
};
const SubmitButtom = ({ InstanceModalClose }: any) => {
  return (
    <>
      <div className="flex justify-center gap-32">
        <Button
          htmlType="submit"
          className="w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65"
        >
          생성
        </Button>
        <Button
          onClick={InstanceModalClose}
          className="w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65"
        >
          취소
        </Button>
      </div>
    </>
  );
};
export default InstanceEditModal;
