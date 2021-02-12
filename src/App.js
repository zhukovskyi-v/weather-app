import React, {useEffect, useState} from "react";
import './App.css';
import {SearchForm} from "./components/search-form/Search-form";
import {service} from "./service/weather-service";


function App() {
    const [query, setQuery] = useState();
    const [weather, setWeather] = useState({});
    const changeQuery = (e) => {
        setQuery(e)
    }



    return <main>
        <SearchForm city={changeQuery}/>
    </main>
}

export default App;
