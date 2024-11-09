import { useState } from "react";
import { useFormik } from "formik";
import { useModalStore } from "@/stores/modalStore";
import Button from "@/components/Common/Button";
import { GuestLoginModal } from "../GuestLoginModal";
import IdInput from "./IdInput/IdInput";
import PwInput from "./PwInput/PwInput";
import { usePostGuestLogin } from "@/hooks/queries/useUserQuery";
import { GuestAuthDataType } from "@/types/authType";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

function GuestLOginForm() {
  const { setModal, closeModal } = useModalStore();
  const [idState, setIdState] = useState("");
  const [pwState, setPwState] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nickName: "",
      myInfo: "",
    },
    onSubmit: () => {},
  });

  const handleIdChange = (e: any) => {
    formik.handleChange(e);
    setIdState(e.target.value);
  };

  const handlePwChange = (e: any) => {
    formik.handleChange(e);
    setPwState(e.target.value);
  };

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
          success="아이디 및 비밀번호가 틀립니다."
          fail="Error"
          buttonText="확인하기"
        />
      );
    }
  };

  const handleGuestLogin = async () => {
    const data = await mutateAsync({ id: idState, password: pwState });

    onSuccessPostAuth(data);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <ul className="mb-[15rem]">
        <IdInput
          label="아이디"
          required="required"
          margin="mb-[5rem]"
          id="id"
          name="id"
          placeholder="아이디를 입력해주세요."
          maxLength={15}
          value={idState}
          setValue={setIdState}
          onChange={handleIdChange}
        />
        <PwInput
          label="비밀번호"
          required="required"
          margin="mb-[5rem]"
          id="pw"
          name="pw"
          placeholder="비밀번호를 입력해주세요"
          maxLength={15}
          value={pwState}
          setValue={setPwState}
          onChange={handlePwChange}
        />
      </ul>
      <Button
        content={"로그인하기"}
        width={"w-full"}
        height={"h-[6.1rem]"}
        backgroundColor={"bg-_coral-70"}
        textSize={"text-[1.7rem]"}
        textColor={"text-white"}
        fontWeight={"font-medium"}
        handleClick={handleGuestLogin}
      />
    </form>
  );
}

export default GuestLOginForm;
