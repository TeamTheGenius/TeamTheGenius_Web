import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import { Input, Select, TextArea } from "@/components/Common/Form";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { interestsOption } from "@/data/InterestData";
import { usePostTopicCreate } from "@/hooks/queries/useAdminTopicQuery";
import { encrypt } from "@/hooks/useCrypto";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type TopicFormData = {
  title: string;
  description: string;
  notice: string;
  pointPerPerson: string;
  tags: string[];
};

const TopicCreate = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicFormData>();

  const { mutate: topicCreate, isLoading } = usePostTopicCreate({
    onSuccess: (res: number) => {
      const encryptedTopicId = encrypt(res);
      alert("토픽이 생성되었습니다");
      navigate(`/admin/topic/edit/${encryptedTopicId}`);
    },
  });

  const onSubmit = (data: TopicFormData) => {
    const formData = {
      topicTitle: data.title,
      topicDesc: data.description,
      topicNotice: data.notice,
      topicTags: data.tags?.join(",") || "",
      topicPoint: data.pointPerPerson || "",
    };

    topicCreate(formData);
  };

  if (isLoading) return <LoadingBox />;

  return (
    <AdminFormLayOut title="토픽 생성 페이지">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <Input
          id="title"
          label="토픽 제목"
          registration={register("title", {
            required: "제목을 입력해주세요",
          })}
          error={errors.title}
          required
        />
        <TextArea
          id="description"
          label="간단한 소개"
          registration={register("description", {
            required: "간단 소개를 입력해주세요",
          })}
          error={errors.description}
          required
          rows={4}
        />
        <TextArea
          id="notice"
          label="유의사항"
          registration={register("notice", {
            required: "유의사항을 입력해주세요",
          })}
          error={errors.notice}
          required
          rows={4}
        />
        <Select
          id="tags"
          label="관심사 선택"
          options={interestsOption}
          registration={register("tags", {
            required: "관심사 태그를 설정해주세요",
          })}
          error={errors.tags}
          required
          multiple
        />
        <Input
          id="pointPerPerson"
          label="포인트"
          registration={register("pointPerPerson", {
            required: "포인트를 입력해주세요",
          })}
          error={errors.pointPerPerson}
          required
        />
        <div className="flex justify-center gap-32">
          <button className="rounded-xl w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65">
            생성
          </button>
        </div>
      </form>
    </AdminFormLayOut>
  );
};

export default TopicCreate;
