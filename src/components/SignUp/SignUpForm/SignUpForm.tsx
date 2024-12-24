import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Common/Button";
import { PATH } from "@/constants/path";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useGetCheckNickName } from "@/hooks/queries/useUserQuery";
import { Input, TextArea } from "@/components/Common/Form";

interface SignUpForm {
  nickname: string;
  information: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gitName = searchParams.get("identifier");

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameInfo, setNicknameInfo] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    trigger,
    formState: { errors },
  } = useForm<SignUpForm>({ defaultValues: { nickname: "", information: "" } });

  const nickname = useWatch({
    control,
    name: "nickname",
  });

  const information = useWatch({
    control,
    name: "information",
  });

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
    trigger("nickname");
    setNicknameInfo("");
    setIsNicknameChecked(false);
    clearErrors("nickname");
  }, [nickname, clearErrors, trigger]);

  const checkNickname = () => {
    if (
      errors.nickname &&
      errors.nickname.message === "닉네임 중복확인이 필요합니다."
    ) {
      clearErrors("nickname");
    }
    if (errors.nickname) return;
    getCheckNinkNameMutate({ value: nickname });
  };

  const redirectNextStep = (data: SignUpForm) => {
    if (isNicknameChecked) {
      navigate(PATH.INTEREST, {
        state: {
          gitNickName: gitName,
          nickName: data.nickname,
          myInfo: data.information,
        },
      });
    } else {
      setError("nickname", {
        type: "manual",
        message: "닉네임 중복확인이 필요합니다.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(redirectNextStep)} className="mb-[10rem]">
        <div className="mb-[15rem] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
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
                disabled={Boolean(
                  errors.nickname &&
                    errors.nickname.message !== "닉네임 중복확인이 필요합니다."
                )}
                className="w-[7rem] h-[3.5rem] shrink-0 bg-[#6893FF] disabled:bg-[#dddddd] text-white text-[1.3rem] font-medium "
              />
            </div>
            <span className="text-right text-red-500 ">
              {errors?.nickname?.message}
            </span>
            <span className="text-right text-blue-500">{nicknameInfo}</span>
          </div>

          <TextArea
            id="information"
            label="한 줄 소개"
            registration={register("information", {
              maxLength: {
                value: 100,
                message: "최대 100자까지 입력 가능합니다.",
              },
            })}
            placeholder="자신을 소개해주세요. (100자까지)"
            maxLength={100}
            information={`${information?.length} / 100`}
            rows={4}
          />
        </div>
        <Button
          content={"계속하기"}
          width={"w-full"}
          height={"h-[6.1rem]"}
          backgroundColor={"bg-_coral-70"}
          textSize={"text-[1.7rem]"}
          textColor={"text-white"}
          fontWeight={"font-medium"}
        />
      </form>
    </>
  );
};

export default SignUpForm;
