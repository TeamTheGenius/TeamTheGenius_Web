import { instanceEditCard } from "@/utils/modalCard";
import { Button, Form, Image, Input, Upload, UploadProps } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Modal from "react-modal";

import moment from "moment";
import getAdminDetailInstanceApi from "@/apis/getAdminDetailInstanceApi";
import patchAdminInstanceEditApi from "@/apis/patchAdminInstanceEditApi";

import {
  fileType,
  instanceDeteilType,
  instanceListDataType,
} from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";

type InstanceEditModalType = {
  setinstanceEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  instanceEditModalIsOpen: boolean;
  instanceDetail?: instanceDeteilType;
  instanceNumber: number;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
};
type InstanceEditData = {
  topicId: number;
  instanceId: number;
  title: string;
  description: string;
  pointPerPerson: number;
  certificationMethod: string;
  tags: string;
  notice: string;
  startedAt: string;
  completedAt: string;
  ranger: {
    _d: string;
  }[];
  fileResponse: {
    fileId: number;
    encodedFile: string;
    originFileObj: any;
  }[];
};

const InstanceEditModal = ({
  setinstanceEditModalIsOpen,
  instanceEditModalIsOpen,
  instanceDetail,
  instanceNumber,
  setInstanceList,
}: InstanceEditModalType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const InstanceEditModalClose = () => {
    setinstanceEditModalIsOpen(false);
  };

  const instanceSumbit = (values: InstanceEditData) => {
    setIsLoading(true);
    const startedAt = moment(values.ranger[0]._d).format("YYYY-MM-DDTHH:mm:ss");
    const completedAt = moment(values.completedAt).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    const instanceData = {
      setIsLoading: setIsLoading,
      setInstanceList: setInstanceList,
      instanceId: instanceNumber,
      topicIdId: values.topicId,
      instanceTitle: values.title,
      instanceDesc: values.description,
      instanceCertificationMethod: values.certificationMethod,
      instanceNotice: values.notice,
      instancePoint: values.pointPerPerson,
      instanceStartAt: startedAt,
      instanceCompletedAt: completedAt,
      instanceImg: values.fileResponse[0]?.originFileObj,
      setinstanceEditModalIsOpen: setinstanceEditModalIsOpen,
    };
    if (values.fileResponse) {
      instanceData.instanceImg = values.fileResponse[0]?.originFileObj;
    }
    patchAdminInstanceEditApi(instanceData);
  };
  const file = instanceDetail?.fileResponse;
  useEffect(() => {
    const getAdminDetailInstance = async () => {
      await getAdminDetailInstanceApi({
        setIsLoading: setIsLoading,
        instanceId: instanceNumber,
        setInstanceList: setInstanceList,
      });
    };
    setIsLoading(true);
    getAdminDetailInstance();
  }, []);
  return (
    <Modal
      isOpen={instanceEditModalIsOpen}
      onRequestClose={InstanceEditModalClose}
      contentLabel="sign complete message"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={instanceEditCard}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          onFinish={instanceSumbit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          initialValues={instanceDetail}
          className="w-full"
        >
          <FormDesc />
          <FormImg file={file} />
          <FormPoint />
          <FormRangePicker instanceDetail={instanceDetail} />
          <SubmitButtom InstanceModalClose={InstanceEditModalClose} />
        </Form>
      )}
    </Modal>
  );
};
const FormDesc = () => {
  return (
    <>
      <Form.Item label="간단한 소개" name="description">
        <Input.TextArea allowClear showCount />
      </Form.Item>
      <Form.Item label="유의사항" name="notice">
        <Input.TextArea allowClear showCount />
      </Form.Item>
      <Form.Item label="인증 방법" name="certificationMethod">
        <Input.TextArea allowClear showCount />
      </Form.Item>
    </>
  );
};
const FormImg = ({ file }: fileType) => {
  const [visible, setVisible] = useState(false);

  const imageData = `data:image/png;base64,${file?.encodedFile}`;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        label="인스턴스 이미지 수정"
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
const FormPoint = () => {
  return (
    <>
      <Form.Item label="포인트" name="pointPerPerson">
        <Input />
      </Form.Item>
    </>
  );
};
const FormRangePicker = ({
  instanceDetail,
}: {
  instanceDetail: instanceDeteilType | undefined;
}) => {
  const startedAt = moment(instanceDetail?.startedAt).format("YYYY-MM-DD");
  const completedAt = moment(instanceDetail?.completedAt).format("YYYY-MM-DD");

  const initialValues = {
    ranger: [moment(startedAt), moment(completedAt)],
  };

  return (
    <>
      <Form.Item
        name="ranger"
        label="챌린지 기간"
        initialValue={initialValues.ranger}
      >
        <div className="flex justify-around">
          <span>{startedAt}</span>
          <span>{completedAt}</span>
        </div>
      </Form.Item>
    </>
  );
};

const SubmitButtom = ({
  InstanceModalClose,
}: {
  InstanceModalClose: () => void;
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
