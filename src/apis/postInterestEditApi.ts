import { CheckboxValueType } from "antd/es/checkbox/Group";
import requests from "./axios/request";
import { instance } from "./axios/axios";

type postInterestEditApiType = {
  interestEditData: CheckboxValueType[];
  setEditApiBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const postInterestEditApi = async ({
  interestEditData,
  setEditApiBoolean,
  setIsLoading,
}: postInterestEditApiType) => {
  const body = {
    tags: interestEditData,
  };
  await instance
    .post(`${requests.fetchProfileInterest}`, body)
    .then(() => {
      setIsLoading(false);
      setEditApiBoolean(true);
    })
    .catch((err) => {
      setIsLoading(false);
      setEditApiBoolean(false);
      throw err;
    });
};

export default postInterestEditApi;
