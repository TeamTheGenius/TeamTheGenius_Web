import postAdminTopicApi from "@/apis/postAdminTopicApi";
import Loading from "@/components/Common/Loading/Loading";
import { adminTopicDataType } from "@/types/adminType";
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
import { useEffect, useState } from "react";
import Modal from "react-modal";

type TopicModalType = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ModalIsOpen: boolean;
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
};
type FormDataType = {
  description: string;
  notice: string;
  pointPerPerson: string;
  tags: string[];
  title: string;
  upload: {
    lastModified: number;
    lastModifiedDate?: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    type: string;
    uid: string;
  }[];
};

const TopicCreateModal = ({
  ModalIsOpen,
  setModalIsOpen,
  setAdminList,
}: TopicModalType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const TopicModalClose = () => {
    setModalIsOpen(false);
  };

  const topicSubmit = (values: FormDataType) => {
    const tagString = values.tags.join();
    postAdminTopicApi({
      setAdminList: setAdminList,
      setModalIsOpen: setModalIsOpen,
      topicTitle: values.title,
      topicDesc: values.description,
      topicNotice: values.notice,
      topicTags: tagString,
      topicFile: values.upload,
      topicPoint: values.pointPerPerson,
    });
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <div>
      <Modal
        isOpen={ModalIsOpen}
        onRequestClose={TopicModalClose}
        contentLabel="sign complete message"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={adminmodalCard}
      >
        {isLoading ? (
          <Loading />
        ) : (
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
            <SubmitButtom TopicModalClose={TopicModalClose} />
          </Form>
        )}
      </Modal>
    </div>
  );
};

const FormTitle = () => {
  return (
    <>
      <Form.Item
        label="토픽 제목"
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
  const [notice, setTopicNotice] = useState("");

  const simpleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSimpleInfo(e.target.value);
  };

  const noticeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopicNotice(e.target.value);
  };

  return (
    <>
      <Form.Item
        label="간단한 소개"
        validateStatus={simpleInfo ? "success" : "error"}
        hasFeedback
        help={simpleInfo ? null : "간단한 소개를 입력해주세요"}
        name="description"
      >
        <Input.TextArea allowClear showCount onChange={simpleInfoChange} />
      </Form.Item>
      <Form.Item
        label="유의사항"
        validateStatus={notice ? "success" : "error"}
        hasFeedback
        help={notice ? null : "유의사항을 입력해주세요"}
        name="notice"
      >
        <Input.TextArea allowClear showCount onChange={noticeChange} />
      </Form.Item>
    </>
  );
};
const FormImg = () => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props: UploadProps = {
    name: "file",
    beforeUpload: () => {
      return false;
    },
    onChange(info) {
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

export default TopicCreateModal;
