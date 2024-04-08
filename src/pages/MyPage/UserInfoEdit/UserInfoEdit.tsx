import Header from "@/components/Common/Header/Header";
import { Form } from "antd";
import { ChangeEvent, useState } from "react";
import MobCard from "@/components/Common/MobCard";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import UserPreview from "@/components/MyPage/MyPage/UserEdit/UserPreview/UserPreview";
import InfoInput from "@/components/MyPage/MyPage/UserEdit/InfoInput/InfoInput";
import formikUtil from "@/utils/useEditFormik";
import UserInfo from "@/components/MyPage/MyPage/UserEdit/UserImg/UserImg";
import UserName from "@/components/MyPage/MyPage/UserEdit/UserName/UserName";
import useModal from "@/hooks/useModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import NickNameInput from "@/components/Common/NickNameInput/NickNameInput";
import { EditModal } from "@/components/MyPage/EditModal/EditModal";
import {
  useGetMyProfile,
  usePostMyProfile,
} from "@/hooks/queries/useProfileQuery";

const UserInfoEdit = () => {
  const [signUpBoolean, setsignUpBoolean] = useState(true);
  const [nickCheck, setNickCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [myInfo, setMyInfo] = useState("");
  const [infoShow, setInfoShow] = useState(0);
  const [nickNameShow, setNickNameShow] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const { openModal, closeModal, isModalOpened } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState(<></>);

  const { data } = useGetMyProfile();
  const { formik } = formikUtil();

  const onSuccessPostMyProfile = () => {
    setNickCheck("");
    setNickName("");
    setInfoShow(0);
    setNickNameShow(0);
    setIsLoading(false);
  };

  const onErrorPostMyProfile = () => {
    alert("생성 실패");
  };
  const { mutate } = usePostMyProfile({
    onSuccess: onSuccessPostMyProfile,
    onError: onErrorPostMyProfile,
  });

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setNickName(e.target.value);
  };
  const handleMyInfoChange = (e: any) => {
    formik.handleChange(e);
    setMyInfo(e.target.value);
  };
  const editModalOpen = () => {
    setIsLoading(false);
    openModal();
    setModal(
      <EditModal
        modalHandle={editHandle}
        isLoading={isLoading}
        editBoolean={true}
        success="유저정보를 수정하시겠습니까?"
        fail="Error"
        buttonText="확인하기"
      />
    );
  };
  const editHandle = () => {
    setIsLoading(true);
    console.log("si", signUpBoolean);
    const valueMyInfo = formik.values.myInfo;

    const finalNickName = nickName || data?.nickname;
    const finalMyinfo = valueMyInfo || data?.information;
    console.log(finalNickName);

    if (finalNickName && signUpBoolean) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(finalNickName)) {
        openModal();
        setModal(
          <EditModal
            modalHandle={closeModal}
            isLoading={isLoading}
            editBoolean={true}
            success="닉네임에는 특수문자를 사용할 수 없습니다."
            fail="Error"
            buttonText="확인하기"
          />
        );
      }
    }
    if (signUpBoolean && finalMyinfo && finalNickName) {
      mutate({ myInfo: finalMyinfo, nickName: finalNickName, files: imageUrl });
    }
    setIsLoading(false);
    if (!signUpBoolean && finalNickName !== data?.nickname) {
      openModal();
      setModal(
        <EditModal
          modalHandle={closeModal}
          isLoading={isLoading}
          editBoolean={true}
          success="닉네임 중복체크 해주세요"
          fail="Error"
          buttonText="확인하기"
        />
      );
    }
    if (isLoading) {
      closeModal();
    }
  };

  return (
    <>
      {isModalOpened && <ModalLayer onClick={closeModal}>{modal}</ModalLayer>}
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
              {nickNameShow === 0 ? (
                <UserPreview
                  label="닉네임"
                  id="nickName"
                  value={data?.nickname}
                  setShow={setNickNameShow}
                  setNickName={setNickName}
                />
              ) : (
                <NickNameInput
                  label="닉네임"
                  required="required"
                  margin="mb-[5rem]"
                  id="nickName"
                  name="nickName"
                  placeholder="2 ~ 15자 입력 가능합니다."
                  closeModal={closeModal}
                  openModal={openModal}
                  setModal={setModal}
                  userValue={data?.nickname}
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
              )}
              {infoShow === 0 ? (
                <UserPreview
                  label="한 줄 소개"
                  id="myInfoPreveiw"
                  value={data?.information}
                  setShow={setInfoShow}
                  setMyInfo={setMyInfo}
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
                  value={myInfo}
                  onChange={handleMyInfoChange}
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
              onClick={editModalOpen}
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
