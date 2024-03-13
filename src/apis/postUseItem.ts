import axios from "axios";

interface Params {
  instanceId: number;
  itemId: number;
}

const postUseItem = async ({ instanceId, itemId }: Params) => {
  return axios
    .post(`http://localhost:8080/api/items/use/${itemId}`, " ", {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
      params: {
        instanceId,
      },
    })
    .then((res) => {
      console.log("아이템 사용 성공", res);
    })
    .catch((err) => {
      console.log("아이템 사용 실패", err);
      throw err; // 호출자에서 잡을 수 있도록 에러를 다시 던집니다.
    });
};

export default postUseItem;
