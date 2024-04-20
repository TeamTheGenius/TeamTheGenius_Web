import React from "react";
import Title from "../../Title/Title";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Common/Button";

function AdminFormLayOut({
  children,
  title,
  instanceTokken,
}: {
  children: React.ReactNode;
  title: string;
  instanceTokken?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <>
      <header className="w-full h-[145px]"></header>
      <section className="w-full h-full flex flex-col items-center">
        <div className="w-3/4">
          <Title title={title} />
          {instanceTokken && (
            <div className="flex justify-end mb-10">
              <Button
                width="w-[10rem]"
                backgroundColor="bg-_neutral-70"
                fontWeight=""
                textColor="text-_neutral-10"
                height="h-[3.5rem]"
                textSize="text-_h3"
                handleClick={() => {
                  navigate(-1);
                }}
                content="뒤로가기"
              />
            </div>
          )}
          <div className="flex justify-center mt-16">{children}</div>
        </div>
      </section>
    </>
  );
}

export default AdminFormLayOut;
