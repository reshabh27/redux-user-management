import axios from "axios";

const productionUrl = "http://localhost:3000";

export const customFetch = axios.create({
  baseURL: productionUrl,
});


const firebaseProdctionURL = process.env.REACT_APP_API_URL;

export const customFetchForFirebase = axios.create({
  baseURL:firebaseProdctionURL,
})