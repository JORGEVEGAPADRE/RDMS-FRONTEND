import axios from "axios";

export const REST_API_BASE_URL_DESTINATIONS =
  "http://localhost:8080/api/destinations";

export const listDestinations = () => axios.get(REST_API_BASE_URL_DESTINATIONS);

export const createDestination = (destination) =>
  axios.post(REST_API_BASE_URL_DESTINATIONS, destination);

export const getDestination = (destinationId) =>
  axios.get(REST_API_BASE_URL_DESTINATIONS + "/" + destinationId);

export const updateDestination = (destinationId, destination) =>
  axios.put(REST_API_BASE_URL_DESTINATIONS + "/" + destinationId, destination);

export const deleteDestination = (destinationId) =>
  axios.delete(REST_API_BASE_URL_DESTINATIONS + "/" + destinationId);
