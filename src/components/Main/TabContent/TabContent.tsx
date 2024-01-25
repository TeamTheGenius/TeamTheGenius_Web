import { Outlet } from "react-router-dom";
import Tabs from "../Tabs/Tabs";

function TabContent() {
  return (
    <>
      <div className="px-[2.2rem] mb-[1.5rem]">
        <Tabs />
      </div>
      <Outlet />
    </>
  );
}

export default TabContent;
