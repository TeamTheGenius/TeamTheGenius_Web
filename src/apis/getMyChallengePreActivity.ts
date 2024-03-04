import axios from "axios";

const getMyChallengePreActivity = async () => {
  const data = await axios
    .get(`http://localhost:8080/api/challenges/my/pre-activity`, {
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

export default getMyChallengePreActivity;
