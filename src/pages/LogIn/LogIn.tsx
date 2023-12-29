import MobCard from "@/components/MobCard";
import Buttons from "./Buttons/Buttons";
import Comment from "./Comment/Comment";
import Image from "./Image/Image";
import TermsOfService from "./TermsOfService/TermsOfService";

function LogIn() {
  return (
    <MobCard>
      <div className="flex flex-col gap-[5.6rem] justify-center items-center">
        <Comment />
        <div className="w-[202px]">
          <Image />
        </div>
        <Buttons />
      </div>
      <div className="mb-[2.1rem]"></div>
      <TermsOfService />
    </MobCard>
  );
}

export default LogIn;
