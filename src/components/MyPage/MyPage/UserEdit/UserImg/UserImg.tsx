import { Profile } from "@/components/Common/Profile/Profile";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { Form, Upload, message } from "antd";
import userImage from "@/assets/icon/image-edit.svg";
import { useState } from "react";
import React from "react";
import { FRAMEID } from "@/constants/localStorageKey";
import { decrypt } from "@/hooks/useCrypto";
import { MyProfileDataType } from "@/types/profileType";
import { profileImageFrame } from "@/data/frameData";

function UserInfo({
  data,
  setImageUrl,
  imageUrl,
}: {
  data?: MyProfileDataType;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
}) {
  const [imgPreview, setimgPreview] = useState("");
  const frameGet = localStorage.getItem(FRAMEID);
  const frameId = decrypt(frameGet);

  const normFile = (e: any) => {
    setImageUrl(e);
    getBase64(e.file.originFileObj as any, (url) => {
      setimgPreview(url);
    });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Form.Item
        name="fileResponse"
        valuePropName="fileResponse"
        getValueFromEvent={normFile}
      >
        <Upload
          name="fileResponse"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          {imageUrl ? (
            <Profile>
              {frameId && (
                <Profile.ImageFrame
                  frame={profileImageFrame[frameId]}
                  frameStyle={`마이페이지`}
                />
              )}
              <Profile.Image
                imgSrc={imgPreview}
                alt="프로필 이미지"
                width="w-[10.2rem]"
              />
              <img
                src={userImage}
                alt="이미지 수정 아이콘"
                className="absolute right-0 bottom-0 z-50"
              />
            </Profile>
          ) : (
            <Profile>
              {frameId && (
                <Profile.ImageFrame
                  frame={profileImageFrame[frameId]}
                  frameStyle={`마이페이지`}
                />
              )}
              <Profile.Image
                imgSrc={makeBase64IncodedImage({
                  uri: data?.fileResponse.encodedFile,
                  format: "jpg",
                })}
                alt="프로필 이미지"
                width="w-[10.2rem]"
              />
              <img
                src={userImage}
                alt="이미지 수정 아이콘"
                className="absolute right-0 bottom-0 z-50"
              />
            </Profile>
          )}
        </Upload>
      </Form.Item>
    </>
  );
}
export default UserInfo;
