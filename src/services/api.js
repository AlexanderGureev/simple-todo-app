import axios from "axios";

const API_BASE_URL = "http://localhost:8080/v1";
const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
const API_REGISTER_URL = `${API_BASE_URL}/auth/register`;

const parseErrors = ({ response: { data } }) => {
  let errors = [];
  if (Array.isArray(data)) {
    errors = data.map(({ constraints }) => Object.values(constraints));
  } else {
    errors.push(data.error);
  }
  return errors;
};

export const loginApi = async body => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_LOGIN_URL,
      data: body
    });
    if (status !== 200) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};
export const registerApi = async ({ username, email, password }) => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_REGISTER_URL,
      data: { username, email, password }
    });
    if (status !== 200) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};
