import MobCard from "@/components/Common/MobCard";
import Comment from "./Comment/Comment";
import Image from "./Image/Image";
import Button from "./Button/Button";
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
