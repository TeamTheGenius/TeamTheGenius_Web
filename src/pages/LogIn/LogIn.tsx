import MobCard from "@/components/MobCard";
import Comment from "./Comment/Comment";
import Image from "./Image/Image";
import Buttons from "./Buttons/Buttons";
import TermsOfService from "./TermsOfService/TermsOfService";

function LogIn() {
  return (
    <MobCard>
      <div className="flex flex-col gap-[5.6rem] justify-center items-center">
        <Comment />
        <Image />
        <Buttons />
      </div>
      <div className="mb-[2.1rem]"></div>
      <TermsOfService />
    </MobCard>
  );
}

export default LogIn;
