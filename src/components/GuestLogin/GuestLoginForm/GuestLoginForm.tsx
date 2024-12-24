import Button from "@/components/Common/Button";
import { GuestLoginModal } from "../GuestLoginModal";
import { usePostGuestLogin } from "@/hooks/queries/useUserQuery";
import { GuestAuthDataType } from "@/types/authType";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Common/Form";
import { useModalStore } from "@/stores/modalStore";

interface GuestLoginForm {
  id: string;
  password: string;
}

function GuestLOginForm() {
  const navigate = useNavigate();
  const { setModal, closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestLoginForm>();

  const { mutateAsync, isLoading } = usePostGuestLogin();

  const onSuccessPostAuth = (res: GuestAuthDataType) => {
    if (res.role === "USER") {
      navigate(PATH.AUTH);
    } else {
      setModal(
        <GuestLoginModal
          modalHandle={closeModal}
          isLoading={isLoading}
          editBoolean={true}
          success="아이디 또는는 비밀번호가 틀립니다."
          fail="Error"
          buttonText="확인하기"
        />
      );
    }
  };

  const handleGuestLogin = async (formData: GuestLoginForm) => {
    const data = await mutateAsync({
      id: formData.id,
      password: formData.password,
    });
    onSuccessPostAuth(data);
  };

  return (
    <form onSubmit={handleSubmit(handleGuestLogin)}>
      <div className="mb-[15rem] flex flex-col gap-10">
        <Input
          id="id"
          label="아이디"
          required
          placeholder="아이디를 입력해주세요."
          maxLength={15}
          registration={register("id", {
            pattern: {
              value: /^[a-z0-9]{4,20}$/,
              message: "영문 소문자, 숫자 4~20자로 입력해주세요",
            },
          })}
          error={errors.id}
        />

        <Input
          type="password"
          id="password"
          label="비밀번호"
          required
          placeholder="아이디를 입력해주세요."
          maxLength={20}
          registration={register("password", {
            /*             pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,20}$/,
              message: "영문, 숫자를 포함한 8~20자로 입력해주세요",
            }, */
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*]{4,20}$/,
              message: "영문, 숫자, 특수문자를 조합하여 4~20자로 입력해주세요",
            },
          })}
          error={errors.password}
        />
      </div>
      <Button
        content={"로그인하기"}
        width={"w-full"}
        height={"h-[6.1rem]"}
        backgroundColor={"bg-_coral-70"}
        textSize={"text-[1.7rem]"}
        textColor={"text-white"}
        fontWeight={"font-medium"}
      />
    </form>
  );
}

export default GuestLOginForm;
