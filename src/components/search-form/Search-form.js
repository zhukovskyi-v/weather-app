import React, {useState} from 'react';
import './search-form.css';

export const SearchForm = ({city}) => {
    const [query, setQuery] = useState('');
    const takeCityName = (e)=>{
        e.preventDefault();
        city(query);
    }
    return <form onSubmit={takeCityName}>
        <div className="search-box">
            <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            <button className='search-button'>
                Search
            </button>
        </div>
    </form>
}
