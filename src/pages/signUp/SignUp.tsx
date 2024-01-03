import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "@/pages/signUp/signUpStyle.css";
import SignUpHeader from "@/components/SignUp/SignUpHeader/SignUpHeader";
import SignUpInput from "@/components/SignUp/SignUpInput/SignUpInput";
import Button from "@/components/Common/Button";
import MobView from "@/components/Common/MobCard";
import * as qs from "qs";
const SignUp = () => {
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
    myInfo: Yup.string().max(150, "자기소개는 최대 150자까지 입력 가능합니다"),
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

  const buttonapi = () => {
    navigate("interest", {
      state: {
        email: query.email,
        nickName: formik.values.nickName,
        myInfo: formik.values.myInfo,
      },
    });
  };

  return (
    <div>
      <MobView>
        <SignUpHeader />
        <form onSubmit={formik.handleSubmit}>
          <ul className="mb-44">
            <SignUpInput
              label="프로필 이름"
              required="required"
              margin="mb-[5rem]"
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
              required={null}
              margin={null}
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
          <Button
            content={"계속하기"}
            width={"w-full"}
            height={"h-[6.1rem]"}
            backgroundColor={"bg-_primary-50"}
            textSize={"text-_h2"}
            textColor={"text-white"}
            fontWeight={"font-semibold"}
            handleClick={buttonapi}
          />
        </form>
      </MobView>
    </div>
  );
};

export default SignUp;
