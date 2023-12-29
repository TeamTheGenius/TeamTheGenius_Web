import MobCard from "@/components/common/MobCard";
import Button from "@/components/common/Button";
import SignComplateHeader from "@/components/signComplate/signComplateHeader";
const SignComplate = () => {
  const todoLink = () => {
    console.log("첫 투두 만들기 링크입니다.");
  };
  const mainLink = () => {
    console.log("나중에 하기 눌렀을 때 main페이지로 가는 링크입니다.");
  };
  return (
    <div>
      <MobCard>
        <div className="px-[3.6rem] py-[6rem] shadow-lg bg-opacity-10 mb-[35rem]">
          <SignComplateHeader />
          <div className="flex flex-col justify-between h-36">
            <Button
              content={"첫 투두 만들러 가기"}
              width={"w-full"}
              height={"h-[4.4rem]"}
              backgroundColor={"bg-_primary-50"}
              textSize={"text-_body1"}
              textColor={"text-white"}
              fontWeight={"font-semibold"}
              handleClick={todoLink}
            />
            <Button
              content={"나중에 하기"}
              width={"w-full"}
              height={"h-[2.2rem]"}
              backgroundColor={"bg-transparent"}
              textSize={"text-_caption"}
              textColor={"text-black"}
              fontWeight={"font-normal"}
              handleClick={mainLink}
            />
          </div>
        </div>
      </MobCard>
    </div>
  );
};

export default SignComplate;
