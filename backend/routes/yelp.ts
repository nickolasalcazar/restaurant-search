import https from "https";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

const API_KEY = process.env.YELP_API_KEY;
const router: Router = Router();

router.get("/", (req, res) => {
  res.json("Yelp route");
});

// Example: http://localhost:3000/yelp/search/geo/?name=Oakland
router.get("/search", async (req, res) => {
  const location = req.query["location"] as string;
  console.log(location);
  try {
    res.json(await searchLocations(location));
  } catch (error: any) {
    console.log(error);
    res.sendStatus(error.statusCode);
  }
});

/**
 * Search locations given a location.
 * @param {string} location
 * @returns Promise<any>
 */
function searchLocations(location: string): Promise<any> {
  const encodedLocation = encodeURIComponent(location);
  const options = {
    method: "GET",
    hostname: "api.yelp.com",
    port: null,
    path: `/v3/businesses/search?location=${encodedLocation}&sort_by=best_match&limit=20`,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + API_KEY,
    },
  };

  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      if (res.statusCode !== 200) {
        const message =
          "Request failed: " + res.statusCode + " " + res.statusMessage;
        console.error(message);
        reject({
          message: res.statusMessage,
          statusCode: res.statusCode,
        });
      }

      let chunks: any = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });
    });
  });
}

export default router;
