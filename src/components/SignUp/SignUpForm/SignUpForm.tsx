import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "@/components/Common/Button";
import { PATH } from "@/constants/path";
import SignUpDesc from "./SignUpInput/SignUpDesc";
import { useState } from "react";
import NickNameInput from "@/components/Common/NickNameInput/NickNameInput";
import { SignUpModal } from "./SignUpModal/SignUpModal";
import { useModalStore } from "@/stores/modalStore";

const SignUpForm = () => {
  const { setModal, closeModal } = useModalStore();
  const [signUpBoolean, setsignUpBoolean] = useState(false);
  const [nickName, setNickName] = useState("");
  const [nickCheck, setNickCheck] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gitName = searchParams.get("identifier");
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    nickName: Yup.string()
      .required("닉네임을 입력해주세요.")
      .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
      .max(15, "닉네임은 최대 15글자까지 입력 가능합니다.")
      .matches(
        /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]*$/,
        "프로필 이름에는 스페이스바와 특수문자를 사용할 수 없습니다."
      ),
    myInfo: Yup.string().max(
      100,
      "한 줄 소개는 최대 100자까지 입력 가능합니다"
    ),
  });

  const formik = useFormik({
    initialValues: {
      nickName: "",
      myInfo: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });
  const handleNickNameChange = (e: any) => {
    formik.handleChange(e);
    setNickName(e.target.value);
  };
  const naviState = () => {
    if (formik.values.nickName && signUpBoolean) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(formik.values.nickName)) {
        setIsLoading(false);
        setModal(
          <SignUpModal
            modalHandle={closeModal}
            isLoading={isLoading}
            editBoolean={true}
            success="닉네임에는 특수문자를 사용할 수 없습니다."
            fail="Error"
            buttonText="확인하기"
          />
        );
      } else {
        navigate(PATH.INTEREST, {
          state: {
            gitNickName: gitName,
            nickName: formik.values.nickName,
            myInfo: formik.values.myInfo,
          },
        });
      }
    } else if (!formik.values.nickName) {
      setIsLoading(false);
      setModal(
        <SignUpModal
          modalHandle={closeModal}
          isLoading={isLoading}
          editBoolean={true}
          success="닉네임을 입력해주세요."
          fail="Error"
          buttonText="확인하기"
        />
      );
    } else if (!signUpBoolean) {
      setIsLoading(false);
      setModal(
        <SignUpModal
          modalHandle={closeModal}
          isLoading={isLoading}
          editBoolean={true}
          success="닉네임 중복확인을 해주세요."
          fail="Error"
          buttonText="확인하기"
        />
      );
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ul className="mb-[15rem]">
          <NickNameInput
            label="닉네임"
            required="required"
            margin="mb-[5rem]"
            id="nickName"
            name="nickName"
            placeholder="2 ~ 15자 입력 가능합니다."
            maxLength={15}
            formikNickName={formik.values.nickName}
            signUpBoolean={signUpBoolean}
            setsignUpBoolean={setsignUpBoolean}
            value={nickName}
            setValue={setNickName}
            nickCheck={nickCheck}
            setNickCheck={setNickCheck}
            onChange={handleNickNameChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nickName && formik.errors.nickName
                ? formik.errors.nickName
                : null
            }
          />
          <SignUpDesc
            label="한 줄 소개"
            required={null}
            margin={null}
            id="myInfo"
            name="myInfo"
            placeholder="자신을 소개해주세요. (100자까지)"
            maxLength={100}
            value={formik.values.myInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.myInfo && formik.errors.myInfo
                ? formik.errors.myInfo
                : null
            }
          />
        </ul>
        <Button
          content={"계속하기"}
          width={"w-full"}
          height={"h-[6.1rem]"}
          backgroundColor={"bg-_coral-70"}
          textSize={"text-[1.7rem]"}
          textColor={"text-white"}
          fontWeight={"font-medium"}
          handleClick={naviState}
        />
      </form>
    </>
  );
};

export default SignUpForm;
