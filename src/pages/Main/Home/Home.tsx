import MainHeader from "@/components/Main/MainHeader/MainHeader";
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
      <div className="px-[2.2rem]">
        <div className="my-[1.1rem]">
          <MainHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <Outlet context={{ searchQuery }} />
    </>
  );
}

export default Home;
