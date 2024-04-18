import Header from "@/components/Common/Header/Header";
import Line from "@/components/Common/Line/Line";
import MobCard from "@/components/Common/MobCard";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import LinkButton from "@/components/MyPage/SettingMenu/LinkButton/LinkButton";
import Title from "@/components/MyPage/SettingMenu/Title/Title";
import { PATH } from "@/constants/path";
import { usePostAuthLogout } from "@/hooks/queries/useAuthQuery";
import useModal from "@/hooks/useModal";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { createPortal } from "react-dom";

function SettingMenu() {
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, closeModal, openModal } = useModal();

  const onErrorPostAuthLogout = (error: AxiosError<{ message?: string }>) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
    openModal();
  };
  const { mutate } = usePostAuthLogout({ onError: onErrorPostAuthLogout });
  const onClickLogOut = () => {
    mutate();
  };

  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}
      <MobCard>
        <Header content="설정" />
        <div className="pt-[6rem] px-[2.2rem] flex justify-center items-center">
          <div className="mt-[2.5rem] max-w-[50rem] w-full flex flex-col gap-[2.5rem]">
            <Title content="내 정보" />
            <LinkButton
              content="회원 정보 수정"
              path={PATH.MY_PAGE_USERINFO_DIT}
            />
            <LinkButton
              content="Github Token 등록"
              path={PATH.MY_PAGE_GITHUB_TOKEN}
            />
            <LinkButton content="결제 내역" path={PATH.MY_PAGE_RECEIPT} />
          </div>
        </div>

        <div className="mt-[2.5rem] w-full max-w-[54rem] mx-auto">
          <Line />
        </div>
        <div className="px-[2.2rem] flex justify-center items-center">
          <div className="mt-[2.5rem] max-w-[50rem] w-full flex flex-col gap-[2.5rem]">
            <Title content="기타" />
            <LinkButton content="로그아웃" path="" onClick={onClickLogOut} />
            <LinkButton content="탈퇴하기" path={PATH.MY_PAGE_WITHDRAW} />
          </div>
        </div>
      </MobCard>
    </>
  );
}

export default SettingMenu;
