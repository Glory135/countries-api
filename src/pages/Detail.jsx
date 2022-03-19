import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../App";

export const Detail = () => {
  const [data, setData] = useState({
    topLevelDomain: [],
    currencies: [],
    languages: [],
    borders: [],
    population: [],
  });
  const [img, setImg] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const { search } = useLocation();
  const search2 = search.split("?")[1];

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://restcountries.com/v2/name/${search2}`
      );
      setData(...res.data);
    };
    const fetchImage = async () => {
      const res = await fetch(data.flag);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
    getData();
    fetchImage();
  }, [search2, data.flag]);

  const handleClick = async (code) => {
    const res = await axios.get(`https://restcountries.com/v2/alpha/${code}`);
    setData(res.data);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const seperator = (x) => {
    return x.join(", ");
  };

  return (
    <div
      style={{
        color: darkMode ? "white" : "black",
        backgroundColor: darkMode ? "hsl(207, 26%, 17%)" : "transparent",
      }}
      className='detail'
    >
      <div className='back-container'>
        <Link className='Link' to='/'>
          <div
            style={{
              color: darkMode ? "white" : "black",
              backgroundColor: darkMode ? "hsl(209, 23%, 22%)" : "transparent",
            }}
            className='back'
          >
            <i className='fas fa-arrow-left'></i>
            <p>Back</p>
          </div>
        </Link>
      </div>
      <div className='detail-container'>
        <img src={img} alt='flag' />
        <div className='main-details-container'>
          <h2 className='name'>{data.name}</h2>
          <div className='main-details'>
            <p>
              Native Name: <span>{data.nativeName}</span>
            </p>
            <p>
              Populatio: <span>{numberWithCommas(data.population)}</span>
            </p>
            <p>
              Region: <span>{data.region}</span>
            </p>
            <p>
              Sub region: <span>{data.subregion}</span>
            </p>
            <p>
              Capital: <span>{data.capital}</span>
            </p>
            <p>
              Top level domain: <span>{seperator(data.topLevelDomain)}</span>
            </p>
            <p>
              Currencies:{" "}
              <span>{seperator(data.currencies.map((i) => i.name))}</span>
            </p>
            <p>
              Languages:{" "}
              <span>{seperator(data.languages.map((i) => i.name))}</span>
            </p>
          </div>
          <div className='border-cs'>
            <div className='border-cs-container'>
              <h3>Border Countries:</h3>
              <ul>
                {data.borders ? (
                  data.borders.map((i, index) => (
                    <li key={index} onClick={() => handleClick(i)}>
                      {i}
                    </li>
                  ))
                ) : (
                  <li>NONE</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
