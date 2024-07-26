import api from "../api";
import { ACCESS_TOKEN } from "../constants"
import { REFRESH_TOKEN } from "../constants"

export const register = async (username, useremail, password) => {
  const route = "/signup/";
  try {
    const response = await api.post(route, 
      { 
        "business_name": username, 
        "business_email": useremail, 
        "password": password 
      });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
