import MobCard from "@/components/Common/MobCard";
import Buttons from "@/components/LogIn/Buttons/Buttons";
import Comment from "@/components/LogIn/Comment/Comment";
import Image from "@/components/LogIn/Image/Image";
import TermsOfService from "@/components/LogIn/TermsOfService/TermsOfService";

function LogIn() {
  return (
    <MobCard>
      <div className="w-full flex flex-col gap-[5.6rem] justify-center items-center">
        <Comment />
        <div className="w-full max-w-[202px]">
          <Image />
        </div>
        <Buttons />
      </div>
      <div className="mb-[2.1rem]" />
      <TermsOfService />
    </MobCard>
  );
}

export default LogIn;
