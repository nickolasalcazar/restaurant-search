require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const http = require("https");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const CLIENT_ID = process.env.YELP_CLIENT_ID;
const API_KEY = process.env.YELP_API_KEY;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const LOCATION = encodeURIComponent("San Francisco, California");

// https://docs.developer.yelp.com/reference/v3_business_search
const options = {
  method: "GET",
  hostname: "api.yelp.com",
  port: null,
  path: `/v3/businesses/search?location=${LOCATION}sort_by=best_match&limit=20`,
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_KEY,
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    // console.log(body.toString());
    JSON.parse(body).businesses.forEach((business) =>
      console.log(business.name)
    );
  });
});

req.end();
