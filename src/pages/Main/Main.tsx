import MobCard from "@/components/Common/MobCard";
import Tabs from "@/components/Main/Tabs/Tabs";
import SignCompleteModal from "@/components/SignCompleteModal/SignCompleteModal/SignCompleteModal";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <MobCard>
      <SignCompleteModal />
      <div className="px-[2.2rem]">
        <Tabs />
      </div>
      <Outlet />
    </MobCard>
  );
}

export default Main;
