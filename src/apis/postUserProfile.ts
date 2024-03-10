import axios from "axios";

interface Params {
  userId: number;
}

const postUserProfile = async ({ userId }: Params) => {
  const body = {
    userId,
  };
  const data = await axios
    .post(`http://localhost:8080/api/profile`, body, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default postUserProfile;
