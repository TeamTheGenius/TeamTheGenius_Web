import React from "react";
import Title from "../../Title/Title";

interface MainContentProps {
  children: React.ReactNode;
}
interface TitleProps {
  title: string;
}
interface PageNationProps {
  children: React.ReactNode;
}

interface MainProps {
  children: React.ReactNode;
}

function AdminTitle({ title }: TitleProps) {
  return (
    <div className="w-3/4">
      <Title title={title} />
    </div>
  );
}
function MainContent({ children }: MainContentProps) {
  return <div className="w-3/4">{children}</div>;
}
function PageNation({ children }: PageNationProps) {
  return children;
}

function Main({ children }: MainProps) {
  return (
    <>
      <header className="w-full h-[10rem]" />
      <section className="flex flex-col items-center h-[calc(100%-10rem)]">
        {children}
      </section>
    </>
  );
}

export const AdminListLayOut = Object.assign(Main, {
  Title: AdminTitle,
  MainContent: MainContent,
  PageNation: PageNation,
});
