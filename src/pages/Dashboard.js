import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/TabsComponent';
// import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/PaginationComponent';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100coins } from '../functions/get100coins';

const DashboardPage = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onSearchChange = (e) => {
      console.log(e.target.value);
      setSearch(e.target.value);
    };

    var filteredCoins = coins.filter(
      (coin) => 
      coin.name.toLowerCase().includes(search.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const handlePageChange = (event, value) => {
      setPage(value);
      var previousIndex = (value-1) * 10;
      setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    }

    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      const myCoins = await get100coins();
      if(myCoins){
        setCoins(myCoins);
        setPaginatedCoins(myCoins.slice(0,10));
        setIsLoading(false);
      } else {
        console.log("error fetching data from get100coins func");
      }
    }

  return (
    <div>
      <Header></Header>
      <BackToTop></BackToTop>
      <>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div>
            <Search
            search = {search}
            onSearchChange={onSearchChange}>
            </Search>
            <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            >
            </TabsComponent>
            {!search && (
              <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
              ></PaginationComponent>
            )}
          </div>
        )}
      </>
    </div>
  )
};

export default DashboardPage;