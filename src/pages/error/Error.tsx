import ErrorHeader from "@/components/Error/ErrorHeader";
import Button from "@/components/common/Button";
import MobCard from "@/components/common/MobCard";

const Error = () => {
  const back = () => {
    history.back();
  };
  return (
    <MobCard>
      <ErrorHeader />
      <Button
        content={"뒤로 가기"}
        width={"w-full"}
        height={"h-[6.1rem]"}
        backgroundColor={"bg-_primary-50"}
        textSize={"text-_h2"}
        textColor={"text-white"}
        fontWeight={"font-semibold"}
        handleClick={back}
      />
    </MobCard>
  );
};

export default Error;
