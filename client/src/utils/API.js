// import axios for client side HTTP requests
import axios from 'axios';

// Alpha Vantage API
// const frontURL1 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
// const APIKEY1 = "419FLOWA167U7KBR";
// const backURL1 = "&apikey=";

// IEX API
// https://api.iextrading.com/1.0/stock/aapl/chart/1d
// const frontURL2 = "https://api.iextrading.com/1.0/stock/";
// const APIKEY2 = "419FLOWA167U7KBR";
// const backURL2 = "/chart/1d";


//UPDATE API using moment to grab data for today and previous 10 days
//UPDATE API to grab last five days
// Hamza API
const stockURL = "https://market.hamzazafar.co/getDataByCount/";
const stockURLend = '?days=10'


// Google Maps API
// Google Maps API KEY - AIzaSyBWGy6JPj5Nnbbi1tW9oTFm4a1xOz3vCM4
const zipURL1 = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const zipURL2 = '&key=AIzaSyBWGy6JPj5Nnbbi1tW9oTFm4a1xOz3vCM4'

// Weather API


export default {
  getStocks: async function(symbol) {
    const res = await axios.get(stockURL + symbol + stockURLend);
    return await res;
  },

  getWeather: async function(zip) {
    const zipData = await axios.get(zipURL1 + zip + zipURL2);
    return await zipData;
  }
};
