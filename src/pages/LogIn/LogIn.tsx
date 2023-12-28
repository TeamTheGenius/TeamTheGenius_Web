import MobCard from "@/components/MobCard";
import Comment from "./Comment/Comment";
import Image from "./Image/Image";
import Buttons from "./Buttons/Buttons";

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
