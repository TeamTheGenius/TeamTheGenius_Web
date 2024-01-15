import { adminmodalCard } from "@/utils/modalCard";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { OptionType } from "@/pages/Admin/AdminInstance/AdminInstance";

import "@/components/Admin/AdminInstance/InstanceCreateModal/antdCheck.css";
import Modal from "react-modal";
type TopicModalType = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ModalIsOpen: boolean;
  title: string;
  interest: OptionType[];
  simpleInfoProps: string;
  noticeProps: string;
  point: number;
};
const InstanceCreateModal = ({
  setModalIsOpen,
  ModalIsOpen,
  title,
  interest,
  simpleInfoProps,
  noticeProps,
  point,
}: TopicModalType) => {
  const InstanceModalClose = () => {
    setModalIsOpen(false);
  };

  const instanceSumbit = (fieldsValue: any) => {
    // Should format date value before submit.
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

  return (
    <div>
      <Modal
        isOpen={ModalIsOpen}
        onRequestClose={InstanceModalClose}
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
          <FormTitle title={title} />
          <FormDesc
            simpleInfoProps={simpleInfoProps}
            noticeProps={noticeProps}
          />
          <FormInterest interest={interest} />
          <FormPoint point={point} />
          <FormRangePicker />
          <SubmitButtom InstanceModalClose={InstanceModalClose} />
        </Form>
      </Modal>
    </div>
  );
};

const FormTitle = ({ title }: { title: string }) => {
  return (
    <>
      <Form.Item label={"토픽 제목"} name="title" initialValue={title}>
        <Input defaultValue={title} disabled />
      </Form.Item>
    </>
  );
};
const FormDesc = ({
  simpleInfoProps,
  noticeProps,
}: {
  simpleInfoProps: string;
  noticeProps: string;
}) => {
  return (
    <>
      <Form.Item
        label="간단한 소개"
        name="simpleInfo"
        initialValue={simpleInfoProps}
      >
        <Input.TextArea
          allowClear
          disabled
          showCount
          defaultValue={simpleInfoProps}
        />
      </Form.Item>
      <Form.Item label="유의사항" name="notice" initialValue={noticeProps}>
        <Input.TextArea
          allowClear
          disabled
          showCount
          defaultValue={noticeProps}
        />
      </Form.Item>
    </>
  );
};

const FormInterest = ({ interest }: { interest: OptionType[] }) => {
  return (
    <>
      <Form.Item
        name="interest"
        label="관심사 선택"
        initialValue={interest}
        rules={[
          {
            message: "관심사 선택",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" disabled>
          {interest.map((interest: OptionType) => (
            <Select.Option key={interest.number} value={interest.label}>
              {interest.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
const FormPoint = ({ point }: { point: number }) => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
        className="ml-48"
      >
        포인트 수정
      </Checkbox>
      <Form.Item label="포인트" name="point" initialValue={point}>
        <Input disabled={!componentDisabled} defaultValue={point} />
      </Form.Item>
    </>
  );
};
const FormRangePicker = () => {
  const { RangePicker } = DatePicker;

  return (
    <>
      <Form.Item name="range-picker" label="RangePicker">
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
export default InstanceCreateModal;
