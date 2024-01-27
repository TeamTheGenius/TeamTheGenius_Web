import BottomNav from "@/components/Common/BottomNav/BottomNav";
import MobCard from "@/components/Common/MobCard";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <MobCard>
      <div className="pb-[9rem] _sm:pb-[6.1rem]">
        <Outlet />
      </div>
      <BottomNav />
    </MobCard>
  );
}

export default Main;
