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
      <div className="container mt-3">
        <h1>Restaurant Search</h1>
      </div>
      <Search
        handleSubmit={handleSubmit}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      <div
        className="container my-3"
        style={{
          flexWrap: "wrap",
          gap: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gridGap: 10,
        }}
      >
        {businesses
          ? businesses.map((business) => (
              <div key={business.id}>
                <RestaurantCard business={business} />
              </div>
            ))
          : null}
      </div>
    </>
  );
}
