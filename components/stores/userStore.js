// import { makeAutoObservable } from 'mobx';
import { makeObservable, observable, action } from "mobx";

// import { instance } from "../../axios/instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import instance from "../../axios/instance";
class UserStore {
  user = null;
  userIsNew = true;
  users = [];

  constructor() {
    makeObservable(this, {
      user: observable,
    });
  }

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

  // updateUser = async (updatedUser) => {
  //   try {
  //     const formData = new FormData();
  //     for (const key in updatedUser) formData.append(key, updatedUser[key]);
  //     console.log(this.user._id);
  //     const res = await instance.put(`/${this.user._id}`, formData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  usersGet = async () => {
    try {
      const response = await instance.get("/users");
      this.users = response.data;
    } catch (error) {
      console.log("UserStore -> usersGet -> error", error);
    }
  };

  updateUser = async (updatedUser, userId) => {
    try {
      const res = await instance.put(`/${userId}`, updatedUser);
      this.users = this.users.map((user) =>
        user._id === userId ? res.data : user
      );
    } catch (error) {
      console.log(error);
    }
  };

  // addChat = async (list, groupId, Navigation) => {
  //   try {
  //     list.isChecked = false;
  //     const response = await instance.post(`/task/new/${groupId}`, list);
  //     this.tasks.push(response.data);
  //     `socket.emit("frontend", "Add");`
  //     groupStore.fetchGroups();
  //   }
  // }
}

const userStore = new UserStore();
userStore.checkForToken();
userStore.usersGet();
export default userStore;
