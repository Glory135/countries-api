import React from "react";
import { Country } from "./Country";

export const Countries = ({ data }) => {
  return (
    <div className='countries'>
      {data ? (
        data.map((item, index) => {
          return <Country key={index} data={item} />;
        })
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};
