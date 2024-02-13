import patchAdminEditApi from "@/apis/patchAdminEditApi";
import { adminmodalCard } from "@/utils/modalCard";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadProps,
  message,
} from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import { topicDataType } from "../TopicListComponent/TopicListComponent";

import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";
import { adminTopicDataType } from "@/pages/Admin/AdminTopic/AdminTopic";

export type fileDataType = {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  uid: string;
  webkitRelativePath?: string;
};

export type uploadDataType = {
  [index: number]: {
    uid: string;
    lastModified: number;
    name: string;
    originFileObj: fileDataType;
    percent: number;
    size: number;
    type: string;
  };
};

type topicSubmitType = {
  tags: string[];
  title: string;
  description: string;
  notice: string;
  upload: uploadDataType;
  pointPerPerson: number;
};

type topicEditModalType = {
  setTopicEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  TopicEditModalIsOpen: boolean;
  topicEditModalData?: topicDataType;
  setAdminList: Dispatch<SetStateAction<adminTopicDataType[]>>;
  pageNumber: number;
  topicDetail?: topicDataType;
  topicDetailNumber?: number;
  setTopicDetail: any;
};

const TopicEditModal = ({
  setTopicEditModalIsOpen,
  TopicEditModalIsOpen,
  topicEditModalData,
  setAdminList,
  pageNumber,
  topicDetailNumber,
  topicDetail,
  setTopicDetail,
}: topicEditModalType) => {
  const topicDetailId = topicEditModalData?.topicId;

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const TopicEditModalClose = () => {
    setTopicEditModalIsOpen(false);
  };
  const topicSubmit = (values: topicSubmitType) => {
    const tagString = values.tags.join();
    patchAdminEditApi({
      pageNumber: pageNumber,
      setAdminList: setAdminList,
      topicId: topicDetailId,
      topicTitle: values.title,
      topicDesc: values.description,
      topicNotice: values.notice,
      topicTags: tagString,
      topicFile: values.upload,
      topicPoint: values.pointPerPerson,
      setTopicEditModalIsOpen: setTopicEditModalIsOpen,
    });
  };

  useEffect(() => {
    const getAdminDetailTopic = async () => {
      await getAdminDetailTopicApi({
        topicId: topicDetailNumber,
        setTopicDetail: setTopicDetail,
      });
      setIsLoading(false);
    };
    getAdminDetailTopic();
  }, []);

  return (
    <Modal
      isOpen={TopicEditModalIsOpen}
      onRequestClose={TopicEditModalClose}
      contentLabel="sign complete message"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={adminmodalCard}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          onFinish={topicSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          className="w-full"
          initialValues={topicDetail}
        >
          <FormTitle />
          <FormDesc />
          <FormImg />
          <FormInterest />
          <FormPoint />
          <SubmitButtom TopicEditModalClose={TopicEditModalClose} />
        </Form>
      )}
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
  const props: UploadProps = {
    name: "file",
    beforeUpload: () => {
      return false;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
        <Upload {...props}>
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
      <Form.Item name="tags" label="관심사 선택">
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
        name="pointPerPerson"
      >
        <Input />
      </Form.Item>
    </>
  );
};
const SubmitButtom = ({ TopicEditModalClose }: any) => {
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
          onClick={TopicEditModalClose}
          className="w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65"
        >
          취소
        </Button>
      </div>
    </>
  );
};
export default TopicEditModal;
