import Header from "@/components/Common/Header/Header";
import SignUpDesc from "@/components/SignUp/SignUpForm/SignUpInput/SignUpDesc";
import SignUpName from "@/components/SignUp/SignUpForm/SignUpName/SignUpName";
import { Form, Upload } from "antd";
import userImage from "@/assets/icon/image-edit.svg";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type userNameType = {
  gitName: string;
  userName: string;
};

const UserInfoEdit = () => {
  const [signUpBoolean, setsignUpBoolean] = useState(false);
  const [nickName, setNickName] = useState("");

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
  const handleNickNameChange = (e: any) => {
    formik.handleChange(e);
    setNickName(e.target.value);
  };
  const userEditSubmit = () => {
    alert("api연동전");
  };
  //버튼입력
  const naviState = () => {
    if (formik.values.nickName && signUpBoolean) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(formik.values.nickName)) {
        alert("닉네임에는 특수문자를 사용할 수 없습니다.");
      }
    } else if (!formik.values.nickName) {
      alert("닉네임을 입력해주세요.");
    } else if (!signUpBoolean) {
      alert("닉네임 중복확인을 해주세요.");
    }
  };
  return (
    <>
      <Header content="회원 정보 수정" />
      <div className="w-full pt-[7.8rem] px-[2.2rem] flex flex-col justify-center items-center">
        <Form onFinish={userEditSubmit}>
          <FormImg />
        </Form>
        <UserName gitName={"gitName"} userName={"userName"} />
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex justify-center"
        >
          <ul className="w-5/6 _sm:w-11/12 _md:w-11/12">
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
              value={nickName}
              setValue={setNickName}
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
        </form>
      </div>
    </>
  );
};
const FormImg = ({ file }: any) => {
  const imageData = `data:image/png;base64,${file?.encodedFile}`;

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const props = {
    name: "fileResponse",
    beforeUpload: () => false,
  };

  return (
    <>
      <Form.Item
        name="fileResponse"
        valuePropName="fileResponse"
        getValueFromEvent={normFile}
      >
        <Upload {...props}>
          <div className="w-[13.5rem] h-[13.5rem] bg-[#D9D9D9] rounded-full overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={imageData}
                alt=""
                className="w-full h-full absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"
              />
            </div>
            <img
              src={userImage}
              alt="이미지 수정 아이콘"
              className="absolute right-0 bottom-0"
            />
          </div>
        </Upload>
      </Form.Item>
    </>
  );
};
const UserName = ({ gitName, userName }: userNameType) => {
  return (
    <div className="flex flex-col items-center mb-[4rem]">
      <span className="text-[1.8rem] font-medium">{gitName}</span>
      <span className="text-[1.4rem] font-medium text-[#777777]">
        {userName}
      </span>
    </div>
  );
};
export default UserInfoEdit;
