import React, { useEffect, useState } from 'react';
import { get100coins } from '../../../functions/get100coins';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './styles.css';

function SelectCoins({
    crypto1,
    crypto2,
    handleCoinChange
}) {
    const [allCoins, setAllCoins] = useState([]);

    const stylesToggle = {
        height: '2.5rem',
        color: 'var(--white)',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--white)',
        },
        '& .MuiSvgIcon-root': {
            color: 'var(--white)',
        },
        '&:hover': {
            '&& fieldset': {
                borderColor: '#3a80e9',
            },
        },
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const myCoins = await get100coins();
        setAllCoins(myCoins);
    }

    return (
        <div className='selection-flex'>
            <p>Crypto-1</p>
            <Select
                sx={stylesToggle}
                value={crypto1}
                label="Crypto-1"
                onChange={(e) => handleCoinChange(e, false)}
            >
                {allCoins.map((coin) => (
                    <MenuItem key={coin.id} value={coin.id}>
                        {coin.name}
                    </MenuItem>
                ))}
            </Select>
            <p>Crypto-2</p>
            <Select
                sx={stylesToggle}
                value={crypto2}
                label="Crypto-2"
                onChange={(e) => handleCoinChange(e, true)}
            >
                {allCoins.map((coin) => (
                    <MenuItem key={coin.id} value={coin.id}>
                        {coin.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

export default SelectCoins;