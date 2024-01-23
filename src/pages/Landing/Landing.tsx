import LoginMobCard from "@/components/Common/LoginMobCard";
import Button from "@/components/Landing/Button/Button";
import Comment from "@/components/Landing/Comment/Comment";
import Image from "@/components/Landing/Image/Image";

function Landing() {
  return (
    <LoginMobCard>
      <div className="flex flex-col gap-[2.35rem] items-center justify-center">
        <Comment />
        <div className="w-full max-w-[472px] px-[1.8rem]">
          <Image />
        </div>
        <Button />
      </div>
    </LoginMobCard>
  );
}

export default Landing;
