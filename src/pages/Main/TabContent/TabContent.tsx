import Tabs from "@/components/Main/Tabs/Tabs";
import { Outlet } from "react-router-dom";

function TabContent() {
  return (
    <>
      <div className="z-10 max-w-[77.3rem] fixed w-full px-[2.2rem] bg-white">
        <Tabs />
      </div>
      <Outlet />
    </>
  );
}

export default TabContent;
