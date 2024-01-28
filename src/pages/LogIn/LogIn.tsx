import LoginMobCard from "@/components/Common/LoginMobCard";
import Comment from "@/components/LogIn/Comment/Comment";
import GithubLoginButton from "@/components/LogIn/GithubLoginButton";
import TermsOfService from "@/components/LogIn/TermsOfService/TermsOfService";

function LogIn() {
  return (
    <LoginMobCard>
      <div className="mx-auto">
        <Comment />
        <div className="w-full mx-auto mt-[25.2rem]">
          <GithubLoginButton />
        </div>
        <div className="mb-[28.6rem]" />
        <TermsOfService />
      </div>
    </LoginMobCard>
  );
}

export default LogIn;
