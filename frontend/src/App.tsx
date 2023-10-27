import { FormEvent, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { searchRestaurants } from "./services/backend";
import Search from "./components/Search";
import RestaurantCard from "./components/RestaurantCard";

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
      <div className="container">
        {businesses
          ? businesses.map((business) => <RestaurantCard business={business} />)
          : null}
      </div>
    </>
  );
}
