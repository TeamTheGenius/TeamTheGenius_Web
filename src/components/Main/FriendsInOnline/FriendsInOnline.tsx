import { useState } from "react";
import UserCircle from "../UserCircle/UserCircle";
import test from "@/assets/image/hero.webp";
import toggleButton from "@/assets/icon/toggle.svg";
import friendsInOnlineData from "./friendsInOnline.json";

function FriendsInOnline() {
  const [isShow, setIsShow] = useState(true);
  const onClick = () => {
    setIsShow(!isShow);
  };
  return (
    <div
      className={`flex items-center mx-[2rem] max-w-[50.2rem] justify-between
      ${isShow && "gap-[2.3rem]"}
  `}
    >
      <UserCircle>
        <UserCircle.UserImage userImage={test} />
        <UserCircle.UserName userName="me" />
      </UserCircle>

      <button
        onClick={onClick}
        className="w-[3rem] h-[3rem] rounded-full flex justify-center items-center flex-shrink-0"
        style={{
          background: "linear-gradient(180deg, #E5EBF0 0%, #E6F0F9 100%)",
        }}
      >
        <img
          src={toggleButton}
          alt="friends-list toggle button"
          className={`${!isShow && "rotate-180"}`}
        />
      </button>

      {isShow && (
        <div className="flex gap-[1.7rem] overflow-scroll scrollbar-hide">
          {friendsInOnlineData.friendsInOnlineData.map((friend, index) => (
            <UserCircle key={`${index} ${friend.name}`}>
              <UserCircle.UserImage userImage={friend.image}>
                <UserCircle.LiveTag />
              </UserCircle.UserImage>
              <UserCircle.UserName userName={friend.name} />
            </UserCircle>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsInOnline;
