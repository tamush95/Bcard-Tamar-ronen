import httpService, { setDefaultCommonHeaders } from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

refreshToken();

export function refreshToken() {
  setDefaultCommonHeaders("x-auth-token", getJWT());
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function login(credentials) {
  const response = await httpService.post("/users/login", credentials);
  setToken(response.data);
  const user = await getUserById();
  return user;
}
export async function getUserById() {
  const response = await httpService.get("/users/" + getUser()._id);
  return response.data;
}
export function getUser() {
  try {
    const token = getJWT();
    console.log(jwtDecode(token));

    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function logout() {
  setToken(null);
}

export function getMe() {
  return httpService.get("/users/me");
}

const usersService = {
  createUser,
  login,
  getUser,
  logout,
  getMe,
  refreshToken,
};

export default usersService;
