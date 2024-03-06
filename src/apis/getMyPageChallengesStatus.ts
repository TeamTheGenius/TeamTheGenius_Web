import axios from "axios";

const getMyPageChallengesStatus = async () => {
  const data = await axios
    .get(`http://localhost:8080/api/profile/challenges`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getMyPageChallengesStatus;
