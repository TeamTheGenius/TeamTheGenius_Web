import axios from "axios";

const getMyPageProfile = async () => {
  const data = await axios
    .get(`http://localhost:8080/api/profile`, {
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

export default getMyPageProfile;
