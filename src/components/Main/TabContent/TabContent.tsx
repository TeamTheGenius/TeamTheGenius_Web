import { Outlet } from "react-router-dom";
import Tabs from "../Tabs/Tabs";

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
