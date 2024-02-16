import test from "@/assets/image/hero.webp";

interface ProfileProps {
  children: React.ReactNode;
}

interface ImageProps {
  width: string;
}

interface GithubIdProps {
  textColor: string;
  textSize: string;
  smTextSize?: string;
}

interface NickNameProps {
  textColor: string;
  textSize: string;
  smTextSize?: string;
}

function Image({ width }: ImageProps) {
  return (
    <div className={`${width} mb-[1.5rem]`}>
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

function GithubId({ textSize, smTextSize, textColor }: GithubIdProps) {
  return (
    <p
      className={`${textColor} mb-[0.4rem] ${textSize} ${smTextSize} font-medium leading-_normal break-all`}
    >
      SSung023
    </p>
  );
}

function NickName({ textSize, smTextSize, textColor }: NickNameProps) {
  return (
    <p
      className={`${textColor} mb-[0.4rem] ${textSize} ${smTextSize} font-medium leading-_normal break-all`}
    >
      희연
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
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}

export const Profile = Object.assign(ProfileMain, {
  FlexCol: ProfileFlexColMain,
  Image: Image,
  GithubId: GithubId,
  NickName: NickName,
  Introduce: Introduce,
});
