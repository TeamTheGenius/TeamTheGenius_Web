import { ReactNode } from "react";

const SubHeader = ({ content }: { content: ReactNode }) => {
  return (
    <span className="text-[1.7rem] font-bold mb-[2.5rem] _sm:ml-[0.5rem] block">
      {content}
    </span>
  );
};

export default SubHeader;
