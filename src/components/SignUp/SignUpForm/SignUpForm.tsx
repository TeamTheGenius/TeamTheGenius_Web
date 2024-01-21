import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as qs from "qs";
import SignUpInput from "./SignUpInput/SignUpInput";
import Button from "@/components/Common/Button";
const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

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
    navigate("interest", {
      state: {
        email: query.email,
        nickName: formik.values.nickName,
        myInfo: formik.values.myInfo,
      },
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ul className="mb-44">
          <SignUpInput
            label="닉네임"
            required="required"
            margin="mb-[5rem]"
            id="nickName"
            name="nickName"
            placeholder="2 ~ 15자 입력 가능합니다."
            maxLength={15}
            value={formik.values.nickName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nickName && formik.errors.nickName
                ? formik.errors.nickName
                : null
            }
          />
          <SignUpInput
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
