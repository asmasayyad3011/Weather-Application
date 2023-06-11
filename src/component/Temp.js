// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=1f9e3a06dd07a22393d1d074704e537c
import React, { useState, useEffect} from 'react'
import './style.css'
import WeatherCard from './WeatherCard';

const Temp = () => {
    const [searchValue, setSearchVale] = useState('pune');
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async() => { 
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1f9e3a06dd07a22393d1d074704e537c`;
        const res = await fetch(url);
        const data = await res.json();
        const {temp, humidity, pressure} = data.main;
        const {main: weathermood} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country, sunset}= data.sys;
        const myNewWeather = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
        }
        setTempInfo(myNewWeather);
        console.log('temp', temp);
        console.log('data',data);
        }catch(error){
            console.log('error',error);
        }
    };
    useEffect(() => {   
        getWeatherInfo();
    }, [])
    
  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search" placeholder='search...'
            autoFocus id='search' className='searchTerm' 
            value={searchValue} onChange={(e)=>setSearchVale(e.target.value)} />
            <button type='button' className='searchButton' onClick={getWeatherInfo}>Search</button>
        </div>
    </div>
    <WeatherCard tempInfo ={tempInfo}/>
    </>
  )
}

export default Temp