import { useFormik } from "formik";
import * as Yup from "yup";
import "@/pages/signUp/signUpStyle.css";
import SignUpHeader from "@/components/signUp/SignUpHeader";
import MobCard from "@/components/MobCard";
import SignUpInput from "@/components/signUp/SignUpInput";
import SignUpBtn from "@/components/signUp/SignUpBtn";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    nickName: Yup.string()
      .required("닉네임을 입력해주세요.")
      .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
      .max(15, "닉네임은 최대 15글자까지 입력 가능합니다."),
    myInfo: Yup.string().max(9, "자기소개는 최대 150자까지 입력 가능합니다"),
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

  return (
    <div>
      <MobCard>
        <SignUpHeader />
        <form onSubmit={formik.handleSubmit}>
          <ul className="py-6">
            <SignUpInput
              label="프로필 이름"
              id="nickName"
              name="nickName"
              placeholder="2 ~ 15까지 입력해주세요."
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
              label="자기소개"
              id="myInfo"
              name="myInfo"
              placeholder="한 줄로 투두메이트들에게 자신을 소개해주세요. (150자까지)"
              maxLength={150}
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
          <SignUpBtn />
        </form>
      </MobCard>
    </div>
  );
};

export default SignUp;
