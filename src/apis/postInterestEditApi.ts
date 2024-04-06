import { CheckboxValueType } from "antd/es/checkbox/Group";
import requests from "./axios/request";
import { instance } from "./axios/axios";

type postInterestEditApiType = {
  interestEditData: CheckboxValueType[];
};
const postInterestEditApi = async ({
  interestEditData,
}: postInterestEditApiType) => {
  const body = {
    tags: interestEditData,
  };
  await instance
    .post(`${requests.fetchProfileInterest}`, body)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postInterestEditApi;
