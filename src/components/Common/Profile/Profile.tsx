import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import fireFrame from "@/assets/icon/profile-frame-fire.svg";
import { cls } from "@/utils/mergeTailwind";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";

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

interface IntroduceProps {
  content: string;
}

interface ImageFrameProps {
  frame: "성탄절" | "어둠의힘" | "불태워라";
  frameStyle:
    | "마이페이지_성탄절"
    | "마이페이지_어둠의힘"
    | "마이페이지_불태워라"
    | "인증전체현황_성탄절"
    | "인증전체현황_어둠의힘"
    | "인증전체현황_불태워라"
    | "참가자주간인증현황_성탄절"
    | "참가자주간인증현황_어둠의힘"
    | "참가자주간인증현황_불태워라";
}

function ImageFrame({ frame, frameStyle }: ImageFrameProps) {
  const frameImage = {
    성탄절: christmasFrame,
    어둠의힘: powerOfDarkFrame,
    불태워라: fireFrame,
  };

  const FrameWidth = {
    마이페이지_성탄절: "w-[11.9rem]",
    마이페이지_어둠의힘: "w-[11.9rem]",
    마이페이지_불태워라: "",
    인증전체현황_성탄절: "w-[14.9rem]",
    인증전체현황_어둠의힘: "w-[14.9rem]",
    인증전체현황_불태워라: "",
    참가자주간인증현황_성탄절: "w-[5.6rem]",
    참가자주간인증현황_어둠의힘: "w-[5.6rem]",
    참가자주간인증현황_불태워라: "",
  };

  const framePosition = {
    마이페이지_성탄절: "-top-[0.8rem] right-[0.8rem]",
    마이페이지_어둠의힘: "-top-[0.8rem] right-[0.85rem]",
    마이페이지_불태워라: "",
    인증전체현황_성탄절: "-top-[0.95rem] right-[0.95rem]",
    인증전체현황_어둠의힘: "-top-[0.8rem] right-[0.95rem]",
    인증전체현황_불태워라: "",
    참가자주간인증현황_성탄절: "-top-[2.8rem] right-[0.36rem]",
    참가자주간인증현황_어둠의힘: "-top-[2.8rem] right-[0.4rem]",
    참가자주간인증현황_불태워라: "",
  };

  return (
    <div className={cls("z-10 absolute", FrameWidth[frameStyle])}>
      <img
        src={frameImage[frame]}
        alt="프레임 이미지"
        className={cls(
          "absolute rounded-full object-cover",
          framePosition[frameStyle]
        )}
        width={"100%"}
      />
    </div>
  );
}

function Image({ width, imgSrc, alt }: ImageProps) {
  const onErrorImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = basicProfileImage;
  };
  return (
    <div className={`${width}`}>
      <div className="relative w-full pb-[100%]">
        <img
          src={imgSrc}
          alt={alt}
          onError={onErrorImageLoad}
          className="w-full h-full absolute top-0 left-0 rounded-full object-cover"
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

function Introduce({ content }: IntroduceProps) {
  return <p className="text-[1.4rem] font-medium">{content}</p>;
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
  ImageFrame: ImageFrame,
});
