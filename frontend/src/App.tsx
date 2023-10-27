import { FormEvent, useState, useEffect } from "react";
import "./App.css";
import { searchRestaurants } from "./services/backend";
import Search from "./components/Search";

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
      <Search
        handleSubmit={handleSubmit}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      <div>
        {businesses
          ? businesses.map((business) => (
              <h2 key={business.id}>{business.name}</h2>
            ))
          : null}
      </div>
    </>
  );
}
