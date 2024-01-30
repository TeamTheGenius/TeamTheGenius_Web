import BottomNav from "@/components/Common/BottomNav/BottomNav";
import MobCard from "@/components/Common/MobCard";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Main() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <MobCard>
      <div className="pb-[9rem] _sm:pb-[6.1rem]">
        <Outlet context={{ searchQuery, setSearchQuery }} />
      </div>
      <BottomNav />
    </MobCard>
  );
}

export default Main;
