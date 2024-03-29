import { CheckboxValueType } from "antd/es/checkbox/Group";
import requests from "./axios/request";
import { instance } from "./axios/axios";

type postInterestEditApiType = {
  interestEditData: CheckboxValueType[];
  openModal: () => void;
  setEditApiBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};
const postInterestEditApi = async ({
  interestEditData,
  openModal,
  setEditApiBoolean,
}: postInterestEditApiType) => {
  const body = {
    tags: interestEditData,
  };
  await instance
    .post(`${requests.fetchProfileInterest}`, body)
    .then(() => {
      setEditApiBoolean(true);
      openModal();
    })
    .catch((err) => {
      setEditApiBoolean(false);
      throw err;
    });
};

export default postInterestEditApi;
