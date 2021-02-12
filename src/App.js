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
//get city name here
    useEffect(() => {
        async function success(pos) {
            const crd = await pos.coords;
            await fetch(
                `https://us1.locationiq.com/v1/reverse.php?key=pk.d66be8129b4a1a1a69dd5fc5d9f99019&lat=${crd.latitude.toString()}&lon=${crd.longitude.toString()}&format=json`
            )
                .then((res) => res.json())
                .then((data) => {
                    try {
                        setQuery(data.address.city)
                    } catch (error) {
                        console.log("error in try-catch " + error);
                    }
                });
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }


        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

//get weather data here
    useEffect(() => {
        if (query) {

            service(query).then(data => {
                console.log(data);
                //if city not found alert message with
                if (data.cod >= 400) {
                    setQuery('')
                    alert(data.message + '! please write correct city name')
                }
                setWeather(data)
                setQuery('')
            })
        }
    }, [query]);


    return <main>
        <SearchForm city={changeQuery}/>
    </main>
}

export default App;
