import InstanceCreateModal from "@/components/Admin/AdminInstance/InstanceCreateModal/InstanceCreateModal";
import InstanceListComponent from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { Pagination } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export type OptionType = {
  number: number;
  label: string;
};
const AdminInstance = () => {
  const [instanceModalIsOpen, setInstanceModalIsOpen] =
    useState<boolean>(false);
  const location = useLocation();
  console.log("location", location);

  //   임시 관심사 데이터
  const options: OptionType[] = [
    { number: 1, label: "props1" },
    { number: 2, label: "java" },
    { number: 3, label: "react" },
  ];
  return (
    <>
      <header className="w-full h-[145px]">
        {/* 헤더 디자인 완성전이라 임시로 넣었습니다. */}
      </header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title={"인스턴스 페이지"} />
          <CreateBtn setModal={setInstanceModalIsOpen} />
          <InstanceListComponent />
        </div>
        <Pagination
          defaultCurrent={1}
          total={50}
          defaultPageSize={5}
          className="mt-10"
        />
      </section>
      {instanceModalIsOpen && (
        <InstanceCreateModal
          setModalIsOpen={setInstanceModalIsOpen}
          ModalIsOpen={instanceModalIsOpen}
          title={"토픽 기본 제목입니다"}
          simpleInfoProps={"토픽 간단한 소개입니다"}
          noticeProps={"토픽 간단한 소개입니다"}
          interest={options}
          point={100}
        />
      )}
    </>
  );
};

export default AdminInstance;
