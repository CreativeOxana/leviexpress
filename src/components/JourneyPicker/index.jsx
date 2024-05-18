import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = (props) => {
  return (
    <select
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      <option value="">Vyberte</option>
      {props.cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </select>
  );
};

const DatesOptions = (props) => {
  return (
    <select
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      <option value="">Vyberte</option>
      {props.dates.map((date) => {
        return (
          <option key={date.dateBasic} value={date.dateBasic}>
            {date.dateCs}
          </option>
        );
      })}

      {/* {props.dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))} */}
    </select>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [dates, setDates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      const result = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await result.json();
      setCities(data.results);
    };
    fetchCities();

    const fetchDate = async () => {
      const result = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data = await result.json();
      setDates(data.results);
    };
    fetchDate();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const fetchSubmit = async () => {
      const result = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${selectedDate}`,
      );
      const data = await result.json();
      onJourneyChange(data.results);
    };
    fetchSubmit();
    // console.log(
    //   `Odesílám formulář s cestou: ${fromCity} -> ${toCity} na ${selectedDate}`,
    // );
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <CityOptions
              cities={cities}
              value={fromCity}
              onChange={(value) => setFromCity(value)}
            />
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <CityOptions
              cities={cities}
              value={toCity}
              onChange={(value) => setToCity(value)}
            />
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <DatesOptions
              dates={dates}
              onChange={(value) => setSelectedDate(value)}
            />
          </label>
          <div className="journey-picker__controls">
            <button
              className="btn"
              type="submit"
              disabled={!(fromCity && toCity && selectedDate)}
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
