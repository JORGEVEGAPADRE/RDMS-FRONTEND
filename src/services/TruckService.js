import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8080/api/trucks";

export const listTrucks = () => axios.get(REST_API_BASE_URL);
export const listDestinations = () => axios.get(REST_API_BASE_URL);

export const createTruck = (truck) => axios.post(REST_API_BASE_URL, truck);

export const getTruck = (truckId) =>
  axios.get(REST_API_BASE_URL + "/" + truckId);

export const updateTruck = (truckId, truck) =>
  axios.put(REST_API_BASE_URL + "/" + truckId, truck);

export const deleteTruck = (truckId) =>
  axios.delete(REST_API_BASE_URL + "/" + truckId);
