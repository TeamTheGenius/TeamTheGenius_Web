import MobCard from "@/components/MobCard";
import Buttons from "./Buttons/Buttons";
import Comment from "./Comment/Comment";
import Image from "./Image/Image";

function LogIn() {
  return (
    <MobCard>
      <div className="flex flex-col gap-[5.6rem] justify-center items-center">
        <Comment />
        <Image />
        <Buttons />
      </div>
    </MobCard>
  );
}

export default LogIn;
