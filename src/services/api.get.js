import axios from "axios";
const token = localStorage.getItem("token");

export const ApiServices = {
  async getData(url) {
    const response = await axios({
      method: "get",
      url: `https://avtowatt.uz/api/v1/${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async postData(url,body) {
      const response = await axios({
        method: "post",
        url: `https://avtowatt.uz/api/v1/${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
      });
      return response.data;
  },
};
