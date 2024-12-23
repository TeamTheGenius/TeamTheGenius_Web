import { useEffect, useMemo, useState } from "react";
import Loading from "@/components/Common/Loading/Loading";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { decrypt } from "@/hooks/useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";
import AdminFormLayOut from "@/components/Admin/AdminLayOut/AdminFormLayOut/AdminFormLayOut";
import {
  useInstanceDetailQuery,
  usePatchInstanceCreate,
  usePatchInstanceFileCreate,
} from "@/hooks/queries/useAdminInstanceQuery";
import { Controller, useForm } from "react-hook-form";
import { Input, Select, TextArea } from "@/components/Common/Form";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { useModalStore } from "@/stores/modalStore";
import { interestsOption } from "@/data/InterestData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { makeBase64URL } from "@/utils/makeBase64URL";
import { makeBase64ToFileList } from "@/utils/makeBase64ToFile";

type DateRange = [Date | null, Date | null];

type InstanceEditData = {
  title: string;
  description: string;
  pointPerPerson: number;
  certMethod: string;
  tags: string;
  notice: string;
  dateRange: DateRange;
  image: FileList | null;
};

const InstanceEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const decryptedInstanceId = decrypt(id);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { setModal } = useModalStore();

  const { data: instanceDetail } = useInstanceDetailQuery({
    instanceId: decryptedInstanceId,
  });

  const originalFileList = useMemo(
    () =>
      makeBase64ToFileList(
        instanceDetail?.fileResponse?.source,
        `instance_${decryptedInstanceId}_original`
      ),
    [instanceDetail?.fileResponse?.source, decryptedInstanceId]
  );

  const defaultValues = useMemo<Partial<InstanceEditData>>(
    () => ({
      title: instanceDetail?.title,
      description: instanceDetail?.description,
      notice: instanceDetail?.notice,
      tags: instanceDetail?.tags?.split(",") || [],
      certMethod: instanceDetail?.certificationMethod,
      pointPerPerson: instanceDetail?.pointPerPerson,
      dateRange: [
        instanceDetail?.startedAt ? new Date(instanceDetail.startedAt) : null,
        instanceDetail?.completedAt
          ? new Date(instanceDetail.completedAt)
          : null,
      ],
      image: null,
    }),
    [instanceDetail]
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<InstanceEditData>({ defaultValues });

  const image = watch("image");

  const onSuccessUsePatchInstance = () => {
    const instanceData = {
      instanceId: decryptedInstanceId,
      instanceImg: image?.[0] || originalFileList?.[0],
    };
    instanceFilePatch(instanceData);
  };
  const onSuccessUsePatchIntanceFileCreate = () => {
    alert("인스턴스가 수정되었습니다.");
    queryClient.invalidateQueries(QUERY_KEY.ADMIN_INSTANCE_DETAIL);
  };

  const { mutate: instancePatch, isLoading: instancePatchIsLoading } =
    usePatchInstanceCreate({
      onSuccess: onSuccessUsePatchInstance,
    });

  const { mutate: instanceFilePatch, isLoading: instanceFilePatchIsLoading } =
    usePatchInstanceFileCreate({
      onSuccess: onSuccessUsePatchIntanceFileCreate,
    });

  const isLoading = instancePatchIsLoading || instanceFilePatchIsLoading;

  const instanceSumbit = (data: InstanceEditData) => {
    if (!data?.image?.[0] && !originalFileList?.[0]) {
      alert("이미지를 선택해주세요");
      return;
    }

    const instanceData = {
      instanceId: decryptedInstanceId,
      topicIdId: instanceDetail.topicId,
      instanceTitle: data.title,
      instanceDesc: data.description,
      instanceCertificationMethod: data.certMethod,
      instanceNotice: data.notice,
      instancePoint: data.pointPerPerson,
      instanceStartAt: instanceDetail.startedAt,
      instanceCompletedAt: instanceDetail.completedAt,
    };

    instancePatch(instanceData);
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
      setImagePreview(
        makeBase64URL({
          uri: instanceDetail?.fileResponse?.source,
          format: "jpg",
        })
      );
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image, instanceDetail?.fileResponse?.source]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AdminFormLayOut title={"인스턴스 수정 페이지"} instanceTokken={true}>
          <form
            onSubmit={handleSubmit(instanceSumbit)}
            className="w-full flex flex-col gap-6"
          >
            <Input
              id="title"
              label="제목"
              registration={register("title", {
                required: "제목을 입력해주세요",
              })}
              error={errors.title}
              disabled
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
                registration={register("image")}
                error={errors.image}
                information="선택된 파일이 없으면 기존 인스턴스 이미지가 적용됩니다."
              />

              {imagePreview && (
                <button
                  type="button"
                  className="text-[1.2rem] bg-gray-200 border rounded-lg p-4 shrink-0 "
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
                <Input
                  id="dateRange"
                  label="챌린지 기간"
                  error={error}
                  disabled
                >
                  <DatePicker
                    id="dateRange"
                    locale={ko}
                    startDate={field.value?.[0] || undefined}
                    endDate={field.value?.[1] || undefined}
                    dateFormat="yyyy-MM-dd"
                    className="border-gray-300 border rounded-lg py-2 text-center w-full"
                    selectsRange={true}
                    disabled
                  />
                </Input>
              )}
            />

            <div className="flex justify-center gap-32">
              <button className="rounded-xl w-[10rem] h-[5rem] text-white bg-_neutral-70 text-_h3 hover:opacity-65">
                수정
              </button>
            </div>
          </form>
        </AdminFormLayOut>
      )}
    </>
  );
};

export default InstanceEdit;
