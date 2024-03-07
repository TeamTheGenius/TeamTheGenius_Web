import postAuthLogout from "@/apis/postAuthLogout";
import Header from "@/components/Common/Header/Header";
import Line from "@/components/Common/Line/Line";
import MobCard from "@/components/Common/MobCard";
import LinkButton from "@/components/MyPage/SettingMenu/LinkButton/LinkButton";
import Title from "@/components/MyPage/SettingMenu/Title/Title";
import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

function SettingMenu() {
  const navigate = useNavigate();
  const onClickLogOut = () =>
    postAuthLogout()
      .then(() => navigate(PATH.LOGIN))
      .catch((err) => {
        throw err;
      });

  return (
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
          <LinkButton content="로그아웃" path="" onClick={onClickLogOut} />
          <LinkButton content="탈퇴하기" path={PATH.MY_PAGE_WITHDRAW} />
        </div>
      </div>
    </MobCard>
  );
}

export default SettingMenu;
