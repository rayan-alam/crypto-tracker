import axios from "axios";

export const getCoinPrices = (id, days, priceTypeValue) => {
    const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
        console.log("getCoinPrices raw data: ", response.data);
        console.log("Requested price type:", priceTypeValue);
        if (response.data) {
          console.log("Prices>>>", response.data);
          if (priceTypeValue === "market_caps") {
            return response.data.market_caps;
          } else if (priceTypeValue === "total_volumes") {
            return response.data.total_volumes;
          } else {
            return response.data.prices;
          }  
        }
      })
    .catch((error) => {
      console.log("Error: ", error);
    });
    return prices;
}