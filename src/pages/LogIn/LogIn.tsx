import MobCard from "@/components/Common/MobCard";
import Comment from "@/components/LogIn/Comment/Comment";
import GithubLoginButton from "@/components/LogIn/GithubLoginButton";
import TermsOfService from "@/components/LogIn/TermsOfService/TermsOfService";

function LogIn() {
  return (
    <MobCard>
      <div className="w-full flex flex-col gap-[5.6rem] justify-center items-center">
        <Comment />
        <GithubLoginButton />
      </div>
      <div className="mb-[2.1rem]" />
      <TermsOfService />
    </MobCard>
  );
}

export default LogIn;
