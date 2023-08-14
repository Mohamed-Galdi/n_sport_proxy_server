# n-sport Express API

The n-sport Express API serves as a proxy server between the Football Data API and the React app "n-sport". It provides a secure way to fetch football-related data from the Football Data API while keeping sensitive API keys hidden.

## Why Use a Proxy Server?

The primary reason for using this Express API as a proxy server between the Football Data API and the React app "n-sport" is to bypass the CORS (Cross-Origin Resource Sharing) restrictions. 

CORS is a browser security feature that restricts web pages from making requests to a different domain than the one that served the web page. Since the Football Data API likely resides on a different domain, direct API calls from the React app would trigger CORS errors, preventing the app from accessing the data.

By using this proxy server, the React app makes requests to the same domain, which then forwards the requests to the Football Data API. The server adds the necessary CORS headers, allowing the React app to receive the data without CORS issues. This setup ensures a seamless data-fetching experience while maintaining security and adhering to CORS policies.


## Features

- Fetches data from the Football Data API on behalf of the React app "n-sport".
- Handles cross-origin requests with CORS middleware.
- Provides endpoints for fetching matchday matches, match details, standings, scorers, and football news in Arabic.

## Prerequisites

Before running the API, make sure you have the following:

- Node.js (https://nodejs.org/) installed.
- API keys for the Football Data API and the News API.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/n-sport-express-api.git
cd n-sport-express-api
```
2. Install dependencies:

```bash
npm install
```
3. Create a `.env` file in the root directory and add your API keys:

```bash
FOOTBALL_API_URL=https://api.football-data.org/v4
FOOTBALL_API_KEY=your_football_api_key_here
NEWS_API_URL=https://newsapi.org/v2
NEWS_API_KEY=your_news_api_key_here
PORT=8080
```
4. Start the server:
```bash
npm start
```

## Usage

The API endpoints are designed to be consumed by the React app "n-sport". Update the app's API calls to target the appropriate routes on this proxy server.

## Deployment

This Express API is deployed on the Cyclic Free Tier. It acts as a bridge between the Football Data API and the React app "n-sport", providing secure access to football-related data.

## Acknowledgments

- Special thanks to the Football Data API (https://www.football-data.org/) for providing the football-related data.
