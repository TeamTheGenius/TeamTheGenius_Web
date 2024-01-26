import MobCard from "@/components/Common/MobCard";
import MainHeader from "@/components/Main/MainHeader/MainHeader";
import SignCompleteModal from "@/components/SignCompleteModal/SignCompleteModal/SignCompleteModal";
import { PATH } from "@/constants/path";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Main() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const currentPath = useLocation().pathname;
  useEffect(() => {
    if (currentPath == PATH.SEARCH) return;
    setSearchQuery("");
  }, [currentPath]);

  return (
    <MobCard>
      <SignCompleteModal />
      <div className="my-[1.1rem]">
        <MainHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <Outlet context={{ searchQuery }} />
    </MobCard>
  );
}

export default Main;
