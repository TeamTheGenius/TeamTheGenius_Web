import { Form } from "antd";
import { ChangeEvent, useState } from "react";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import UserPreview from "@/components/MyPage/MyPage/UserEdit/UserPreview/UserPreview";
import InfoInput from "@/components/MyPage/MyPage/UserEdit/InfoInput/InfoInput";
import formikUtil from "@/utils/useEditFormik";
import UserInfo from "@/components/MyPage/MyPage/UserEdit/UserImg/UserImg";
import UserName from "@/components/MyPage/MyPage/UserEdit/UserName/UserName";
import NickNameInput from "@/components/Common/NickNameInput/NickNameInput";
import { EditModal } from "@/components/MyPage/EditModal/EditModal";
import {
  useGetMyProfile,
  usePostMyProfile,
} from "@/hooks/queries/useProfileQuery";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { usePatchProfileImage } from "@/hooks/queries/useFileQuery";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "@/constants/queryKey";
import { PATH } from "@/constants/path";
import { useModalStore } from "@/stores/modalStore";

function UserInformationEditForm() {
  const { setModal, closeModal } = useModalStore();
  const [signUpBoolean, setsignUpBoolean] = useState(true);
  const [nickCheck, setNickCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [myInfo, setMyInfo] = useState("");
  const [infoShow, setInfoShow] = useState(0);
  const [nickNameShow, setNickNameShow] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useGetMyProfile();
  const { formik } = formikUtil();

  const { mutateAsync: postMyProfileMutate } = usePostMyProfile();

  const { mutateAsync: patchProfileImage } = usePatchProfileImage();
  const changeMyInformation = async ({
    file,
    userId,
    myInfo,
    nickName,
  }: {
    file: string;
    userId: number;
    myInfo: string;
    nickName: string;
  }) => {
    try {
      await Promise.all([
        postMyProfileMutate({ myInfo, nickName }),
        patchProfileImage({ userId, file }),
      ]);
      queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
      setNickCheck("");
      setNickName("");
      setInfoShow(0);
      setNickNameShow(0);
      setIsLoading(false);
      closeModal();
      navigate(PATH.MY_PAGE);
    } catch (error: any) {
      setModal(
        <CommonMutationErrorModal error={error} closeModal={closeModal} />
      );
    }
  };

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
    const valueMyInfo = formik.values.myInfo;

    const finalNickName = nickName || data?.nickname;
    const finalMyinfo = valueMyInfo || data?.information;

    if (finalNickName && signUpBoolean) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(finalNickName)) {
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
    if (signUpBoolean && finalMyinfo && finalNickName && data) {
      changeMyInformation({
        file: imageUrl,
        userId: data.userId,
        myInfo: finalMyinfo,
        nickName: finalNickName,
      });
      postMyProfileMutate({ myInfo: finalMyinfo, nickName: finalNickName });
    }
    setIsLoading(false);

    if (!signUpBoolean && finalNickName !== data?.nickname) {
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
      <Form>
        <UserInfo data={data} setImageUrl={setImageUrl} imageUrl={imageUrl} />
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
              formikNickName={formik.values.nickName}
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
    </>
  );
}

export default UserInformationEditForm;
