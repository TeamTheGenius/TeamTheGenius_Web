import test from "@/assets/image/hero.webp";

interface ProfileProps {
  children: React.ReactNode;
}

interface ImageProps {
  imgSrc: string;
  alt: string;
}

function Image() {
  return (
    <div className="w-[10.2rem]">
      <div className="relative w-full pb-[100%]">
        <img
          src={test}
          alt="테스트"
          className="w-full h-full absolute top-0 left-0 rounded-full"
        />
      </div>
    </div>
  );
}

function GithubId() {
  return (
    <p className="text-black text-[1.8rem] _sm:text-[1.6rem] font-medium leading-_normal break-all">
      gggggggggg
    </p>
  );
}

function NickName() {
  return (
    <p className="text-[#777] text-[1.6rem] _sm:text-[1.4rem] font-medium leading-_normal break-all">
      dddddddd
    </p>
  );
}

function Introduce() {
  return <p className="text-[1.4rem] font-medium">안녕하세요 반갑습니다</p>;
}

function ProfileMain({ children }: ProfileProps) {
  return <div className="w-full">{children}</div>;
}

function ProfileFlexColMain({ children }: ProfileProps) {
  return <div className="flex flex-col">{children}</div>;
}

export const Profile = Object.assign(ProfileMain, {
  FlexCol: ProfileFlexColMain,
  Image: Image,
  GithubId: GithubId,
  NickName: NickName,
  Introduce: Introduce,
});
