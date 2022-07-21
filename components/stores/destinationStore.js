import { makeObservable, observable, action } from 'mobx';
import Toast from 'react-native-toast-message';
import userStore from './userStore';
import axios from 'axios';

// let activities = userStore.user.activities;
// activities = activities.map((a) => a.toLowerCase());
let activites = ['swimming', 'diving', 'cycling'];
class DestinationStore {
  destinations = [];
  initialDestinations = [];
  airports = [];
  airportscodes = [];
  constructor() {
    makeObservable(this, {
      destinations: observable,
    });
  }

  getCityAirportCode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://airlabs.co/api/v9/nearby?lat=${lat}&lng=${lng}&distance=60&api_key=ed7531b4-2e5b-414a-8f76-8dcc02c7f0f8`
      );
      this.airports = response.data.response.airports;
      this.airports = this.airports.sort((a, b) =>
        a.popularity < b.popularity ? 1 : -1
      );
      console.log(this.airports[0].iata_code);
      return this.airports[0].iata_code;
    } catch (error) {
      console.log('getDestinationsOfActivities', error);
    }
  };

  getDestinationsOfActivities = async () => {
    try {
      const response = await axios.get(
        `https://www.triposo.com/api/20220705/location.json?tag_labels=city&child_tag_labels=${activities[0]}&child_tag_labels=${activities[1]}&child_tag_labels=${activities[2]}&count=15&fields=name,id,country_id,snippet,parent_id,coordinates&account=6JOT340C&token=04whyffcf7xwq41lgmnypez2hiw47gtc`
      );
      this.initialDestinations = response.data.results;

      this.initialDestinations.forEach(
        (d) =>
          (d.avgScore =
            d[`${activities[0]}_score`] +
            d[`${activities[1]}_score`] +
            d[`${activities[2]}_score`])
      );

      this.initialDestinations.sort((a, b) =>
        a.avgScore < b.avgScore ? 1 : -1
      );

      this.initialDestinations.forEach((d) =>
        setTimeout(() => {
          d.airportCode = this.getCityAirportCode(
            d.coordinates.latitude,
            d.coordinates.longitude
          );
        }, '2000')
      );
      setTimeout(() => {
        this.destinations = this.initialDestinations;
      }, '15000');

      this.destinations = this.initialDestinations;
      setTimeout(() => {
        console.log(
          '======================>' + JSON.stringify(this.destinations)
        );
      }, '15000');
    } catch (error) {
      console.log('getDestinationsOfActivities', error);
    }
  };
}

const destinationStore = new DestinationStore();
export default destinationStore;
