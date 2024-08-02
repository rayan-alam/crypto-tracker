import React, {  useState } from 'react';
import Header from '../components/Common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDays'; 
import List from '../components/Dashboard/List';
import LineChart from '../components/Coin/LineChart';
import CoinInfo from '../components/Coin/CoinInfo';
import PriceType from '../components/Coin/PriceType';
import { coinObjectHandle } from '../functions/coinObjectHandle';
import { getCoinPrices } from '../functions/getCoinPrices';
import { getCoinData } from '../functions/getCoinData';
import { get100coins } from '../functions/get100coins';
import { settingChartData } from '../functions/settingChartData';
import Loader from '../components/Common/Loader';

function Compare() {
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    // id states
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    // data states
    const [coin1Data, setCoin1Data] = useState({});
    const [coin2Data, setCoin2Data] = useState({});
    // days state
    const [days, setDays] = useState(30);
    const [priceType, setPriceType] = useState("prices");
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
    });
  

    const onCoinChange = async (e, isCoin2) => {
      setLoading(true);
      if (isCoin2) {
        const newCrypto2 = e.target.value;
        // crypto2 is being changed
        setCrypto2(newCrypto2);
        // fetch coin2 data
        const data2 = await getCoinData(newCrypto2);
        coinObjectHandle(data2, setCoin2Data);
        // fetch prices again
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(newCrypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2);
      } else {
        const newCrypto1 = e.target.value;
        // crypto1 is being changed
        setCrypto1(newCrypto1);
        // fetch coin1 data
        const data1 = await getCoinData(newCrypto1);
        coinObjectHandle(data1, setCoin1Data);
        // fetch coin prices
        const prices1 = await getCoinPrices(newCrypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2);
      }
      setLoading(false);
    };
  
    const handleDaysChange = async (e) => {
      const newDays = e.target.value;
      setLoading(true);
      setDays(newDays);
      const prices1 = await getCoinPrices(crypto1, newDays, priceType);
      const prices2 = await getCoinPrices(crypto2, newDays, priceType);
      settingChartData(setChartData, prices1, prices2);
      setLoading(false);
    };
  
    const handlePriceTypeChange = async (e) => {
      const newPriceType = e.target.value;
      setLoading(true);
      setPriceType(newPriceType);
      const prices1 = await getCoinPrices(crypto1, days, newPriceType);
      const prices2 = await getCoinPrices(crypto2, days, newPriceType);
      settingChartData(setChartData, prices1, prices2);
      setLoading(false);
    };
  
    return (
      <div>
        <Header />
        {loading || !coin1Data?.id || !coin2Data?.id ? (
          <Loader />
        ) : (
          <>
            <SelectCoins
              allCoins={allCoins}
              crypto1={crypto1}
              crypto2={crypto2}
              onCoinChange={onCoinChange}
              days={days}
              handleDaysChange={handleDaysChange}
            />
            <SelectDays
                days={days}
                handleDaysChange={handleDaysChange}
                noPTag={true}
            />
            <div className="grey-wrapper">
              <List coin={coin1Data} />
            </div>
            <div className="grey-wrapper">
              <List coin={coin2Data} />
            </div>
            <div className="grey-wrapper">
              <PriceType
                priceType={priceType}
                handlePriceTypeChange={handlePriceTypeChange}
              />
              <LineChart chartData={chartData} multiAxis={true} />
            </div>
            <CoinInfo title={coin1Data.name} desc={coin1Data.desc} />
            <CoinInfo title={coin2Data.name} desc={coin2Data.desc} />
          </>
        )}
      </div>
    );
  }
  
  export default Compare;


// function Compare() {
//     const [crypto1, setCrypto1] = useState("Bitcoin");
//     const [crypto2, setCrypto2] = useState("Ethereum");
//     const [days, setDays] = useState(30);
//     const [crypto1Data, setCrypto1Data] = useState({});
//     const [crypto2Data, setCrypto2Data] = useState({});
//     const [isLoading, setIsLoading] = useState(true);

//     function handleDaysChange(event) {
//         setDays(event.target.value);
//     }

//     useEffect(() => {
//         getData();
//     }, []);

//     async function getData() {
//         setIsLoading(true);
//         const data1 = await getCoinData(crypto1);
//         const data2 = await getCoinData(crypto2);
//         if (data1) {
//             coinObjectHandle(setCrypto1Data, data1);
//         }
//         if (data2) {
//             coinObjectHandle(setCrypto2Data, data2);
//         }
//         if (data1 && data2) {
//             const prices1 = await getCoinPrices(crypto1, days, "prices");
//             const prices2 = await getCoinPrices(crypto2, days, "prices");
//             if (Array.isArray(prices1) && prices1.length > 0 && Array.isArray(prices2) && prices2.length > 0) {
//                 // settingChartData(setChartData, prices);
//                 console.log("Both prices are fetched: ", prices1, prices2);
//                 setIsLoading(false);
//             }
//         }
//     }

//     const handleCoinChange = async (event, isCoin2) => {
//         setIsLoading(true);
//         if (isCoin2) {
//             setCrypto2(event.target.value);
//             const data = await getCoinData(event.target.value);
//             if (data) {
//                 coinObjectHandle(setCrypto2Data, data);
//                 const prices = await getCoinPrices(event.target.value, days, "prices");
//                 if (Array.isArray(prices) && prices.length > 0) {
//                     // settingChartData(setChartData, prices);
//                     setIsLoading(false);
//                 }
//             }
//         } else {
//             setCrypto1(event.target.value);
//             const data = await getCoinData(event.target.value);
//             if (data) {
//                 coinObjectHandle(setCrypto1Data, data);
//                 const prices = await getCoinPrices(event.target.value, days, "prices");
//                 if (prices.length > 0) {
//                     setIsLoading(false);
//                 }
//             }
//         }
//     };

//     return (
//         <div>
//             <Header />
//             {isLoading ? (
//                 <Loader />
//             ) :  (
//             <div className='coins-days-flex'>
//                 <SelectCoins 
//                     crypto1={crypto1} 
//                     crypto2={crypto2}
//                     handleCoinChange={handleCoinChange}
//                 />
//                 <SelectDays
//                     days={days}
//                     handleDaysChange={handleDaysChange}
//                     noPTag={true}
//                 />
//             </div>
//             )}
//         </div>
//     );
// }

// export default Compare;
