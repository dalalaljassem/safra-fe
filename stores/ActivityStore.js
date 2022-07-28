import axios from "axios";
import { makeAutoObservable } from "mobx";

class ActivityStore {
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }
  activities = [];

  fetchActivities = async (city) => {
    try {
      const response = await axios.get(
        `https://www.triposo.com/api/20220705/poi.json?location_id=${city}&count=5&order_by=-score&score=%3E6&account=6JOT340C&token=04whyffcf7xwq41lgmnypez2hiw47gtc`
      );
      this.activities = response.data.results;
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
}
const activityStore = new ActivityStore();

export default activityStore;
