import Loading from "@/components/Common/Loading/Loading";
import { useParams } from "react-router-dom";
import { decrypt } from "@/hooks/useCrypto";
import { useQueryClient } from "react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import { interestsOption } from "@/data/InterestData";
import {
  usePatchTopicEdit,
  useTopicDetailQuery,
} from "@/hooks/queries/useAdminTopicQuery";
import { useForm } from "react-hook-form";
import { Input, Select, TextArea } from "@/components/Common/Form";
import { useEffect } from "react";

type TopicFormData = {
  description: string;
  notice: string;
  pointPerPerson: string;
  tags: string[];
  title: string;
};

const TopicEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const decryptedTopicId = decrypt(id);

  const { data: adminDetail } = useTopicDetailQuery({
    topicId: decryptedTopicId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TopicFormData>();

  useEffect(() => {
    if (adminDetail) {
      reset({
        title: adminDetail.title,
        description: adminDetail.description,
        notice: adminDetail.notice,
        tags: adminDetail.tags?.split(",") || [],
        pointPerPerson: adminDetail.pointPerPerson,
      });
    }
  }, [adminDetail, reset]);

  const { mutate: topicPatch, isLoading } = usePatchTopicEdit({
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.ADMIN_TOPIC_DETAIL);
      alert("토픽이 수정되었습니다.");
    },
  });

  const onSubmit = (data: TopicFormData) => {
    const formData = {
      topicId: decryptedTopicId,
      topicTitle: data.title,
      topicDesc: data.description,
      topicNotice: data.notice,
      topicTags: data.tags.join(","),
      topicPoint: data.pointPerPerson,
    };

    topicPatch(formData);
  };

  if (isLoading) return <Loading />;

  return (
    <AdminFormLayOut title="토픽 수정 페이지">
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
            수정
          </button>
        </div>
      </form>
    </AdminFormLayOut>
  );
};

export default TopicEdit;
