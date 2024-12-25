import { useEffect, useRef, useState } from "react";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import UserName from "@/components/MyPage/MyPage/UserEdit/UserName/UserName";
import {
  useGetMyProfile,
  usePostMyProfile,
} from "@/hooks/queries/useProfileQuery";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { usePatchProfileImage } from "@/hooks/queries/useFileQuery";
import { useQueryClient } from "react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Input, TextArea } from "@/components/Common/Form";
import { useGetCheckNickName } from "@/hooks/queries/useUserQuery";
import Button from "@/components/Common/Button";
import ProfileImage from "../../MyPage/UserEdit/UserImg/UserImg";
import { makeBase64URL } from "@/utils/makeBase64URL";
import userImage from "@/assets/icon/image-edit.svg";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { makeAPIImage } from "@/helpers/makeAPIImage";

interface UserInformationFormType {
  nickname: string;
  information: string;
  image: FileList | null;
}

function UserInformationEditForm() {
  const { setModal, closeModal } = useModalStore();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameInfo, setNicknameInfo] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const selectedProfileFileList = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { data: profileData } = useGetMyProfile();
  const { mutateAsync: postMyProfileMutate } = usePostMyProfile();
  const { mutateAsync: patchProfileImage } = usePatchProfileImage();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm<UserInformationFormType>();

  const changedNickname = useWatch({
    control,
    name: "nickname",
  });

  const changedImage = useWatch({
    control,
    name: "image",
  });

  const changeMyInformation = async ({
    file,
    userId,
    myInfo,
    nickName,
  }: {
    file: File | null;
    userId: number;
    myInfo: string;
    nickName: string;
  }) => {
    try {
      await Promise.all([
        postMyProfileMutate({ myInfo, nickName }),
        patchProfileImage({ userId, file }),
      ]);
      queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
      setModal(
        <CommonModal
          content="수정 완료"
          buttonContent="확인"
          onClick={closeModal}
        />
      );
    } catch (error: any) {
      setModal(
        <CommonMutationErrorModal error={error} closeModal={closeModal} />
      );
    }
  };

  const { mutate: getCheckNinkNameMutate } = useGetCheckNickName({
    onSuccess: () => {
      setIsNicknameChecked(true);
      setNicknameInfo("사용 가능한 닉네임입니다.");
    },
    onError: () => {
      setIsNicknameChecked(false);
      setError("nickname", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다.",
      });
    },
  });

  useEffect(() => {
    reset({
      nickname: profileData?.nickname,
      information: profileData?.information,
      image: null,
    });
  }, [profileData, reset]);

  useEffect(() => {
    trigger("nickname");
    setNicknameInfo("");
    setIsNicknameChecked(false);
    clearErrors("nickname");
  }, [changedNickname, clearErrors, trigger]);

  const checkNickname = () => {
    if (errors.nickname) return;
    getCheckNinkNameMutate({ value: changedNickname });
  };

  const editHandle = (data: UserInformationFormType) => {
    if (!profileData) return;
    if (profileData?.nickname === data.nickname || isNicknameChecked) {
      changeMyInformation({
        file: data.image?.[0] || null,
        userId: profileData.userId,
        myInfo: data.information,
        nickName: data.nickname,
      });
    }
  };

  useEffect(() => {
    if (!profileData) return;
    const file = changedImage?.[0];

    if (!file) {
      setImagePreview(makeAPIImage(profileData.fileResponse));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [profileData, changedImage]);

  const validateFileSize = (files: FileList | null) => {
    if (!files?.length) return true;
    const maxSize = 5 * 1024 * 1024;
    return (
      files[0].size <= maxSize || "파일첨부 사이즈는 5MB 이내로 가능합니다."
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(editHandle)}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-6 justify-center items-center">
          <button
            type="button"
            className="w-[10rem] h-[10rem]  rounded-full"
            onClick={() => selectedProfileFileList?.current?.click()}
          >
            <div className="relative">
              <ProfileImage image={imagePreview} />
              <img
                src={userImage}
                alt="이미지 수정 아이콘"
                className="absolute right-0 bottom-0 z-50"
              />
            </div>
          </button>

          <Controller
            name="image"
            control={control}
            rules={{
              validate: {
                fileSize: validateFileSize,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/gif"
                  id="image"
                  className="hidden"
                  ref={selectedProfileFileList}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                />
                {error && (
                  <span className="text-red-500 text-[1.2rem]">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />

          <UserName data={profileData} />
        </div>

        <div className="flex gap-5">
          <Input
            id="nickname"
            label="닉네임"
            registration={register("nickname", {
              required: "닉네임을 입력해주세요",
              pattern: {
                value: /^[가-힣a-zA-Z0-9]{2,15}$/,
                message: "특수문자를 제외한 2~15자 까지 입력 가능합니다.",
              },
            })}
            placeholder="특수문자를 제외한 2~15자 까지 입력 가능합니다."
            maxLength={15}
            required
          />

          <Button
            type="button"
            content="중복확인"
            handleClick={checkNickname}
            disabled={
              !changedNickname ||
              changedNickname === profileData?.nickname ||
              Boolean(errors.nickname)
            }
            className="w-[7rem] h-[3.5rem] shrink-0 bg-[#6893FF] disabled:bg-[#dddddd] text-white text-[1.3rem] font-medium "
          />
        </div>
        <span className="text-right text-red-500 ">
          {errors?.nickname?.message}
        </span>
        <span className="text-right text-blue-500">{nicknameInfo}</span>

        <TextArea
          id="information"
          label="한 줄 소개"
          registration={register("information", {
            maxLength: {
              value: 100,
              message: "최대 100자까지 입력 가능합니다.",
            },
          })}
          placeholder="나를 표현하는 한 마디를 적어주세요."
          maxLength={100}
          rows={5}
        />
        <BottomButton
          content="수정하기"
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
    </>
  );
}

export default UserInformationEditForm;
