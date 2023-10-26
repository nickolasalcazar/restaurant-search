import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

import yelpRouter from "./routes/yelp";

// Allow requests from all origins (make this more restrictive in production)
app.use(cors());

// import gpt from "./services/gpt";
// gpt.summarize("Hello! Tell me your purpose.");

app.use("/yelp", yelpRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
