import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "@/utils/antdCheck.module.css";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Common/Loading/Loading";
import { useParams } from "react-router-dom";
import { decrypt } from "@/hooks/useCrypto";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import {
  usePostInstanceCreate,
  usePostInstanceFileCreate,
} from "@/hooks/queries/useAdminInstanceQuery";
import { useTopicDetailQuery } from "@/hooks/queries/useAdminTopicQuery";

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
  const { id } = useParams();
  const [form] = Form.useForm();
  const decryptTopicId = decrypt(id);
  const valuesRef = useRef<instanceCreateData | null>(null);

  const { data: adminDetail } = useTopicDetailQuery({
    topicId: decryptTopicId,
  });

  const title = adminDetail?.title;
  const description = adminDetail?.description;
  const notice = adminDetail?.notice;
  const tags = adminDetail?.tags;
  const tagsArray = tags ? tags.split(",") : [];
  const point = adminDetail?.pointPerPerson;

  const onSuccessUsePostInstance = (res: any) => {
    if (valuesRef.current) {
      const instanceFile = {
        instanceImg: valuesRef.current.fileResponse[0]?.originFileObj,
        instanceId: res,
      };
      instanceFileCreate(instanceFile);
      alert("인스턴스가 생성되었습니다.");

      form.setFieldsValue({
        title: adminDetail?.title,
        description: adminDetail?.description,
        notice: adminDetail?.notice,
        tags: tagsArray,
        point: adminDetail?.pointPerPerson,
        certMethod: "",
        ranger: "",
      });
    }
  };

  const { mutate: instanceCreate, isLoading: instanceCreateLoading } =
    usePostInstanceCreate({
      onSuccess: onSuccessUsePostInstance,
    });
  const { mutate: instanceFileCreate, isLoading: instanceFileCreateLoading } =
    usePostInstanceFileCreate();

  const isLoading = instanceCreateLoading || instanceFileCreateLoading;

  const instanceSumbit = (values: instanceCreateData) => {
    valuesRef.current = values;
    if (!valuesRef.current?.fileResponse[0]?.originFileObj) {
      alert("이미지를 설정해주세요");
      return;
    }

    const tagString = values.tags.join();
    const formmatStartDate = moment(values.ranger[0].$d).format(
      "YYYY-MM-DDT00:00:00"
    );

    const formmatEndDate = moment(values.ranger[1].$d).format(
      "YYYY-MM-DDT23:59:59"
    );
    const instanceData = {
      topicId: decryptTopicId,
      instanceTitle: values.title,
      instanceDesc: values.description,
      instanceNotice: values.notice,
      instanceCertMethod: values.certMethod,
      instanceTags: tagString,
      instancePoint: values.pointPerPerson,
      instanceRangeStart: formmatStartDate,
      instanceRangeEnd: formmatEndDate,
    };

    instanceCreate(instanceData);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: adminDetail?.title,
      description: adminDetail?.description,
      notice: adminDetail?.notice,
      tags: tagsArray,
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
            className="w-full max-w-[1200px]"
          >
            <FormTitle title={title} />
            <FormDesc description={description} notice={notice} />
            <FormImg />
            <FormInterest tags={tagsArray} />
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
const FormImg = () => {
  const [visible, setVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.fileList && e.fileList.length > 0) {
      const file = e.fileList[e.fileList.length - 1];
      if (file && file.originFileObj) {
        const imageUrl = URL.createObjectURL(file.originFileObj);
        setImageSrc(imageUrl);
      }
    }
    return e?.fileList;
  };

  const props: UploadProps = {
    beforeUpload: () => {
      return false;
    },
  };

  return (
    <>
      <Form.Item
        name="fileResponse"
        label="챌린지 이미지"
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
          src={imageSrc}
          preview={{
            visible,
            src: imageSrc,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      </Form.Item>
    </>
  );
};

const FormInterest = ({ tags }: { tags: string[] | undefined }) => {
  return (
    <>
      <Form.Item name="tags" label="관심사 선택" initialValue={tags}>
        <Select mode="multiple" disabled>
          {tags?.map((option: string, i: number) => (
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
    return current && current < moment().startOf("day").add(1, "day");
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
