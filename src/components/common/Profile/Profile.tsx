interface ProfileProps {
  children: React.ReactNode;
}

interface ImageProps {
  width: string;
  imgSrc: string;
  alt: string;
}

interface GithubIdProps {
  textColor: string;
  textSize: string;
  smTextSize?: string;
  content: string;
}

interface NickNameProps {
  textColor: string;
  textSize: string;
  smTextSize?: string;
  content: string;
}

function Image({ width, imgSrc, alt }: ImageProps) {
  return (
    <div className={`${width}`}>
      <div className="relative w-full pb-[100%]">
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full absolute top-0 left-0 rounded-full"
        />
      </div>
    </div>
  );
}

function GithubId({ content, textSize, smTextSize, textColor }: GithubIdProps) {
  return (
    <p
      className={`${textColor}  ${textSize} ${smTextSize} font-medium leading-_normal break-all`}
    >
      {content}
    </p>
  );
}

function NickName({ content, textSize, smTextSize, textColor }: NickNameProps) {
  return (
    <p
      className={`${textColor}  ${textSize} ${smTextSize} font-medium leading-_normal break-all`}
    >
      {content}
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
