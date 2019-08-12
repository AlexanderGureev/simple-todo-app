import axios from "axios";

axios.defaults.withCredentials = true;

const API_VERSION = "v1";
const API_HOST_LOCAL = "http://localhost:8080";
const API_HOST = "https://api-hapi-todo.herokuapp.com";

const API_BASE_URL_LOCAL = `${API_HOST_LOCAL}/${API_VERSION}`;
const API_BASE_URL = `${API_HOST}/${API_VERSION}`;

export const API_URL =
  process.env.NODE_ENV === "production" ? API_BASE_URL : API_BASE_URL_LOCAL;
export const API_PUBLIC_URL =
  process.env.NODE_ENV === "production" ? API_HOST : API_HOST_LOCAL;

const API_LOGIN_URL = `${API_URL}/login`;
const API_REGISTER_URL = `${API_URL}/register`;
const API_GET_TODOS = `${API_URL}/todos`;
const API_LOGOUT = `${API_URL}/logout`;
const API_GET_USER_PROFILE = `${API_URL}/users`;
const API_CREATE_TODO = `${API_URL}/todos`;
const API_UPDATE_TODO = `${API_URL}/todos`;
const API_DELETE_TODO_BY_CATEGORY = `${API_URL}/todos`;

const API_GET_TODOS_BY_CATEGORY = `${API_URL}/todos`;
const API_CREATE_CATEGORY = `${API_URL}/categories`;
const API_DELETE_CATEGORY = `${API_URL}/categories`;
const API_UPDATE_CATEGORY = `${API_URL}/categories`;
const API_UPLOAD_FILE = `${API_URL}/files`;
const API_REMOVE_FILE = `${API_URL}/files`;
const API_UPDATE_USER_PROFILE = `${API_URL}/users`;

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

const createCategory = async body => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_CREATE_CATEGORY,
      data: body
    });

    if (status !== 201) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const deleteCategory = async id => {
  try {
    const { data, status } = await axios({
      method: "DELETE",
      url: `${API_DELETE_CATEGORY}/${id}`
    });

    if (![200, 204].includes(status)) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const updateTodo = async (categoryId, todoId, body) => {
  try {
    const { data, status } = await axios({
      method: "PATCH",
      url: `${API_UPDATE_TODO}/${categoryId}/${todoId}`,
      data: body
    });

    if (![200, 204].includes(status)) throw new Error("The request failed");
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

const uploadFile = async formData => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: API_UPLOAD_FILE,
      data: formData
    });
    if (status !== 201) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const removeFile = async fileName => {
  try {
    const { data, status } = await axios({
      method: "DELETE",
      url: `${API_REMOVE_FILE}/${fileName}`
    });
    if (![200, 204].includes(status)) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const updateUserProfile = async (userId, body) => {
  try {
    const { data, status } = await axios({
      method: "PATCH",
      url: `${API_UPDATE_USER_PROFILE}/${userId}`,
      data: body
    });
    if (![200, 204].includes(status)) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const updateCategoryById = async (categoryId, body) => {
  try {
    const { data, status } = await axios({
      method: "PATCH",
      url: `${API_UPDATE_CATEGORY}/${categoryId}`,
      data: body
    });
    if (![200, 204].includes(status)) throw new Error("The request failed");
    return data;
  } catch (error) {
    throw new Error(parseErrors(error));
  }
};

const deleteTodoByCategory = async (categoryId, todoId) => {
  try {
    const { data, status } = await axios({
      method: "DELETE",
      url: `${API_DELETE_TODO_BY_CATEGORY}/${categoryId}/${todoId}`
    });
    if (![200, 204].includes(status)) throw new Error("The request failed");
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
  createTodo,
  updateTodo,
  createCategory,
  deleteCategory,
  uploadFile,
  updateUserProfile,
  removeFile,
  updateCategoryById,
  deleteTodoByCategory,
  API_PUBLIC_URL
};
