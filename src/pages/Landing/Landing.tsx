import Button from "@/components/Landing/Button/Button";
import MobCard from "@/components/Common/MobCard";
import Comment from "@/components/Landing/Comment/Comment";
import Image from "@/components/Landing/Image/Image";

function Landing() {
  return (
    <MobCard>
      <div className="flex flex-col gap-[2.35rem] items-center justify-center">
        <Comment />
        <div className="w-full max-w-[472px] px-[1.8rem]">
          <Image />
        </div>
        <Button />
      </div>
    </MobCard>
  );
}

export default Landing;
