import { useState, FormEvent, useEffect } from "react";
import "./App.css";
import { searchRestaurants } from "./services/backend";

export default function App() {
  const [queryString, setQueryString] = useState("");
  const [businesses, setBusinesses] = useState<any[] | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (queryString === "") return;
    const response = await searchRestaurants(queryString);
    setBusinesses(response.businesses);

    console.log(response);
  };

  useEffect(() => {}, [businesses]);

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
            setQueryString(e.target.value)
          }
        ></input>
        <button type="submit" value={queryString}>
          Search
        </button>
        <div>
          {businesses
            ? businesses.map((business) => (
                <h2 key={business.id}>{business.name}</h2>
              ))
            : null}
        </div>
      </form>
    </>
  );
}
