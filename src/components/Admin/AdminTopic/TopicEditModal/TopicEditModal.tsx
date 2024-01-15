import { adminmodalCard } from "@/utils/modalCard";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import Modal from "react-modal";

type TopicEditModalType = {
  setTopicEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  TopicEditModalIsOpen: boolean;
  topicEditModalData: any;
};

const TopicEditModal = ({
  setTopicEditModalIsOpen,
  TopicEditModalIsOpen,
  topicEditModalData,
}: TopicEditModalType) => {
  const TopicEditModalClose = () => {
    setTopicEditModalIsOpen(false);
  };
  const topicSubmit = (values: any) => {
    console.log("토픽 값", values);
  };
  console.log("topicEditModalData", topicEditModalData);
  return (
    <Modal
      isOpen={TopicEditModalIsOpen}
      onRequestClose={TopicEditModalClose}
      contentLabel="sign complete message"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={adminmodalCard}
    >
      <Form
        onFinish={topicSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        className="w-full"
      >
        <FormTitle />
        <FormDesc />
        <FormImg />
        <FormInterest />
        <FormPoint />
        <SubmitButtom TopicEditModalClose={TopicEditModalClose} />
      </Form>
    </Modal>
  );
};

const FormTitle = () => {
  return (
    <>
      <Form.Item
        label="제목"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error("제목을 입력해주세요"));
              }
            },
          },
        ]}
        name="title"
      >
        <Input />
      </Form.Item>
    </>
  );
};
const FormDesc = () => {
  const [simpleInfo, setSimpleInfo] = useState("");
  const [notice, setNotice] = useState("");

  const simpleInfoChange = (e: any) => {
    setSimpleInfo(e.target.value);
  };
  const noticeChange = (e: any) => {
    setNotice(e.target.value);
  };

  return (
    <>
      <Form.Item
        label="간단한 소개"
        validateStatus={simpleInfo ? "success" : "error"} // 입력값이 있는 경우 'success', 없는 경우 'error'
        hasFeedback
        help={simpleInfo ? null : "간단한 소개를 입력해주세요"} // 입력값이 없는 경우 도움말 메시지 표시
        name="simpleInfo"
      >
        <Input.TextArea allowClear showCount onChange={simpleInfoChange} />
      </Form.Item>
      <Form.Item
        label="유의사항"
        validateStatus={notice ? "success" : "error"} // 입력값이 있는 경우 'success', 없는 경우 'error'
        hasFeedback
        help={notice ? null : "유의사항을 입력해주세요"} // 입력값이 없는 경우 도움말 메시지 표시
        name="notice"
      >
        <Input.TextArea allowClear showCount onChange={noticeChange} />
      </Form.Item>
    </>
  );
};
const FormImg = () => {
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="이미지 업로드"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>챌린지 사진을 선택해주세요</Button>
        </Upload>
      </Form.Item>
    </>
  );
};
const FormInterest = () => {
  const options = [
    { value: "javascript", label: "javascript" },
    { value: "java", label: "java" },
    { value: "react", label: "react" },
  ];
  return (
    <>
      <Form.Item
        name="관심사 선택"
        label="관심사 선택"
        rules={[
          {
            required: true,
            message: "관심사 선택",
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="챌린지에 해당되는 관심사를 선택하세요"
        >
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
const FormPoint = () => {
  return (
    <>
      <Form.Item
        label="포인트"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error("인당 포인트를 입력해주세요"));
              }
            },
          },
        ]}
        name="title"
      >
        <Input />
      </Form.Item>
    </>
  );
};
const SubmitButtom = ({ TopicModalClose }: any) => {
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
          onClick={TopicModalClose}
          className="w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65"
        >
          취소
        </Button>
      </div>
    </>
  );
};
export default TopicEditModal;
