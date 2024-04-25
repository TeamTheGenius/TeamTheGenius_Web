import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Select, Upload, UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";

import { fileType, uploadDataType } from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";
import { useParams } from "react-router-dom";
import { decrypt } from "@/hooks/useCrypto";
import {
  usePatchTopicEdit,
  usePatchTopicFileEdit,
  useTopicDetailQuery,
} from "@/hooks/queries/useAdminTopicQuery";
import { useQueryClient } from "react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import { interestsOption } from "@/data/InterestData";

type topicSubmitType = {
  tags: any;
  title: string;
  description: string;
  notice: string;
  fileResponse: uploadDataType;
  pointPerPerson: number;
};

const TopicEdit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const decryptedTopicId = decrypt(id);
  const [form] = Form.useForm();
  const valuesRef = useRef<topicSubmitType | null>(null);

  const { data: adminDetail } = useTopicDetailQuery({
    topicId: decryptedTopicId,
  });

  const title = adminDetail?.title;
  const description = adminDetail?.description;
  const notice = adminDetail?.notice;
  const file = adminDetail?.fileResponse;
  const tags = adminDetail?.tags;
  const tagsArray = tags ? tags.split(",") : [];
  const point = adminDetail?.pointPerPerson;

  const onSuccessUsePatchTopicEdit = () => {
    setIsLoading(false);
    if (valuesRef.current) {
      const topicFileData = {
        topicId: decryptedTopicId,
        topicFile: valuesRef.current.fileResponse[0]?.originFileObj,
      };
      instanceFilePatch(topicFileData);
    }
  };
  const onErrorUsePatchTopicEdit = (errMessage: string) => {
    setIsLoading(false);
    alert(errMessage);
  };
  const onSuccessUsePatchTopicFileEdit = () => {
    setIsLoading(false);
    alert("토픽이 수정되었습니다.");
    queryClient.invalidateQueries(QUERY_KEY.ADMIN_TOPIC_DETAIL);
  };
  const onErrorUsePatchTopicFileEdit = (errMessage: string) => {
    setIsLoading(false);
    alert(errMessage);
  };
  const { mutate: instancePatch } = usePatchTopicEdit({
    onSuccess: onSuccessUsePatchTopicEdit,
    onError: onErrorUsePatchTopicEdit,
  });
  const { mutate: instanceFilePatch } = usePatchTopicFileEdit({
    onSuccess: onSuccessUsePatchTopicFileEdit,
    onError: onErrorUsePatchTopicFileEdit,
  });
  const topicSubmit = async (values: topicSubmitType) => {
    setIsLoading(true);
    valuesRef.current = values;
    const tagString = values.tags.join();
    const topicData = {
      setIsLoading: setIsLoading,
      topicId: decryptedTopicId,
      topicTitle: values.title,
      topicDesc: values.description,
      topicNotice: values.notice,
      topicTags: tagString,
      topicPoint: values.pointPerPerson,
    };

    await instancePatch(topicData);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: adminDetail?.title,
      description: adminDetail?.description,
      notice: adminDetail?.notice,
      file: adminDetail?.fileResponse,
      tags: tagsArray,
      pointPerPerson: adminDetail?.pointPerPerson,
    });
  }, [adminDetail, form]);
  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <AdminFormLayOut title={"토픽 수정 페이지"}>
            <Form
              form={form}
              onFinish={topicSubmit}
              // labelCol={{ span: 4 }}
              // wrapperCol={{ span: 19 }}
              className="w-full max-w-[1200px]"
            >
              <FormTitle title={title} />
              <FormDesc description={description} notice={notice} />
              <FormImg file={file} />
              <FormInterest tags={tags} />
              <FormPoint point={point} />
              <SubmitButtom />
            </Form>
          </AdminFormLayOut>
        </>
      )}
    </>
  );
};

const FormTitle = ({ title }: { title: string | undefined }) => {
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
  const tagsArray = tags ? tags.split(",") : [];

  return (
    <>
      <Form.Item name="tags" label="관심사 선택" initialValue={tagsArray}>
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
const SubmitButtom = () => {
  return (
    <>
      <div className="flex justify-center gap-32">
        <Button
          htmlType="submit"
          className="w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65"
        >
          수정
        </Button>
      </div>
    </>
  );
};
export default TopicEdit;
