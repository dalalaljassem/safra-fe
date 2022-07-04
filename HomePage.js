import { makeAutoObservable } from "mobx";
import instance from "./axios/instance";

class HomePage {
  trips = [];

  constructor() {
    makeAutoObservable(this);
  }

  //   tripGet = async () => {
  //     try {
  //       const response = await instance.get("/trips");
  //       this.trips = response.data;
  //     } catch (error) {
  //       console.log("TripStore -> tripGet -> error", error);
  //     }
  //   };

  //   fetchTrip = async (tripId) => {
  //     this.trips = this.trips.filter((trip) => trip._id !== tripId);
  //     try {
  //       const response = await axios.get(`/${tripId}`, tripId);
  //       this.trips = response.data;
  //       this.trips.push(response.data);
  //     } catch (error) {
  //       console.log("TripStore -> fetchTrip -> error", error);
  //     }
  //   };

  //   tripUpdate = async (tripId) => {
  //     this.trips = this.trips.filter((trip) => trip._id !== tripId);
  //     try {
  //       const response = await axios.put(`/${tripId}`, tripId);
  //       this.trips = response.data;
  //       this.trips.push(response.data);
  //     } catch (error) {
  //       console.log("TripStore -> UpdateTrip -> error", error);
  //     }
  //   };

  //   tripCreate = async (tripData) => {
  //     try {
  //       const response = await instance.post("/trips", tripData);
  //       this.trips = response.data;
  //     } catch (error) {
  //       console.log("TripStore -> tripGet -> error", error);
  //     }
  //   };
}

// const homePage = new HomePage();
// homePage.tripGet();
export default HomePage();
