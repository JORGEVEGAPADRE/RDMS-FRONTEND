import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/trucks";

export const listTrucks = () => axios.get(REST_API_BASE_URL);

export const createTruck = (truck) => axios.post(REST_API_BASE_URL, truck);
