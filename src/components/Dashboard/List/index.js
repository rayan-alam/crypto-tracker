import React from 'react'
import './styles.css';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Toolbar, Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';


function List({ coin }){
    return(
        <Link to={`/coin/${coin.id}`}>
            <tr className='list-row'>
            <td className='td-image'>
                <img src={coin.image} className='coin-logo'/>
            </td>
            <td className='coin-info'>
                <div className='coin-col'>
                    <p className='coin-symbol td-p'>{coin.symbol}</p>
                    <p className='coin-name td-p'>{coin.name}</p>
                </div>
            </td>
            {coin.price_change_percentage_24h > 0 ? (
            <td className='chip-flex'>
                <div className='price-chip'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='trend-chip td-icon'>
                    <TrendingUpRoundedIcon></TrendingUpRoundedIcon>
                </div>
            </td>
            ) : (
            <td className='chip-flex'>
                <div className='price-chip chip-red'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='trend-chip chip-red td-icon'>
                    <TrendingDownRoundedIcon></TrendingDownRoundedIcon>
                </div>
            </td>
            )}
            {coin.price_change_percentage_24h > 0 ? (
                <Tooltip title='Current Price'>
                    <td className='price-container td-center-align'>
                        <h3 className='coin-price'>
                            ${coin.current_price.toLocaleString()}
                        </h3>
                    </td>
                </Tooltip>
            ) : (
                <Tooltip title='Current Price'>
                    <td className='price-container td-center-align'>
                        <h3 className='coin-price price-red'>
                            ${coin.current_price.toLocaleString()}
                        </h3>
                    </td>
                </Tooltip>
            )}
            <Tooltip title='Total Volume'>
                <td>
                    <p className='total-volume td-right-align td-total-volume'>
                        ${coin.total_volume.toLocaleString()}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title='Market Cap'>
                <td className='desktop-td-mkt'>
                    <p className='market-cap td-right-align'>
                        ${coin.market_cap.toLocaleString()}
                    </p>
                </td> 
            </Tooltip>
            <Tooltip title='Market Cap'>
                <td className='mobile-td-mkt'>
                    <p className='market-cap td-right-align'>
                        ${convertNumber(coin.market_cap)}
                    </p>
                </td> 
            </Tooltip>
            </tr>
        </Link>
    )
}

export default List;