import BottomNav from "@/components/Common/BottomNav/BottomNav";
import MobCard from "@/components/Common/MobCard";
import { PATH } from "@/constants/path";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Main() {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (pathname !== PATH.SEARCH) {
      setSearchQuery("");
    }
  }, [pathname]);

  return (
    <MobCard>
      <div className="pb-[9rem] _sm:pb-[6.1rem] relative h-full">
        <Outlet context={{ searchQuery, setSearchQuery }} />
      </div>
      <BottomNav />
    </MobCard>
  );
}

export default Main;
