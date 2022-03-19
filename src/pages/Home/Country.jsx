import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

export const Country = ({ data }) => {
  const [img, setImg] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  // const fetchImage = async () => {
  //   const res = await fetch(data.flag);
  //   console.log(res);
  //   const imageBlob = await res.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   setImg(imageObjectURL);
  // };

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(data.flag);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
    fetchImage();
  }, [data.flag]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div
      style={{
        color: darkMode ? "white" : "black",
        backgroundColor: darkMode ? "hsl(209, 23%, 22%)" : "white",
      }}
      className='country'
    >
      <Link to={`/detail/?${data.name}`} className='Link'>
        {" "}
        <img src={img} alt='flag' />
      </Link>
      <div className='country-desc-container'>
        <div className='country-desc'>
          <Link to={`/detail/?${data.name}`} className='Link'>
            <h2
              style={{
                color: darkMode ? "white" : "black",
              }}
            >
              {data.name}
            </h2>
          </Link>
          <p>
            Population: <span>{numberWithCommas(data.population)}</span>{" "}
          </p>
          <p>
            Region: <span>{data.region}</span>{" "}
          </p>
          <p>
            Capital: <span>{data.capital}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
