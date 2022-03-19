import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Countries } from "./Countries";
import { ThemeContext } from "../../App";

export const Home = () => {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const getAll = async () => {
    const res = await axios.get("https://restcountries.com/v2/all");
    setDatas(res.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://restcountries.com/v2/name/${search}`);
    setDatas(res.data);
  };

  const regionFilter = async (region) => {
    if (region === "none") {
      getAll();
    } else {
      const res = await axios.get(
        `https://restcountries.com/v2/region/${region}`
      );
      setDatas(res.data);
      console.log(res);
    }
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "hsl(207, 26%, 17%" : "hsl(0, 0%, 98%)",
      }}
      className='home'
    >
      <div className='filter-container'>
        <div
          style={{
            color: darkMode ? "white" : "hsl(0, 0%, 52%)",
            backgroundColor: darkMode ? "hsl(209, 23%, 22%)" : "white",
          }}
          className='search-container'
        >
          <form onSubmit={handleSubmit}>
            <label>
              <i className='fas fa-search'></i>
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSubmit(e);
                }}
                style={{
                  color: darkMode ? "white" : "hsl(0, 0%, 52%)",
                }}
                type='text'
                placeholder='Search for a country...'
              />
            </label>
          </form>
        </div>
        <div
          style={{
            backgroundColor: darkMode ? "hsl(209, 23%, 22%)" : "white",
          }}
          className='select-container'
        >
          <select
            style={{
              color: darkMode ? "white" : "hsl(0, 0%, 52%)",
            }}
            name='regions'
            onChange={(e) => regionFilter(e.target.value)}
          >
            <option value='none'>Filter By Region</option>
            <option value='africa'>Africa</option>
            <option value='americas'>Americas</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
          </select>
        </div>
      </div>
      <Countries data={datas} />
    </div>
  );
};
