import { Button, Form, Image, Input, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

import { fileType, instanceDeteilType } from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";
import {
  useInstanceDetailQuery,
  usePatchInstanceCreate,
} from "@/hooks/queries/useAdminInstanceQuery";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { decrypt } from "@/hooks/useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";

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

const InstanceEdit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const decryptedTopicId = decrypt(id);
  const [form] = Form.useForm();
  const { data: instanceDetail } = useInstanceDetailQuery({
    instanceId: decryptedTopicId,
  });

  const tags = instanceDetail?.tags;
  const tagsArray = tags ? tags.split(",") : [];
  const file = instanceDetail?.fileResponse;

  const onSuccessUsePatchInstance = () => {
    setIsLoading(false);
    alert("인스턴스가 수정되었습니다.");
    queryClient.invalidateQueries(QUERY_KEY.ADMIN_INSTANCE_DETAIL);
  };
  const onErrorUsePatchInstance = (errMessage: string) => {
    setIsLoading(false);
    alert(errMessage);
  };
  const { mutate: instancePatch } = usePatchInstanceCreate({
    onSuccess: onSuccessUsePatchInstance,
    onError: onErrorUsePatchInstance,
  });

  const instanceSumbit = (values: InstanceEditData) => {
    setIsLoading(true);
    const startedAt = moment(values.ranger[0]._d).format("YYYY-MM-DDTHH:mm:ss");
    const completedAt = moment(values.completedAt).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    const instanceData = {
      setIsLoading: setIsLoading,
      instanceId: decryptedTopicId,
      topicIdId: values.topicId,
      instanceTitle: values.title,
      instanceDesc: values.description,
      instanceCertificationMethod: values.certificationMethod,
      instanceNotice: values.notice,
      instancePoint: values.pointPerPerson,
      instanceStartAt: startedAt,
      instanceCompletedAt: completedAt,
      instanceImg: values.fileResponse[0]?.originFileObj,
    };
    if (values.fileResponse) {
      instanceData.instanceImg = values.fileResponse[0]?.originFileObj;
    }
    instancePatch(instanceData);
  };

  useEffect(() => {
    form.setFieldsValue({
      description: instanceDetail?.description,
      notice: instanceDetail?.notice,
      file: instanceDetail?.fileResponse,
      tags: tagsArray,
      pointPerPerson: instanceDetail?.pointPerPerson,
    });
  }, [form]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AdminFormLayOut title={"인스턴스 수정 페이지"} instanceTokken={true}>
          <Form
            onFinish={instanceSumbit}
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 19 }}
            initialValues={instanceDetail}
            className="w-full"
          >
            <FormDesc />
            <FormImg file={file} />
            <FormPoint />
            <FormRangePicker instanceDetail={instanceDetail} />
            <SubmitButtom />
          </Form>
        </AdminFormLayOut>
      )}
    </>
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

const SubmitButtom = () => {
  return (
    <>
      <div className="flex justify-center gap-32">
        <Button
          htmlType="submit"
          className="w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65"
        >
          생성
        </Button>
      </div>
    </>
  );
};
export default InstanceEdit;
