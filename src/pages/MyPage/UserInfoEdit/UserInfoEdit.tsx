import Header from "@/components/Common/Header/Header";
import { Form } from "antd";
import { useState } from "react";
import MobCard from "@/components/Common/MobCard";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import { Data } from "@/types/myProfileData";
import { useQuery, useQueryClient } from "react-query";
import getMyPageProfile from "@/apis/getMyPageProfile";
import InfoPreview from "@/components/MyPage/MyPage/UserEdit/InfoPreview/InfoPreview";
import InfoInput from "@/components/MyPage/MyPage/UserEdit/InfoInput/InfoInput";
import postUserInfoEdit from "@/apis/postUserInfoEdit";
import formikUtil from "@/utils/useEditFormik";
import UserInfo from "@/components/MyPage/MyPage/UserEdit/UserImg/UserImg";
import UserName from "@/components/MyPage/MyPage/UserEdit/UserName/UserName";
import NickNameInput from "@/components/Common/NickNameInput/NickNameInput";

const UserInfoEdit = () => {
  const [signUpBoolean, setsignUpBoolean] = useState(true);
  const [nickCheck, setNickCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [infoShow, setInfoShow] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const { data } = useQuery<Data>({
    queryKey: ["myPageProfile"],
    queryFn: () => getMyPageProfile(),
  });

  const { formik } = formikUtil();

  const queryClient = useQueryClient();

  const handleNickNameChange = (e: any) => {
    formik.handleChange(e);
    setNickName(e.target.value);
  };

  const naviState = () => {
    const valueMyInfo = formik.values.myInfo;

    const finalNickName = nickName || data?.nickname;
    const finalMyinfo = valueMyInfo || data?.information;

    if (finalNickName && signUpBoolean) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(finalNickName)) {
        alert("닉네임에는 특수문자를 사용할 수 없습니다.");
      }
    }
    if (signUpBoolean) {
      postUserInfoEdit({
        setNickName: setNickName,
        setNickCheck: setNickCheck,
        queryClient: queryClient,
        myInfo: finalMyinfo,
        nickName: finalNickName,
        files: imageUrl,
        setInfoShow: setInfoShow,
      });
    }
    if (!signUpBoolean && finalNickName !== data?.nickname) {
      alert("닉네임 중복확인을 해주세요.");
    }
  };

  return (
    <>
      <MobCard>
        <Header content="회원 정보 수정" />
        <div className="w-full pt-[7.8rem] px-[2.2rem] flex flex-col justify-center items-center">
          <Form>
            <UserInfo
              data={data}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />
          </Form>
          <UserName data={data} />
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex justify-center"
          >
            <ul className="w-5/6 _sm:w-11/12 _md:w-11/12">
              <NickNameInput
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
                nickCheck={nickCheck}
                setNickCheck={setNickCheck}
                setValue={setNickName}
                onChange={handleNickNameChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nickName && formik.errors.nickName
                    ? formik.errors.nickName
                    : null
                }
              />
              {infoShow === 0 ? (
                <InfoPreview
                  label="한 줄 소개"
                  id="myInfoPreveiw"
                  value={data?.information}
                  setInfoShow={setInfoShow}
                />
              ) : (
                <InfoInput
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
              )}
            </ul>
            <BottomButton
              onClick={naviState}
              content="수정완료"
              borderColor="border-black"
              btnMaxWidth="max-w-[46.7rem]"
              btnHeight="h-[5.1rem]"
              marginX="mx-[2rem]"
              marginXmob="_sm:ml-[20rem]"
              btnColor="bg-black"
              btnTextColor="text-white"
              btnMaxWidthMob="_sm:max-w-[16.4rem]"
            />
          </form>
        </div>
      </MobCard>
    </>
  );
};

export default UserInfoEdit;
