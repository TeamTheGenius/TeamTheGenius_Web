import MobCard from "../../components/MobCard";
import Comment from "./Comment/Comment";
import Image from "./Image/Image";
import Button from "./Button/Button";
function Landing() {
  return (
    <MobCard>
      <div className="flex flex-col gap-[2.35rem]">
        <Comment />
        <div className="w-[472px]">
          <Image />
        </div>
        <Button />
      </div>
    </MobCard>
  );
}

export default Landing;
