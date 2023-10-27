import { FormEvent, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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
      <div className="container">
        {businesses
          ? businesses.map((business) => (
              <div key={business.id} className="card" style={{ width: 300 }}>
                <img
                  className="card-img-top"
                  style={{
                    width: 300,
                    height: 200,
                    objectFit: "cover",
                  }}
                  src={business.image_url}
                  role="img"
                  aria-label={"Photo of " + business.name}
                />
                <div className="card-body">
                  <h2>{business.name}</h2>
                  {business.categories.map((category: any, i: number) => (
                    <p className="card-text" key={`${i}-${business.id}`}>
                      {category.title}
                    </p>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
