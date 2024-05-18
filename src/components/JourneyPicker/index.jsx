import React, { useEffect, useState } from 'react';
import { CityOptions } from '../CityOptions';
import './style.css';

export const JourneyPicker = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await result.json();
      setCities(data.results);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Odesílám formulář s cestou: ${fromCity} -> ${toCity} na ${''}`,
    );
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
            <div value={date} className="journey-picker__label">
              Datum:
            </div>
            <select
              value="date"
              onChange={(event) => setDate(event.target.value)}
            >
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
