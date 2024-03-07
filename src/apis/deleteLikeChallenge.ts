import axios from "axios";

interface Params {
  likesId: number;
}

const deleteLikeChallenge = async ({ likesId }: Params) => {
  await axios
    .delete(`http://localhost:8080/api/profile/likes/${likesId}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("삭제", res);
    })
    .catch((err) => {
      console.log("삭제 실패", err);
    });
};

export default deleteLikeChallenge;
