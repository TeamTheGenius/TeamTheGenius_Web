import MobView from "../../components/MobCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../singUp/signUpStyle.css";

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
      <MobView>
        <div className="flex">
          <h1 className="pretendard font-bold text-_h1 flex items-end">
            투두핀에
            <br />
            오신 것을 환영합니다
          </h1>
          <span className="pretendard text-_caption ml-auto">
            <i className="nomal text-_primary-50 mr-1">*</i>는 필수
            입력란입니다.
          </span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <ul className="py-6">
            <li className="mb-12 flex flex-col">
              <label htmlFor="nickName" className="signUp-lable required">
                프로필 이름
              </label>
              <input
                className="pretendard signUp-placeholder signUp-input"
                type="text"
                id="nickName"
                name="nickName"
                placeholder="2 ~ 15까지 입력해주세요."
                minLength={2}
                maxLength={15}
                value={formik.values.nickName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nickName && formik.errors.nickName ? (
                <div className="pretendard singUp-err">
                  {formik.errors.nickName}
                </div>
              ) : null}
            </li>
            <li className="mb-12 flex flex-col">
              <label htmlFor="myInfo" className="signUp-lable">
                자기소개
              </label>
              <input
                className="pretendard signUp-placeholder signUp-input"
                type="text"
                id="myInfo"
                name="myInfo"
                placeholder="한 줄로 투두메이트들에게 자신을 소개해주세요. (150자까지)"
                maxLength={150}
                value={formik.values.myInfo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.myInfo && formik.errors.myInfo ? (
                <div className="pretendard singUp-err">
                  {formik.errors.myInfo}
                </div>
              ) : null}
            </li>
          </ul>
          <button className="btn1 bg-_primary-50">
            <span className="text-white flex justify-center items-center h-full">
              가입하기
            </span>
          </button>
        </form>
      </MobView>
    </div>
  );
};

export default SignUp;
