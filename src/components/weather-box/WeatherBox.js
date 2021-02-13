import React from "react";
import './weather-box.css';
import {ErrorBoundary} from "../error-boundary/Error-Boundary";

export const WeatherBox = ({weatherData}) => {

    const {name: cityName, sys: {country}, main: {temp: temperature}} = weatherData;
    const weatherDescription = weatherData.weather[0].description

    const getDateToday = (d) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    };

    return typeof weatherData === "object" ? (
        <div>
            <div className="location-box">
                <div className="location">
                    {cityName}, {country}
                </div>
                <div className="date">{getDateToday(new Date())}</div>
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