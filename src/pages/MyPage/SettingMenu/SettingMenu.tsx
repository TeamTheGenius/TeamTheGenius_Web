import Header from "@/components/Common/Header/Header";
import Line from "@/components/Common/Line/Line";
import LinkButton from "@/components/MyPage/SettingMenu/LinkButton/LinkButton";
import Title from "@/components/MyPage/SettingMenu/Title/Title";
import { PATH } from "@/constants/path";

function SettingMenu() {
  return (
    <>
      <Header content="설정" />
      <div className="pt-[6rem] px-[2.2rem] flex justify-center items-center">
        <div className="mt-[2.5rem] max-w-[50rem] w-full flex flex-col gap-[2.5rem]">
          <Title content="내 정보" />
          <LinkButton content="회원 정보 수정" path="" />
          <LinkButton
            content="Github Tokken 등록"
            path={PATH.MY_PAGE_GITHUB_TOKEN}
          />
        </div>
      </div>

      <div className="mt-[2.5rem] w-full max-w-[54rem] mx-auto">
        <Line />
      </div>
      <div className="px-[2.2rem] flex justify-center items-center">
        <div className="mt-[2.5rem] max-w-[50rem] w-full flex flex-col gap-[2.5rem]">
          <Title content="기타" />
          <LinkButton content="로그아웃" path="" />
          <LinkButton content="탈퇴하기" path="" />
        </div>
      </div>
    </>
  );
}

export default SettingMenu;
