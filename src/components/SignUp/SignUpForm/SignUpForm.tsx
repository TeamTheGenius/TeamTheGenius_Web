import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "@/components/Common/Button";
import { PATH } from "@/constants/path";
import SignUpDesc from "./SignUpInput/SignUpDesc";
import SignUpName from "./SignUpName/SignUpName";
import { useState } from "react";
const SignUpForm = () => {
  const [signUpBoolean, setsignUpBoolean] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gitName = searchParams.get("identifier");

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const naviState = () => {
    if (formik.values.nickName && signUpBoolean) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(formik.values.nickName)) {
        alert("닉네임에는 특수문자를 사용할 수 없습니다.");
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
      alert("닉네임을 입력해주세요.");
    } else if (!signUpBoolean) {
      alert("닉네임 중복확인을 해주세요.");
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ul className="mb-44">
          <SignUpName
            label="닉네임"
            required="required"
            margin="mb-[5rem]"
            id="nickName"
            name="nickName"
            placeholder="2 ~ 15자 입력 가능합니다."
            maxLength={15}
            signUpBoolean={signUpBoolean}
            setsignUpBoolean={setsignUpBoolean}
            value={formik.values.nickName}
            onChange={formik.handleChange}
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
          textSize={"text-_h2"}
          textColor={"text-white"}
          fontWeight={"font-semibold"}
          handleClick={naviState}
        />
      </form>
    </>
  );
};

export default SignUpForm;
