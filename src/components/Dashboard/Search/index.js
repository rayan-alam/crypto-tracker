import React, { useState } from 'react';
import './styles.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Search({ search, onSearchChange }) {
    // const [search, setSearch] = useState("");

    return (
        <div className="search-flex">
            <SearchRoundedIcon />
            <input
                className='search-input'
                placeholder="Search"
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e)}
            />
        </div>
    );
}

export default Search;