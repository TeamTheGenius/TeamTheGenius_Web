import { Profile } from "@/components/Common/Profile/Profile";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { Form, Upload, message } from "antd";
import userImage from "@/assets/icon/image-edit.svg";
import { Data } from "@/types/myProfileData";
import { useState } from "react";
import React from "react";

function UserInfo({
  data,
  setImageUrl,
  imageUrl,
}: {
  data?: Data;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
}) {
  const [imgPreview, setimgPreview] = useState("");
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
              <Profile.Image
                imgSrc={imgPreview}
                alt="프로필 이미지"
                width="w-[10.2rem]"
              />
              <img
                src={userImage}
                alt="이미지 수정 아이콘"
                className="absolute right-0 bottom-0"
              />
            </Profile>
          ) : (
            <Profile>
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
                className="absolute right-0 bottom-0"
              />
            </Profile>
          )}
        </Upload>
      </Form.Item>
    </>
  );
}
export default UserInfo;
