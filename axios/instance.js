import axios from "axios";
import groupStore from "../components/stores/groupStore";
import userStore from "../components/stores/userStore";

export const baseUrl = "http://localhost:8000";
// export const socket = io(baseUrl);

export const instance = axios.create({
  baseURL: `${baseUrl}`,
});

// socket.on("backend", async function (msg) {
//   await userStore.getUsers();
//   await groupStore.fetchGroup();
//   await authStore.updateUserInfo();
// });

export default instance;
