import { adminmodalCard } from "@/utils/modalCard";
import { Button, DatePicker, Form, Input } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import { instanceDeteilType } from "../InstanceListComponent/InstanceListComponent";
import moment from "moment";
import getAdminDetailInstanceApi from "@/apis/getAdminDetailInstanceApi";
import patchAdminInstanceEditApi from "@/apis/patchAdminInstanceEditApi";

type InstanceEditModalType = {
  setinstanceEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  instanceEditModalIsOpen: boolean;
  instanceDetail?: instanceDeteilType;
  instanceNumber: number;
};

const InstanceEditModal = ({
  setinstanceEditModalIsOpen,
  instanceEditModalIsOpen,
  instanceDetail,
  instanceNumber,
}: InstanceEditModalType) => {
  const InstanceEditModalClose = () => {
    setinstanceEditModalIsOpen(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const instanceSumbit = (values: any) => {
    console.log("values", instanceDetail);
    const startedAt = moment(values.ranger[0]._d).format("YYYY-MM-DDTHH:mm:ss");
    console.log("st", startedAt);
    const completedAt = moment(values.completedAt).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    patchAdminInstanceEditApi({
      instanceId: instanceNumber,
      topicIdId: values.topicId,
      instanceTitle: values.title,
      instanceDesc: values.description,
      instanceNotice: values.notice,
      instancePoint: values.pointPerPerson,
      instanceStartAt: startedAt,
      instanceCompletedAt: completedAt,
    });
  };

  useEffect(() => {
    const getAdminDetailInstance = async () => {
      await getAdminDetailInstanceApi({
        instanceId: instanceNumber,
      });
      setIsLoading(false);
    };
    getAdminDetailInstance();
  }, []);
  return (
    <Modal
      isOpen={instanceEditModalIsOpen}
      onRequestClose={InstanceEditModalClose}
      contentLabel="sign complete message"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={adminmodalCard}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          onFinish={instanceSumbit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          initialValues={instanceDetail}
          className="w-full"
        >
          <FormDesc />
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
const FormRangePicker = ({ instanceDetail }: any) => {
  const { RangePicker } = DatePicker;

  const startedAt = moment(instanceDetail.startedAt).format("YYYY-MM-DD");
  const completedAt = moment(instanceDetail.completedAt).format("YYYY-MM-DD");

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
        <RangePicker format="YYYY-MM-DD" className="flex" />
        <span>입력하지 않으면 기본 정보가 들어갑니다.</span>
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
