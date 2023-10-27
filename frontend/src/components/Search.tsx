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
    <form
      className="container"
      role="search"
      action="/search"
      method="get"
      onSubmit={(event: FormEvent): void => {
        handleSubmit(event);
      }}
    >
      <label className="form-label mb-3" htmlFor="restaurantSearch">
        Search for Restaurants:
      </label>
      <input
        className="form-control mb-3"
        style={{
          maxWidth: 500,
        }}
        type="text"
        id="restaurantSearch"
        aria-label="Search for restaurants"
        aria-autocomplete="both"
        autoComplete="off"
        placeholder="Search for restaurant"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setQueryString(e.target.value)
        }
      ></input>
      <button type="submit" value={queryString} className="btn btn-primary">
        Search
      </button>
    </form>
  );
}
