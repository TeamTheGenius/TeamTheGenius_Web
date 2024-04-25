import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { interestsOption } from "@/data/InterestData";
import {
  usePostTopicCreate,
  usePostTopicFileCreate,
} from "@/hooks/queries/useAdminTopicQuery";
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
import { useRef, useState } from "react";

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

const TopicCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const valuesRef = useRef<FormDataType | null>(null);

  const onSuccessPostTopic = (res: number) => {
    if (valuesRef.current) {
      const topicFile = { topicFile: valuesRef.current.upload, topicId: res };
      topicFileCreate(topicFile);
    }
  };

  const onErrorPostTopic = (errMessage: string) => {
    setIsLoading(false);
    alert(errMessage);
  };

  const onSuccessPostFileTopic = () => {
    setIsLoading(false);
    alert("토픽이 생성되었습니다");
  };

  const onErrorPostFileTopic = (errMessage: string) => {
    setIsLoading(false);
    alert(errMessage);
  };

  const { mutate: topicCreate } = usePostTopicCreate({
    onSuccess: onSuccessPostTopic,
    onError: onErrorPostTopic,
  });

  const { mutate: topicFileCreate } = usePostTopicFileCreate({
    onSuccess: onSuccessPostFileTopic,
    onError: onErrorPostFileTopic,
  });

  const topicSubmit = async (values: FormDataType) => {
    setIsLoading(true);
    valuesRef.current = values;
    const tagString = values.tags.join();
    const topicCreateData = {
      topicTitle: values.title,
      topicDesc: values.description,
      topicNotice: values.notice,
      topicTags: tagString,
      topicPoint: values.pointPerPerson,
    };
    await topicCreate(topicCreateData);
  };

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <>
          <AdminFormLayOut title={"토픽 생성 페이지"}>
            <Form
              onFinish={topicSubmit}
              // labelCol={{ span: 2 }}
              // wrapperCol={{ span: 21 }}
              className="w-full max-w-[1200px]"
            >
              <FormTitle />
              <FormDesc />
              <FormImg />
              <FormInterest />
              <FormPoint />
              <SubmitButtom />
            </Form>
          </AdminFormLayOut>
        </>
      )}
    </>
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
  return (
    <>
      <Form.Item name="tags" label="관심사 선택">
        <Select
          mode="multiple"
          placeholder="챌린지에 해당되는 관심사를 선택하세요"
        >
          {interestsOption.map((option) => (
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

export default TopicCreate;
