import { makeAutoObservable } from "mobx";
import instance from "../../axios/instance";
class GroupStore {
  groups = [];
  UserGroup = [];

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
      const response = await instance.get(`/groups/${groupId}`);
      UserGroup.push(response.data);
      // this.groups = response.data;
      // this.groups.push(response.data);
    } catch (error) {
      console.log("GroupStore -> fetchGroup -> error", error);
    }
  };

  groupUpdate = async (groupId) => {
    this.groups = this.groups.filter((group) => group._id !== groupId);
    try {
      const response = await instance.put(`/${groupId}`, groupId);
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
      // const formData = new FormData();
      // console.log(
      //   "🚀 ~ file: groupStore.js ~ line 61 ~ GroupStore ~ groupCreate= ~ formData",
      //   formData
      // );
      // for (const key in groupData) formData.append(key, groupData[key]);
      const response = await instance.post("/groups", groupData);
      // this.groups = response.data;
      this.groups.push(response.data);
      //userStore.groups.push(response.data)
    } catch (error) {
      console.log("GroupStore -> groupCreate -> error", error);
    }
  };
}

const groupStore = new GroupStore();
groupStore.groupGet();
export default groupStore;
