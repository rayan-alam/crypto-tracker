import React from 'react';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import './styles.css';
import { Link } from 'react-router-dom';

function Grid({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
    <div className={`grid-container ${coin.price_change_percentage_24h < 0 ? 'hover-red' : ''}`}>
      <div className="info-flex">
        <img src={coin.image} className="coin-logo" alt={`${coin.name} logo`} />
        <div className="coin-col">
          <p className="coin-symbol">{coin.symbol}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </div>
      <div className="chip-flex">
        <div className={`price-chip ${coin.price_change_percentage_24h < 0 ? 'chip-red' : ''}`}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
        <div className={`trend-chip ${coin.price_change_percentage_24h < 0 ? 'chip-red' : ''}`}>
          {coin.price_change_percentage_24h > 0 ? (
            <TrendingUpRoundedIcon />
          ) : (
            <TrendingDownRoundedIcon />
          )}
        </div>
      </div>
      <div className="price-container">
        <h3 className={`coin-price ${coin.price_change_percentage_24h < 0 ? 'price-red' : ''}`}>
          ${coin.current_price.toLocaleString()}
        </h3>
      </div>
      <p className="total-volume">
        Total Volume: {coin.total_volume.toLocaleString()}
      </p>
      <p className="market-cap">
        Market Cap: {coin.market_cap.toLocaleString()}
      </p>
    </div>
    </Link>
  );
}

export default Grid;
