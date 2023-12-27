import React, { ReactNode } from "react";

const MobView = ({ children }: { children: ReactNode }) => {
  return (
    <div className="card-pading flex justify-center items-center">
      <div className="mobView-card bg-white ">{children}</div>
    </div>
  );
};

export default MobView;
