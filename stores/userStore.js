import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;
  // users = [];
  userIsNew = true;

  setUser = async (token) => {
    await AsyncStorage.setItem("myToken", JSON.stringify(token));
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  setUserAsOld = async (state) => {
    this.userIsNew = state;
  };

  checkForToken = async () => {
    let token = null;
    const jsonValue = await AsyncStorage.getItem("myToken");
    if (jsonValue !== null) token = JSON.parse(jsonValue);

    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.logout();
      }
    }
  };

  register = async (newUser) => {
    try {
      const response = await instance.post("/signup", newUser);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Username is Already Taken 😂😂😂😂😂😂",
      });
    }
  };

  login = async (userData) => {
    try {
      const response = await instance.post("/login", userData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Username or Password are Incorrect",
      });
    }
  };

  logout = () => {
    // console.log('user trips ---->' + JSON.stringify(this.user.trips));
    this.user = null;
    this.userIsNew = true;
    AsyncStorage.removeItem("myToken");

    delete instance.defaults.headers.common.Authorization;
  };

  userGet = async () => {
    try {
      const response = await instance.get("/users");
      this.users = response.data;

      // console.log(
      //   "🚀 ~ file: userStore.js ~ line 81 ~ UserStore ~ userGet= ~ this.users",
      //   this.users
      // );
    } catch (error) {
      console.log("GroupStore -> groupGet -> error", error);
    }
  };

  updateUser = async (updatedUser) => {
    try {
      const formData = new FormData();
      for (const key in updatedUser) formData.append(key, updatedUser[key]);
      console.log(this.user.id);
      const res = await instance.put(`/${this.user.id}`, formData);
    } catch (error) {
      console.log(error);
    }
  };
}

const userStore = new UserStore();
userStore.checkForToken();
// userStore.userGet();
export default userStore;
