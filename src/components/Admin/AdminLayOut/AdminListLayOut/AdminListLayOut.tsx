import React from "react";
import Title from "../../Title/Title";
type AdminListLayoutProps = {
  mainContent: React.ReactNode;
  pagenationContent: React.ReactNode;
  title: string;
};

function AdminListLayOut({
  mainContent,
  pagenationContent,
  title,
}: AdminListLayoutProps) {
  return (
    <>
      <header className="w-full h-[145px]"></header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title={title} />
          {mainContent}
        </div>
        {pagenationContent}
      </section>
    </>
  );
}

export default AdminListLayOut;
