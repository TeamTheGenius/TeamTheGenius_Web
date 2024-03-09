import axios from "axios";

const getInterestTags = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/profile/interest`,
      {
        withCredentials: true,
      }
    );
    console.log("tags", response.data.data.tags);
    return response.data.data.tags || {};
  } catch (error) {
    console.log("관심사 조회 err", error);
    return {};
  }
};

export default getInterestTags;
