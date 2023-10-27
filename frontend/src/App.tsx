import { useState, FormEvent } from "react";
import "./App.css";
import { searchRestaurants } from "./services/backend";

export default function App() {
  const [restaurantSearch, setRestaurantSearch] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (restaurantSearch === "") return;

    console.log("Searching for ", restaurantSearch);

    const response = searchRestaurants(restaurantSearch);

    console.log(response);
  };

  return (
    <>
      <h1>Restaurant Search</h1>
      <form
        role="search"
        action="/search"
        method="get"
        onSubmit={(event: FormEvent): void => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="restaurantSearch">Search for Restaurants:</label>
        <input
          type="text"
          id="restaurantSearch"
          name="q"
          aria-label="Search for Restaurants"
          aria-autocomplete="both"
          autoComplete="off"
          placeholder="Type the name of a restaurant"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setRestaurantSearch(e.target.value)
          }
        ></input>
        <button type="submit" value={restaurantSearch}>
          Search
        </button>
      </form>
    </>
  );
}
