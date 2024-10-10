
# Cryptocurrency Data Fetcher

This project fetches and stores cryptocurrency data (Bitcoin, Ethereum, Matic Network) using the CoinGecko API. It includes a backend server built with Node.js, Express, and MongoDB for data persistence, as well as scheduling functionality for periodic data fetching.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches cryptocurrency data every 5 minutes.
- Stores the data in a MongoDB database.
- Provides an API endpoint to retrieve the latest cryptocurrency statistics.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Axios**: Promise-based HTTP client for making API requests.
- **Node-Cron**: Cron-like job scheduler for Node.js.
- **CoinGecko API**: Provides cryptocurrency market data.

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (either locally or a cloud instance like MongoDB Atlas)
- An API key from CoinGecko 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-data-fetcher.git
   cd crypto-data-fetcher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string and CoinGecko API key:
   ```env
   MONGODB_URI=mongodb://<username>:<password>@<your-cluster-url>/crypto
   COINGECKO_API_KEY=your_coin_gecko_api_key
   PORT=5000
   ```

## API Endpoints

### Get Cryptocurrency Stats

- **URL**: `/api/stats`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: The cryptocurrency to fetch stats for (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Example Request

```bash
GET http://localhost:5000/api/stats?coin=bitcoin
```

#### Example Response

```json
{
  "price": 59086,
  "marketCap": 1166634620874.9685,
  "24hChange": -3.5065846508613454
}
```
### Get Cryptocurrency Deviation

- **URL**: `/api/deviation`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: The cryptocurrency to fetch stats for (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Example Request

```bash
GET http://localhost:5000/api/deviation?coin=ethereum
```

#### Example Response

```json
{
  "deviation": 400
}
```

### Fetch Data Periodically

The application automatically fetches and stores cryptocurrency data every 2 hours using a scheduled job.

## Usage

1. Start the server:
   ```bash
   node index.js
   ```


2. Make a request to the API to fetch cryptocurrency stats.


