import circleGradient from "@/assets/icon/circle-gradient.svg";

interface UserCircleMainProps {
  children: React.ReactNode;
}

interface UserCircleImageProps {
  userImage: string;
  children?: React.ReactNode;
}

interface UserCircleNameProps {
  userName: string;
}

function UserCircleWrapper({ children }: UserCircleMainProps) {
  return (
    <div className="flex flex-col gap-[0.5rem] font-pretendard ">
      {children}
    </div>
  );
}

function UserCircleImage({ userImage, children }: UserCircleImageProps) {
  return (
    <div className="relative w-[6.4rem] h-[6.4rem]">
      <img
        src={circleGradient}
        alt="Circle Gradient"
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
      <img
        src={userImage}
        alt="friends in online"
        className="absolute w-[5.6rem] h-[5.6rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  rounded-full bg-orange-300"
      />

      {children}
    </div>
  );
}

function UserCircleLiveTag() {
  return (
    <div
      className="absolute w-[3rem] h-[2rem] top-[77%] left-[50%] translate-x-[-50%] rounded-[0.3rem] border-2 border-[#FEFEFE] flex justify-center items-center"
      style={{
        background:
          "linear-gradient(126deg, #C90083 10.82%, #D22463 29.29%, #E10038 93.41%)",
      }}
    >
      <span className=" text-[#FEFEFE] text-[0.8rem] font-normal leading-_normal tracking-[0.05rem]">
        LIVE
      </span>
    </div>
  );
}

function UserCircleName({ userName }: UserCircleNameProps) {
  return (
    <span className="text-center text-[1.2rem] font-normal leading-_normal">
      {userName}
    </span>
  );
}

export const UserCircle = Object.assign(UserCircleWrapper, {
  UserImage: UserCircleImage,
  UserName: UserCircleName,
  LiveTag: UserCircleLiveTag,
});

export default UserCircle;
