import postJWTApi from "@/apis/postJWTApi";
import LoginMobCard from "@/components/Common/LoginMobCard";
import Comment from "@/components/LogIn/Comment/Comment";
import GithubLoginButton from "@/components/LogIn/GithubLoginButton";
import TermsOfService from "@/components/LogIn/TermsOfService/TermsOfService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  useEffect(() => {
    postJWTApi({ navigate });
  }, []);

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
