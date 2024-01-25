import MobCard from "@/components/Common/MobCard";
import MainHeader from "@/components/Main/MainHeader/MainHeader";
import SignCompleteModal from "@/components/SignCompleteModal/SignCompleteModal/SignCompleteModal";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <MobCard>
      <SignCompleteModal />
      <div className="my-[1.1rem]">
        <MainHeader />
      </div>
      <Outlet />
    </MobCard>
  );
}

export default Main;
