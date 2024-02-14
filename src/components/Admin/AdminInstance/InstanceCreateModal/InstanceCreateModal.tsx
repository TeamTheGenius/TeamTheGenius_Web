import { instancePostCard } from "@/utils/modalCard";

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Upload,
  UploadProps,
} from "antd";

import React, { useState } from "react";

import "@/components/Admin/AdminInstance/InstanceCreateModal/antdCheck.module.css";
import Modal from "react-modal";
import postAdminInstanceApi from "@/apis/postAdminInstanceApi";
import { topicDeteilType } from "../../AdminTopic/TopicListComponent/TopicListComponent";
import moment from "moment";

type TopicModalType = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ModalIsOpen: boolean;
  topicDetail?: topicDeteilType;
  topicId: number;
};
const InstanceCreateModal = ({
  setModalIsOpen,
  ModalIsOpen,
  topicDetail,
  topicId,
}: TopicModalType) => {
  const InstanceModalClose = () => {
    setModalIsOpen(false);
  };

  const instanceSumbit = (values: any) => {
    // console.log("valuse instance", values);
    const formmatStartDate = moment(values.range[0].$d).format(
      "YYYY-MM-DDTHH:mm:ss"
    );

    const formmatEndDate = moment(values.range[1].$d).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    postAdminInstanceApi({
      instanceTitle: values.title,
      instanceDesc: values.description,
      instanceNotice: values.notice,
      instanceTags: values.tags,
      instanceFile: values.fileResponse,
      instancePoint: values.pointPerPerson,
      instanceRangeStart: formmatStartDate,
      instanceRangeEnd: formmatEndDate,
      topicId: topicId,
    });
  };

  const tags = topicDetail?.tags;
  const file = topicDetail?.fileResponse;
  return (
    <div>
      <Modal
        isOpen={ModalIsOpen}
        onRequestClose={InstanceModalClose}
        contentLabel="sign complete message"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={instancePostCard}
      >
        <Form
          onFinish={instanceSumbit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          className="w-full"
          initialValues={topicDetail}
        >
          <FormTitle />
          <FormDesc />
          <FormImg file={file} />
          <FormInterest tags={tags} />
          <FormPoint />
          <FormRangePicker />
          <SubmitButtom InstanceModalClose={InstanceModalClose} />
        </Form>
      </Modal>
    </div>
  );
};

const FormTitle = () => {
  return (
    <>
      <Form.Item label="제목" name="title">
        <Input disabled />
      </Form.Item>
    </>
  );
};
const FormDesc = () => {
  return (
    <>
      <Form.Item label="간단한 소개" name="description">
        <Input.TextArea allowClear disabled showCount />
      </Form.Item>
      <Form.Item label="유의사항" name="notice">
        <Input.TextArea allowClear disabled showCount />
      </Form.Item>
    </>
  );
};
const FormImg = ({ file }: any) => {
  const imageData = `data:image/png;base64,${file?.encodedFile}`;
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props: UploadProps = {
    name: "fileResponse",
    // beforeUpload: () => {
    //   return false;
    // },
  };

  return (
    <>
      <Form.Item
        name="fileResponse"
        label="Upload"
        valuePropName="fileResponse"
        getValueFromEvent={normFile}
        extra="이미지 미리보기"
      >
        <Upload {...props} disabled>
          <div className="w-[5rem] h-[5rem]">
            <Image src={imageData} alt="Uploaded" />
          </div>
        </Upload>
      </Form.Item>
    </>
  );
};

const FormInterest = ({ tags }: { tags?: string }) => {
  const tagArr = tags?.split(",");

  return (
    <>
      <Form.Item name="tags" label="관심사 선택">
        <Select mode="multiple" disabled>
          {tagArr?.map((option: string, i: number) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

const FormPoint = () => {
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
      <Form.Item label="포인트" name="pointPerPerson">
        <Input disabled={!componentDisabled} />
      </Form.Item>
    </>
  );
};
const FormRangePicker = () => {
  const { RangePicker } = DatePicker;

  return (
    <>
      <Form.Item name="range" label="RangePicker">
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
