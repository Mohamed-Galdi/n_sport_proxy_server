// Import necessary libraries/modules
import express from "express"; // Import the Express framework
import axios from "axios"; // Import Axios for making HTTP requests
import cors from "cors"; // Import Cors for handling cross-origin requests
const { v4 } = require("uuid");


// Create an Express app
const app = express();

// Define the port on which the server will run
const port =  3000;

// Use Cors middleware to allow cross-origin requests
app.use(cors());

/////////////////////////////////////////////////////////
app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});
////////////////////////////////////////////////////////

// Define a route for fetching current matchday matches based on a competition
app.get("/api/matches", async (req, res) => {
  const competition = req.query.competition; // Extract the competition query parameter from the request

  try {
    // Make a GET request to the football data API to fetch matches for the specified competition
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/" +
        competition +
        "/matches",
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f", // Add authentication token in the headers
        },
      }
    );

    // Extract the current matchday and all matches from the API response
    const matchDay = response.data.matches[0].season.currentMatchday;
    const allMatches = response.data.matches;

    // Filter out only the matches for the current matchday
    const currentMatchdayMatches = allMatches.filter(
      (match) => match.matchday === matchDay
    );

    // Send the filtered matches as a JSON response
    res.json(currentMatchdayMatches);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

// Define a route for fetching details of a specific match using its ID
app.get("/api/matchDetails", async (req, res) => {
  const id = req.query.id; // Extract the id query parameter from the request

  try {
    // Make a GET request to the football data API to fetch details of the specified match
    const response = await axios.get(
      `https://api.football-data.org/v4/matches/${id}`,
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f", // Add authentication token in the headers
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

// Define a route for fetching standings of a specific competition
app.get("/api/standings", async (req, res) => {
  const competition = req.query.competition; // Extract the competition query parameter from the request
  try {
    // Make a GET request to the football data API to fetch standings of the specific competition
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${competition}/standings`,
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f", // Add authentication token in the headers
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

// Define a route for fetching scorers of a specific competition
app.get("/api/scorers", async (req, res) => {
  const competition = req.query.competition; // Extract the competition query parameter from the request
  try {
    // Make a GET request to the football data API to fetch scorers of the specific competition
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${competition}/scorers`,
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f", // Add authentication token in the headers
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

// Define a route for fetching football news in arabic
app.get("/api/news", async (req, res) => {
  try {
    // Make a GET request to the football data API to fetch scorers of the specific competition
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=football&language=ar&sortBy=publishedAt&apiKey=c9a59498647945f99395443f60d73071`
    );
    res.json(response.data);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Export the Express API
module.exports = app
