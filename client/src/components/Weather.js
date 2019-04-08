import React from "react";
import thermo from "../components/img/thermo.png";

const Weather = props => (
  <div className="card-div">
    {props.stateItems.map(item => (
      <div className="card-inner" key={Math.random()*2000}>
        <div className="card-graph">
          <p>GRAPH</p>
          <p>GRAPH</p>
          <p>GRAPH</p>
          <p>GRAPH</p>
          <p>GRAPH</p>
        </div>
        <div className="card horizontal orange lighten-4" >
          <div className="card-image">
            <img src={thermo} alt="Weather" className="weather-card-photo card-photo"/>
          </div>
          <div className="card-stacked">
            <span className="card-title">{item.name}</span>
            <div className="card-content">
              <p>Zip Code: {item.zip}</p>
              <p>Current Temp: {item.ct}</p>
              <p>Tomorrow's Avg: {item.tomAvg}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
  
export default Weather;