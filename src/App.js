import React, {useEffect, useState} from "react";
import './App.css';
import {SearchForm} from "./components/search-form/Search-form";
import {service} from "./service/weather-service";
import {ErrorBoundary} from "./components/error-boundary/Error-Boundary";
import {Preloader} from "./components/preloader/Preloader";


function App() {
    const [query, setQuery] = useState();
    const [weather, setWeather] = useState();
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false)

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
                .then((res) => {
                    console.log(res.status)
                    return res.json()
                })
                .then((data) => {
                    try {
                        localStorage.setItem('cityName', data.address.city);
                        setQuery(data.address.city)
                        setLoading(false)
                    } catch (error) {
                        console.log("error in try-catch " + error);
                    }
                });
        }


        function error(err) {
            if (err) {
                if (localStorage.getItem('cityName')) {
                    setQuery(localStorage.getItem('cityName'));
                } else {
                    setQuery('london')
                }
            }
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }


        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

//get weather data here
    useEffect(() => {
        if (query) {
            setLoading(true)
            service(query).then(data => {
                console.log(data);
                //if city not found alert message with
                if (data.cod >= 400) {
                    setQuery('')
                    alert(data.message + '! please write correct city name')
                }
                setWeather(data)
                setQuery('')
                setLoading(false)
            })
        }
    }, [query]);

//checking weather data object for has data
    useEffect(() => {
        if (typeof weather !== "undefined" && weather.cod >= 200 && weather.cod <= 300) {
            setHasError(false)
        } else {
            setHasError(true)
        }
    }, [weather]);

    return <main>
        <SearchForm city={changeQuery}/>
    </main>
}

export default App;
