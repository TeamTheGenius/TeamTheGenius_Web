import MainHeader from "@/components/Main/MainHeader/MainHeader";
import Tabs from "@/components/Main/Tabs/Tabs";
import { PATH } from "@/constants/path";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const currentPath = useLocation().pathname;
  useEffect(() => {
    if (currentPath == PATH.SEARCH) return;
    setSearchQuery("");
  }, [currentPath]);

  return (
    <>
      <div className="max-w-[77.3rem] w-full z-10 bg-white fixed top-0">
        <div className="my-[1.1rem]">
          <MainHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <div className="pt-[6.9rem] _sm:pt-[6rem]">
        <Outlet context={{ searchQuery }} />
      </div>
    </>
  );
}

export default Home;
