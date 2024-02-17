import axios from "axios";

export const ApiServices = {
  async getData(url, token) {
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

  async postData(url, body, token) {
    const response = await axios({
      method: "POST",
      url: `https://avtowatt.uz/api/v1/${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    });
    return response.data;
  },
  async putData(url, body, token) {
    const response = await axios({
      method: "PUT",
      url: `https://avtowatt.uz/api/v1/${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    });
    return response.data;
  },
  async delData(url, token) {
    const response = await axios({
      method: "DELETE",
      url: `https://avtowatt.uz/api/v1/${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
