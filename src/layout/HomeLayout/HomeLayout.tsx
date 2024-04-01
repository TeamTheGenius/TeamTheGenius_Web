import HomeHeader from "@/components/Home/HomeHeader/HomeHeader";
import Tabs from "@/components/Home/Tabs/Tabs";

import React from "react";

interface Props {
  children: React.ReactNode;
}
function HomeLayout({ children }: Props) {
  return (
    <>
      <div className="max-w-[77.3rem] w-full z-10 bg-white fixed top-0">
        <div className="my-[1.1rem]">
          <HomeHeader />
        </div>
        <div className="px-[2.2rem]">
          <Tabs />
        </div>
      </div>
      <div className="pt-[11.7rem] _sm:pt-[10.8rem] h-full">{children}</div>
    </>
  );
}

export default HomeLayout;
