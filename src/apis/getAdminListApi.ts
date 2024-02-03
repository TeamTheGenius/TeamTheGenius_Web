import axios from "axios";

const getAdminListApi = () => {
  axios
    .get(`http://localhost:8080/admin/topic`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getAdminListApi;
