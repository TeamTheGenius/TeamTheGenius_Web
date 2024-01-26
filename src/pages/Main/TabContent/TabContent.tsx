import Tabs from "@/components/Main/Tabs/Tabs";
import { Outlet } from "react-router-dom";

function TabContent() {
  return (
    <>
      <div className="px-[2.2rem]">
        <Tabs />
      </div>
      <Outlet />
    </>
  );
}

export default TabContent;
