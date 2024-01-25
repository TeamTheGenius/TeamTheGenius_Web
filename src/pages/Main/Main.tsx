import MobCard from "@/components/Common/MobCard";
import SignCompleteModal from "@/components/SignCompleteModal/SignCompleteModal/SignCompleteModal";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <MobCard>
      <SignCompleteModal />
      <Outlet />
    </MobCard>
  );
}

export default Main;
