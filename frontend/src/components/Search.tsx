import React, { FormEvent } from "react";

interface SearchParams {
  handleSubmit: CallableFunction;
  queryString: string;
  setQueryString: CallableFunction;
}

export default function Search({
  handleSubmit,
  queryString,
  setQueryString,
}: SearchParams) {
  return (
    <div>
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
      </form>
    </div>
  );
}
