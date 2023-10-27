import { fetchGetRequest } from "../utils/fetch.util";

export async function searchRestaurants(query: string) {
  const url: string = `http://localhost:3000/yelp/search/?location=${query}`;
  const response = await fetchGetRequest(url);
  if (response === null) console.log("An error orccurred");
  return response;
}
