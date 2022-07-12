import { makeAutoObservable } from "mobx";
import instance from "../../axios/instance";
class GroupStore {
  groups = [];

  constructor() {
    makeAutoObservable(this);
  }

  groupGet = async () => {
    try {
      const response = await instance.get("/groups");
      this.groups = response.data;
    } catch (error) {
      console.log("GroupStore -> groupGet -> error", error);
    }
  };

  fetchGroup = async (groupId) => {
    this.groups = this.groups.filter((group) => group._id !== groupId);
    try {
      const response = await axios.get(`/${groupId}`, groupId);
      this.groups = response.data;
      // this.groups.push(response.data);
    } catch (error) {
      console.log("GroupStore -> fetchGroup -> error", error);
    }
  };

  groupUpdate = async (groupId) => {
    this.groups = this.groups.filter((group) => group._id !== groupId);
    try {
      const response = await axios.put(`/${groupId}`, groupId);
      this.groups = response.data;
      this.groups.push(response.data);
    } catch (error) {
      console.log("GroupStore -> groupUpdate -> error", error);
    }
  };

  groupDelete = async (groupId) => {
    try {
      const response = await instance.post("/groups", groupId);
      this.groups = response.data;
    } catch (error) {
      console.log("GroupStore -> groupDelete -> error", error);
    }
  };

  groupCreate = async (groupData) => {
    try {
      const formData = new FormData();
      for (const key in groupData) formData.append(key, groupData[key]);
      const response = await instance.post("/groups", formData);
      // this.groups = response.data;
      this.groups.push(response.data);
    } catch (error) {
      console.log("GroupStore -> groupCreate -> error", error);
    }
  };
}

const groupStore = new GroupStore();
groupStore.groupGet();
export default groupStore;
