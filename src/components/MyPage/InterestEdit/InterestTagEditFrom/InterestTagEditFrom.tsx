import BottomButton from "@/components/Common/BottomButton/BottomButton";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import { interestsOption } from "@/data/InterestData";
import { useEffect } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useModalStore } from "@/stores/modalStore";
import {
  useGetMyProfileInterestTag,
  usePostMyProfileInterestTag,
} from "@/hooks/queries/useProfileQuery";
import { Checkbox } from "@/components/Common/Form";
import { useForm } from "react-hook-form";

interface InterestTagForm {
  interests: string[];
}

function InterestTagEditFrom() {
  const { setModal, closeModal } = useModalStore();
  const { data: initialInterests } = useGetMyProfileInterestTag();
  const { register, watch, handleSubmit, reset } = useForm<InterestTagForm>({
    defaultValues: { interests: [] },
  });

  const watchedInterests = watch("interests");

  const { mutate: updateInterests, isLoading } = usePostMyProfileInterestTag({
    onSuccess: () => {
      setModal(
        <CommonModal
          content="관심사 수정에 성공하였습니다."
          buttonContent="확인"
          onClick={closeModal}
        />
      );
    },
  });

  const handleFormSubmit = (data: InterestTagForm) => {
    updateInterests(data.interests);
  };

  useEffect(() => {
    if (initialInterests) {
      reset({ interests: initialInterests });
    }
  }, [reset, initialInterests]);

  if (isLoading) return <LoadingBox />;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full h-full px-[15.3rem] py-[15.2rem] _sm:px-[2rem] _sm:py-[15.2rem] _md:px-[2rem] _md:py-[11.2rem]">
        <div className="mb-[11rem]">
          <InterestHeader />
        </div>
        <Checkbox
          options={interestsOption}
          registration={register("interests")}
          checkedValues={watchedInterests}
        />
      </div>
      <BottomButton
        content="수정완료"
        borderColor="border-black"
        btnMaxWidth="max-w-[46.7rem]"
        btnHeight="h-[5.1rem]"
        marginX="mx-[2rem]"
        marginXmob="_sm:ml-[20rem]"
        btnColor="bg-black"
        btnTextColor="text-white"
        btnMaxWidthMob="_sm:max-w-[16.4rem]"
      />
    </form>
  );
}

export default InterestTagEditFrom;
