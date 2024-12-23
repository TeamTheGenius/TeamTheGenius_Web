import "@/utils/antdCheck.module.css";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "@/components/Common/Loading/Loading";
import { decrypt, encrypt } from "@/hooks/useCrypto";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import {
  usePostInstanceCreate,
  usePostInstanceFileCreate,
} from "@/hooks/queries/useAdminInstanceQuery";
import { useTopicDetailQuery } from "@/hooks/queries/useAdminTopicQuery";
import { Input, Select, TextArea } from "@/components/Common/Form/index";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { useModalStore } from "@/stores/modalStore";
import { interestsOption } from "@/data/InterestData";

type DateRange = [Date | null, Date | null];

interface InstanceCreateData {
  title: string;
  description: string;
  certMethod: string;
  pointPerPerson: number;
  tags: string[];
  notice: string;
  dateRange: DateRange;
  image: FileList | null;
}

const InstanceCreate = () => {
  const { id } = useParams();
  const decryptTopicId = decrypt(id);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { setModal } = useModalStore();
  const navigate = useNavigate();

  const { data: adminDetail } = useTopicDetailQuery({
    topicId: decryptTopicId,
  });

  const {
    mutateAsync: instanceFileCreate,
    isLoading: instanceFileCreateLoading,
  } = usePostInstanceFileCreate();

  const defaultValues = useMemo<Partial<InstanceCreateData>>(
    () => ({
      title: adminDetail?.title || "",
      description: adminDetail?.description || "",
      notice: adminDetail?.notice || "",
      tags: adminDetail?.tags?.split(",") || [],
      pointPerPerson: adminDetail?.pointPerPerson || 0,
      certMethod: "",
      dateRange: [null, null],
      image: null,
    }),
    [adminDetail]
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<InstanceCreateData>({ defaultValues });

  const image = watch("image");

  const getTomorrowDate = (today: Date) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  };

  const formatDateRange = (dateRange: DateRange) => ({
    formmatStartDate: moment(dateRange[0]).format("YYYY-MM-DDT00:00:00"),
    formmatEndDate: moment(dateRange[1]).format("YYYY-MM-DDT23:59:59"),
  });

  const onSuccessUsePostInstance = async (res: number) => {
    const file = image?.[0];
    if (!file) return;

    await instanceFileCreate({ instanceImg: file, instanceId: res });
    const encryptedInstanceId = encrypt(res);
    alert("인스턴스가 생성되었습니다.");
    navigate(`/admin/instance/${encryptedInstanceId}/edit`);
  };

  const { mutate: instanceCreate, isLoading: instanceCreateLoading } =
    usePostInstanceCreate({
      onSuccess: onSuccessUsePostInstance,
    });

  const instanceSumbit = (data: InstanceCreateData) => {
    if (!data?.image?.[0]) {
      alert("이미지를 설정해주세요");
      return;
    }

    const { formmatStartDate, formmatEndDate } = formatDateRange(
      data.dateRange
    );

    const instanceData = {
      topicId: decryptTopicId,
      instanceTitle: data.title,
      instanceDesc: data.description,
      instanceNotice: data.notice,
      instanceCertMethod: data.certMethod,
      instanceTags: data.tags.join(),
      instancePoint: data.pointPerPerson,
      instanceRangeStart: formmatStartDate,
      instanceRangeEnd: formmatEndDate,
    };

    instanceCreate(instanceData);
  };

  const openImagePreview = () => {
    setModal(
      <ModalLayer>
        <img src={imagePreview || ""} alt="선택한 이미지" />
      </ModalLayer>
    );
  };

  useEffect(() => {
    const file = image?.[0];

    if (!file) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const isLoading = instanceCreateLoading || instanceFileCreateLoading;

  if (isLoading) return <Loading />;

  return (
    <AdminFormLayOut title="인스턴스 생성 페이지" instanceTokken={true}>
      <form
        onSubmit={handleSubmit(instanceSumbit)}
        className="w-full flex flex-col gap-6"
      >
        <Input
          id="title"
          label="제목"
          registration={register("title", { required: "제목을 입력해주세요" })}
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
        <TextArea
          id="certMethod"
          label="인증방법"
          registration={register("certMethod", {
            required: "인증방법을 입력해주세요",
          })}
          error={errors.certMethod}
          required
          rows={4}
        />
        <div className="flex gap-4">
          <Input
            type="file"
            accept="image/*"
            id="image"
            label="이미지 업로드"
            registration={register("image", {
              required: "사진을 첨부해주세요",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files?.length) {
                  e.preventDefault();
                  return false;
                }
              },
            })}
            error={errors.image}
            required
          />
          {imagePreview && (
            <button
              type="button"
              className="text-[1.2rem] bg-gray-200 border rounded-lg p-4 shrink-0"
              onClick={openImagePreview}
            >
              미리보기
            </button>
          )}
        </div>
        <Select
          id="tags"
          label="관심사 선택"
          options={interestsOption}
          registration={register("tags")}
          error={errors.tags}
          multiple
          disabled
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

        <Controller
          name="dateRange"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input id="dateRange" label="챌린지 기간" error={error} required>
              <DatePicker
                id="dateRange"
                locale={ko}
                minDate={getTomorrowDate(new Date())}
                startDate={field.value?.[0] || undefined}
                endDate={field.value?.[1] || undefined}
                dateFormat="yyyy-MM-dd"
                onChange={(range: DateRange) => {
                  field.onChange(range);
                }}
                placeholderText="Start Date ~ End Date"
                className="border-gray-300 border rounded-lg py-2 text-center w-full"
                selectsRange={true}
              />
            </Input>
          )}
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

export default InstanceCreate;
