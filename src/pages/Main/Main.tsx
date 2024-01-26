import MobCard from "@/components/Common/MobCard";
import MainHeader from "@/components/Main/MainHeader/MainHeader";
import SignCompleteModal from "@/components/SignCompleteModal/SignCompleteModal/SignCompleteModal";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Main() {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
