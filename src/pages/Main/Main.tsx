import BottomNav from "@/components/Common/BottomNav/BottomNav";
import MobCard from "@/components/Common/MobCard";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <MobCard>
      <BottomNav />
      <Outlet />
    </MobCard>
  );
}

export default Main;
