import patchAdminEditApi from "@/apis/patchAdminTopicEditApi";
import { adminmodalCard } from "@/utils/modalCard";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Select, Upload, UploadProps } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";

import {
  adminTopicDataType,
  fileType,
  topicDeteilType,
  topicListType,
  uploadDataType,
} from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";

type topicSubmitType = {
  tags: any;
  title: string;
  description: string;
  notice: string;
  fileResponse: uploadDataType;
  pointPerPerson: number;
};

type topicEditModalType = {
  setTopicEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  TopicEditModalIsOpen: boolean;
  topicEditModalData?: topicListType;
  setAdminList: Dispatch<SetStateAction<adminTopicDataType[]>>;
  pageNumber: number;
  topicDetail?: topicDeteilType;
  topicDetailNumber?: number;
  setTopicDetail: React.Dispatch<
    React.SetStateAction<topicDeteilType | undefined>
  >;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const TopicEditModalClose = () => {
    setTopicEditModalIsOpen(false);
  };
  const topicSubmit = (values: topicSubmitType) => {
    const tagString = values.tags.join();
    console.log("values", values);
    let topicData = {
      pageNumber: pageNumber,
      setAdminList: setAdminList,
      topicId: topicDetailId,
      topicTitle: values.title,
      topicDesc: values.description,
      topicNotice: values.notice,
      topicTags: tagString,
      topicPoint: values.pointPerPerson,
      setTopicEditModalIsOpen: setTopicEditModalIsOpen,
      topicFile: values.fileResponse[0]?.originFileObj,
    };
    if (values.fileResponse) {
      topicData.topicFile = values.fileResponse[0]?.originFileObj;
    }
    patchAdminEditApi(topicData);
  };

  const topicDetailId = topicEditModalData?.topicId;
  const title = topicDetail?.title;
  const description = topicDetail?.description;
  const notice = topicDetail?.notice;
  const file = topicDetail?.fileResponse;
  const tags = topicDetail?.tags;
  const point = topicDetail?.pointPerPerson;
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
        <div>
          <Loading />
        </div>
      ) : (
        <Form
          onFinish={topicSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          className="w-full"
        >
          <FormTitle title={title} />
          <FormDesc description={description} notice={notice} />
          <FormImg file={file} />
          <FormInterest tags={tags} />
          <FormPoint point={point} />
          <SubmitButtom TopicEditModalClose={TopicEditModalClose} />
        </Form>
      )}
    </Modal>
  );
};

const FormTitle = ({ title }: { title: string | undefined }) => {
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
        initialValue={title}
        name="title"
      >
        <Input />
      </Form.Item>
    </>
  );
};
const FormDesc = ({
  description,
  notice,
}: {
  description: string | undefined;
  notice: string | undefined;
}) => {
  return (
    <>
      <Form.Item
        label="간단한 소개"
        initialValue={description}
        name="description"
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>
      <Form.Item label="유의사항" initialValue={notice} name="notice">
        <Input.TextArea allowClear showCount />
      </Form.Item>
    </>
  );
};
const FormImg = ({ file }: fileType) => {
  const [visible, setVisible] = useState(false);

  const imageData = `data:image/png;base64,${file?.encodedFile}`;

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.fileList) {
      return e.fileList;
    }
    return null;
  };
  const props: UploadProps = {
    name: "fileResponse",
    beforeUpload: () => {
      return false;
    },
  };
  return (
    <>
      <Form.Item
        name="fileResponse"
        label="토픽 이미지 수정"
        valuePropName="fileResponse"
        getValueFromEvent={normFile}
        initialValue={""}
      >
        <Upload {...props}>
          <div className="w-[5rem] h-[5rem]">
            <Button icon={<UploadOutlined />}>사진을 선택해주세요</Button>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item label="이미지 미리보기">
        <Button type="dashed" onClick={() => setVisible(true)}>
          이미지 미리보기
        </Button>
        <Image
          width={200}
          style={{ display: "none" }}
          src={imageData}
          preview={{
            visible,
            src: imageData,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      </Form.Item>
    </>
  );
};
const FormInterest = ({ tags }: { tags: string | undefined }) => {
  console.log("tags", tags);
  const tagsArray = tags ? tags.split(",") : [];
  const options = [
    { value: "javascript", label: "javascript" },
    { value: "java", label: "java" },
    { value: "react", label: "react" },
  ];

  return (
    <>
      <Form.Item name="tags" label="관심사 선택" initialValue={tagsArray}>
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
const FormPoint = ({ point }: { point: number | undefined }) => {
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
        initialValue={point}
        name="pointPerPerson"
      >
        <Input />
      </Form.Item>
    </>
  );
};
const SubmitButtom = ({
  TopicEditModalClose,
}: {
  TopicEditModalClose: () => void;
}) => {
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
