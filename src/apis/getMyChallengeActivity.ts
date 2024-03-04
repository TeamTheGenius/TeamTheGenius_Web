import axios from "axios";

const getMyChallengeActivity = async () => {
  const data = await axios
    .get(`http://localhost:8080/api/challenges/my/activity`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log(res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || [];
};

export default getMyChallengeActivity;
