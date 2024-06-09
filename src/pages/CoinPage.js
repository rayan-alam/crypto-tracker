// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from '../components/Common/Header';
// import Loader from '../components/Common/Loader';
// import { coinObjectHandle } from '../functions/coinObjectHandle';
// import List from '../components/Dashboard/List';
// import CoinInfo from '../components/Coin/CoinInfo';
// import { getCoinData } from '../functions/getCoinData';
// import { getCoinPrices } from '../functions/getCoinPrices';
// import LineChart from '../components/Coin/LineChart';
// // import { convertDate } from '../functions/convertDate';
// import SelectDays from '../components/Coin/SelectDays';
// import { settingChartData } from '../functions/settingChartData';
// import PriceType from '../components/Coin/PriceType';

// function CoinPage(){
//     const { id } = useParams();
//     const [isLoading, setIsLoading] = useState(true);
//     const [coinData, setCoinData] = useState();
//     const [days, setDays] = useState(30);
//     const [chartData, setChartData] = useState({});
//     const [priceType, setPriceType] = useState('price');

//     useEffect(() => {
//         if(id) {
//             getData();
//         }
//     }, [id]);

//     useEffect(() => {
//         async function getData() {
//             if(id) {
//                 const data = await getCoinData(id);
//                 if(data){
//                     coinObjectHandle(setCoinData, data);
//                     const prices = await getCoinPrices(id, days, priceType);
//                     if(Array.isArray(prices) && prices.length > 0){
//                         console.log("Price response passed:");
//                         settingChartData(setChartData, prices);
//                         setIsLoading(false);
//                     }
//                 }
//             }
//         }
//         getData();
//     }, [id, days, priceType]);

//     const handleDaysChange = async (event) => {
//         setIsLoading(true);
//         setDays(event.target.value);
//         const prices = await getCoinPrices(id, event.target.value, priceType);
//             if(Array.isArray(prices) && prices.length > 0){
//                 settingChartData(setChartData, prices);
//                 setIsLoading(false);
//         }
//     };

//     const handlePriceTypeChange = async (event, newType) => {
//         setIsLoading(true);
//         setPriceType(newType);
//         const prices = await getCoinPrices(id, days, newType);
//             if(Array.isArray(prices) && prices.length > 0){
//                 settingChartData(setChartData, prices);
//                 setIsLoading(false);
//         }
//     };

//     return(
//         <div>
//             <Header></Header>
//             {isLoading ? 
//             <Loader></Loader> : 
//             <div>
//                 <div className='grey-wrapper'>
//                     <List coin={coinData}></List>
//                 </div>
//                 <div className='grey-wrapper'>
//                     <SelectDays
//                     days={days}
//                     handleDaysChange = {handleDaysChange}
//                     >
//                     </SelectDays>
//                     <PriceType 
//                     priceType={priceType}
//                     handlePriceTypeChange={handlePriceTypeChange}
//                     ></PriceType>
//                     <LineChart
//                     chartData={chartData}>
//                     </LineChart>
//                 </div>
//                 <CoinInfo
//                 heading={coinData.name}
//                 desc={coinData.desc}
//                 ></CoinInfo>
//             </div>
//             }
//         </div>
//     )
// }

// export default CoinPage;

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import { coinObjectHandle } from '../functions/coinObjectHandle';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import PriceType from '../components/Coin/PriceType';

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState(null);
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState('prices');
  const [error, setError] = useState(null);

  const fetchPricesAndUpdateChart = useCallback(async (coinId, daysValue, priceTypeValue) => {
    setIsLoading(true);
    setError(null);
    try {
      const prices = await getCoinPrices(coinId, daysValue, priceTypeValue);
      console.log("Fetched prices:", prices);
      if (Array.isArray(prices) && prices.length > 0) {
        settingChartData(setChartData, prices);
      } else {
        console.log("in the else block");
        console.error("Invalid prices data:", prices);
        setError("No price data available");
      }
    } catch (err) {
      console.error("Error fetching prices:", err);
      setError("Failed to fetch price data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setError(null);
      if (id) {
        try {
          const data = await getCoinData(id);
          console.log("Coin data:", data);
          if (data) {
            coinObjectHandle(setCoinData, data);
            fetchPricesAndUpdateChart(id, days, priceType);
          } else {
            setError("No coin data available");
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Error fetching coin data:", err);
          setError("Failed to fetch coin data");
          setIsLoading(false);
        }
      }
    }
    getData();
  }, [id, days, priceType, fetchPricesAndUpdateChart]);

  const handleDaysChange = (event) => {
    const newDays = parseInt(event.target.value, 10);
    setDays(newDays);
    fetchPricesAndUpdateChart(id, newDays, priceType);
  };

  const handlePriceTypeChange = (event, newType) => {
    setPriceType(newType);
    fetchPricesAndUpdateChart(id, days, newType);
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <div className='grey-wrapper'>
            <List coin={coinData} />
          </div>
          <div className='grey-wrapper'>
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
            />
            <PriceType 
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} />
          </div>
          {coinData && (
            <CoinInfo
              heading={coinData.name}
              desc={coinData.desc}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CoinPage;