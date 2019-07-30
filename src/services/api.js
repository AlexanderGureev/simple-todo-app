import axios from "axios";

axios.defaults.withCredentials = true;

const API_VERSION = "v1";
const API_BASE_URL_LOCAL = `http://localhost:8080/${API_VERSION}`;
const API_BASE_URL = `https://api-hapi-todo.herokuapp.com/${API_VERSION}`;

const API_URL =
  process.env.NODE_ENV === "production" ? API_BASE_URL : API_BASE_URL_LOCAL;

const API_LOGIN_URL = `${API_URL}/login`;
const API_REGISTER_URL = `${API_URL}/register`;
const API_GET_TODOS = `${API_URL}/todos`;
const API_LOGOUT = `${API_URL}/logout`;
const API_GET_USER_PROFILE = `${API_URL}/user`;
const API_CREATE_TODO = `${API_URL}/todos`;
const API_GET_TODOS_BY_CATEGORY = `${API_URL}/todos`;

const parseErrors = ({ response: { data } }) => {
  let errors = [];
  if (Array.isArray(data)) {
    errors = data.map(({ constraints }) => Object.values(constraints));
  } else {
    errors.push(data.message);
  }

  return errors;
};

const getTodos = async params => {
  try {
    const { data, status } = await axios({
      method: "GET",
      url: API_GET_TODOS,
      params
    });

    if (status !== 200) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const createTodo = async body => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_CREATE_TODO,
      data: body
    });

    if (status !== 201) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const authUser = async body => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_LOGIN_URL,
      data: body
    });
    if (status !== 201) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const registerUser = async body => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_REGISTER_URL,
      data: body
    });
    if (status !== 201) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const logoutUser = async () => {
  try {
    await axios({
      method: "GET",
      url: API_LOGOUT
    });
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const getUserProfile = async () => {
  try {
    const { data, status } = await axios({
      method: "GET",
      url: API_GET_USER_PROFILE
    });
    if (status !== 201) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const getTodosByCategory = async ({ id, params = {} }) => {
  try {
    const { data, status } = await axios({
      method: "GET",
      url: `${API_GET_TODOS_BY_CATEGORY}/${id}`,
      params
    });
    if (status !== 200) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

export default {
  authUser,
  registerUser,
  getTodos,
  getTodosByCategory,
  logoutUser,
  getUserProfile,
  createTodo
};
