import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import LoginMobCard from "@/components/Common/LoginMobCard";
import Button from "@/components/Common/Button";
import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import { interestsData } from "@/data/InterestData";
import basicOrangeProfileImage from "@/assets/image/basic-profile-image-orange.png";
import basicGrayProfileImage from "@/assets/image/basic-profile-image-gray.png";
import basicPinkProfileImage from "@/assets/image/basic-profile-image-pink.png";
import basicBlueProfileImage from "@/assets/image/basic-profile-image-blue.png";
import basicGreenProfileImage from "@/assets/image/basic-profile-image-green.png";
import Loading from "@/components/Common/Loading/Loading";
import { usePostSignUp } from "@/hooks/queries/useUserQuery";
import useModal from "@/hooks/useModal";
import { createPortal } from "react-dom";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { PATH } from "@/constants/path";
import CommonModal from "@/components/Common/CommonModal/CommonModal";

import { usePostAuth } from "@/hooks/queries/useAuthQuery";
import { usePostProfileImage } from "@/hooks/queries/useFileQuery";

type Interest = {
  id: number;
  name: string;
};

const Interest = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, closeModal, openModal } = useModal();

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;
  const InterestValue: Interest[] = interestsData;

  const onClickMoveToSiupUpFirstStep = () => {
    closeModal();
    navigate(PATH.LOGIN);
  };

  const onErrorPostSignUp = () => {
    setModal(
      <CommonModal
        content={"오류가 발생했습니다.\n처음으로 이동합니다."}
        buttonContent="확인"
        onClick={onClickMoveToSiupUpFirstStep}
      />
    );
    openModal();
  };

  const { mutateAsync: postSignUpMutateAsync, isLoading: postSignUpLoading } =
    usePostSignUp({
      onError: onErrorPostSignUp,
    });

  const onSuccessPostSignUpProfileImage = () => {
    navigate(PATH.AUTH);
  };
  const onErrorPostSignUpProfileImage = () => {
    navigate(PATH.AUTH);
  };

  const {
    mutate: postSignUpProfileImageMutate,
    isLoading: postSignUpProfileImageLoading,
  } = usePostProfileImage({
    onError: onErrorPostSignUpProfileImage,
    onSuccess: onSuccessPostSignUpProfileImage,
  });

  const { mutateAsync } = usePostAuth();

  const getRandomProfileImage = () => {
    const imagePaths = [
      basicOrangeProfileImage,
      basicGrayProfileImage,
      basicPinkProfileImage,
      basicBlueProfileImage,
      basicGreenProfileImage,
    ];

    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
  };

  const handleSignUp = async () => {
    const data = await postSignUpMutateAsync({
      identifier: locationState.gitNickName,
      nickname: locationState.nickName,
      information: locationState.myInfo,
      interest: checkedValues,
    });
    await mutateAsync();
    postSignUpProfileImageMutate({
      userId: data.data.data.userId,
      file: getRandomProfileImage(),
    });
  };

  if (postSignUpLoading || postSignUpProfileImageLoading) {
    return <Loading />;
  }
  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}
      <LoginMobCard>
        <div className="mb-[22rem]">
          <InterestHeader />
        </div>
        <InterestCheck
          InterestValue={InterestValue}
          setCheckedValues={setCheckedValues}
          checkedValues={checkedValues}
        />
        <div className="flex flex-col justify-between h-40 mt-[22rem]">
          <Button
            content={"가입하기"}
            width={"w-full"}
            height={"h-[6.1rem]"}
            backgroundColor={"bg-_coral-70"}
            textSize={"text-[1.7rem]"}
            textColor={"text-white"}
            fontWeight={"font-medium"}
            handleClick={handleSignUp}
          />
        </div>
      </LoginMobCard>
    </>
  );
};
export default Interest;
