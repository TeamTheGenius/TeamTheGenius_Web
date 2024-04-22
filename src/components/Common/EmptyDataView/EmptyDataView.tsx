import { NavLink } from "react-router-dom";
import fireHatchIcon from "@/assets/icon/gray-fire-hatch-icon.svg";
import heartHatchIcon from "@/assets/icon/gray-heart-harch-icon.svg";
import searchHatchIcon from "@/assets/icon/gray-search-icon.svg";
import windFallenLeavesIcon from "@/assets/icon/gray-wind-fallen-leaves-icon.svg";
interface TitleProps {
  title: string;
}

interface SubTitleProps {
  subTitle: string;
}

interface ButtonProps {
  label: string;
  path: string;
}

interface MainProps {
  children: React.ReactNode;
}

function WindFallenLeavesIcon() {
  return (
    <img
      src={windFallenLeavesIcon}
      alt="빈 콘텐츠 아이콘"
      className="w-[18.5rem]"
    />
  );
}

function FireHatchIcon() {
  return (
    <img
      src={fireHatchIcon}
      alt="빈 콘텐츠 아이콘"
      className="mb-[1rem] w-[8.7rem]"
    />
  );
}

function HeartHatchIcon() {
  return (
    <img
      src={heartHatchIcon}
      alt="빈 콘텐츠 아이콘"
      className="mb-[1rem] w-[8.7rem]"
    />
  );
}

function SearchHatchIcon() {
  return (
    <img
      src={searchHatchIcon}
      alt="빈 콘텐츠 아이콘"
      className="mb-[2rem] w-[6rem]"
    />
  );
}

function Title({ title }: TitleProps) {
  return (
    <p className="text-center font-medium text-[1.8rem] text-black mb-[1rem]">
      {title}
    </p>
  );
}

function SubTitle({ subTitle }: SubTitleProps) {
  return (
    <p className="text-center font-medium text-[1.2rem] text-[#777]">
      {subTitle}
    </p>
  );
}

function Button({ label, path }: ButtonProps) {
  return (
    <NavLink
      to={path}
      className="mt-[4rem] bg-black rounded-[1rem] w-[16.4rem] h-[5rem]"
    >
      <p className="w-full h-full text-white font-medium text-[1.5rem] flex justify-center items-center">
        {label}
      </p>
    </NavLink>
  );
}

function EmptyDataViewMain({ children }: MainProps) {
  return (
    <div className="h-full  items-center justify-center flex flex-col">
      {children}
    </div>
  );
}

export const EmptyDataView = Object.assign(EmptyDataViewMain, {
  FireHatchIcon: FireHatchIcon,
  HeartHatchIcon: HeartHatchIcon,
  SearchHatchIcon: SearchHatchIcon,
  WindFallenLeavesIcon: WindFallenLeavesIcon,
  Title: Title,
  SubTitle: SubTitle,
  Button: Button,
});
