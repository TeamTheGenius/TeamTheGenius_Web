import { Button, DatePicker, Form, Image, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "@/utils/antdCheck.module.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { fileType } from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";
import { usePostInstanceCreate } from "@/hooks/queries/useAdminInstanceQuery";
import { useParams } from "react-router-dom";
import { decrypt } from "@/hooks/useCrypto";
import { useTopicDetailQuery } from "@/hooks/queries/useAdminTopicQuery";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";

type instanceCreateData = {
  topicId: number;
  instanceId: number;
  title: string;
  description: string;
  certMethod: string;
  pointPerPerson: number;
  tags: string[];
  notice: string;
  startedAt: string;
  completedAt: string;
  ranger: {
    $d: string;
  }[];
  fileResponse: {
    fileId: number;
    encodedFile: string;
    originFileObj: any;
  }[];
};

const InstanceCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const { id } = useParams();
  const [form] = Form.useForm();
  const decryptTopicId = decrypt(id);

  const { data: adminDetail } = useTopicDetailQuery({
    topicId: decryptTopicId,
  });

  const title = adminDetail?.title;
  const description = adminDetail?.description;
  const notice = adminDetail?.notice;
  const tags = adminDetail?.tags;
  const tagsArray = tags ? tags.split(",") : [];
  const file = adminDetail?.fileResponse;
  const point = adminDetail?.pointPerPerson;

  const onSuccessUsePostTokenRegister = () => {
    setIsLoading(false);
    alert("인스턴스가 생성되었습니다");
  };

  const onErrorUsePostTokenRegister = (errMessage: string) => {
    setIsLoading(false);
    setErrMessage(errMessage);
  };

  const { mutate: instanceCreate } = usePostInstanceCreate({
    onSuccess: onSuccessUsePostTokenRegister,
    onError: onErrorUsePostTokenRegister,
  });

  const instanceSumbit = (values: instanceCreateData) => {
    setIsLoading(true);
    const tagString = values.tags.join();
    const formmatStartDate = moment(values.ranger[0].$d).format(
      "YYYY-MM-DDT00:00:00"
    );

    const formmatEndDate = moment(values.ranger[1].$d).format(
      "YYYY-MM-DDT23:59:59"
    );
    const instanceData = {
      setIsLoading: setIsLoading,
      topicId: decryptTopicId,
      instanceTitle: values.title,
      instanceDesc: values.description,
      instanceNotice: values.notice,
      instanceCertMethod: values.certMethod,
      instanceTags: tagString,
      instanceImg: values.fileResponse[0]?.originFileObj,
      instancePoint: values.pointPerPerson,
      instanceRangeStart: formmatStartDate,
      instanceRangeEnd: formmatEndDate,
    };
    if (values.fileResponse) {
      instanceData.instanceImg = values.fileResponse[0]?.originFileObj;
    }
    instanceCreate(instanceData);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: adminDetail?.title,
      description: adminDetail?.description,
      notice: adminDetail?.notice,
      tags: tagsArray,
      file: adminDetail?.fileResponse,
      point: adminDetail?.pointPerPerson,
    });
  }, [adminDetail, form]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <AdminFormLayOut title={"인스턴스 생성 페이지"} instanceTokken={true}>
          <Form
            form={form}
            onFinish={instanceSumbit}
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 19 }}
            className="w-full max-w-[1200px]"
          >
            <FormTitle title={title} />
            <FormDesc description={description} notice={notice} />
            <FormImg file={file} />
            <FormInterest tags={tags} />
            <FormPoint point={point} />
            <FormRangePicker />
            <SubmitButtom />
          </Form>
        </AdminFormLayOut>
      )}
    </div>
  );
};

const FormTitle = ({ title }: { title: string | undefined }) => {
  return (
    <>
      <Form.Item label="제목" name="title" initialValue={title}>
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
  const [certMethod, setCertMethod] = useState("");
  const certMethodHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCertMethod(e.target.value);
  };
  return (
    <>
      <Form.Item
        label="간단한 소개"
        name="description"
        initialValue={description}
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>
      <Form.Item label="유의사항" name="notice" initialValue={notice}>
        <Input.TextArea allowClear showCount />
      </Form.Item>
      <Form.Item
        label="인증방법"
        validateStatus={certMethod ? "success" : "error"}
        hasFeedback
        help={certMethod ? null : "인증방법을 입력해주세요"}
        name="certMethod"
      >
        <Input.TextArea allowClear showCount onChange={certMethodHandle} />
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
    return e && e.fileList;
  };
  const props = {
    name: "fileResponse",
    beforeUpload: () => false,
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
  const tagArr = tags?.split(",");
  return (
    <>
      <Form.Item name="tags" label="관심사 선택" initialValue={tags}>
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
const FormPoint = ({ point }: { point: number | undefined }) => {
  return (
    <>
      <Form.Item label="포인트" name="pointPerPerson" initialValue={point}>
        <Input />
      </Form.Item>
    </>
  );
};
const FormRangePicker = () => {
  const { RangePicker } = DatePicker;
  const disabledDate = (current: any) => {
    return current && current < moment().startOf("day");
  };
  return (
    <>
      <Form.Item name="ranger" label="챌린지 기간">
        <RangePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
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
export default InstanceCreate;
