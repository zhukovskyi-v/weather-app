import React from "react";
import './weather-box.css';
import {ErrorBoundary} from "../error-boundary/Error-Boundary";

export const WeatherBox = ({weatherData}) => {

    const {name: cityName, sys: {country}, main: {temp: temperature}} = weatherData;
    const weatherDescription = weatherData.weather[0].description


    return typeof weatherData != "undefined" ? (
        <div>
            <div className="location-box">
                <div className="location">
                    {cityName}, {country}
                </div>
                <div className="date">{'(new Date())'}</div>
            </div>
            <div className="weather-box">
                <div className="temp">{Math.round(temperature)}°c</div>
                <div className="weather">{weatherDescription}</div>
            </div>
        </div>
    ) : (
        <ErrorBoundary/>
    )
}