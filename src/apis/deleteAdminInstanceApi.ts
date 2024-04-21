import requests from "./axios/request";
import { instance } from "./axios/axios";
import { QueryClient } from "react-query";
import { QUERY_KEY } from "@/constants/queryKey";

type topicDeleteType = {
  instanceId: number;
  queryClient: QueryClient;
};
const deleteAdminInstanceApi = async ({
  instanceId,
  queryClient,
}: topicDeleteType) => {
  await instance
    .delete(`${requests.fetchInstance}/${instanceId}`)
    .then(() => {
      queryClient.invalidateQueries(QUERY_KEY.ADMIN_INSTANCE_PAGE);
    })
    .catch((err) => {
      throw err;
    });
};

export default deleteAdminInstanceApi;
