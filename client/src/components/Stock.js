import React from "react";
import stock from "../components/img/stock.png";
import { Line } from "react-chartjs-2";

const Stock = props => (
  <div className="card-div">
    {props.stateItems.map(item => (
      <div className="card-inner" key={Math.random() * 2000}>
        <div className="card horizontal light-blue lighten-5">
          <div className="card-image">
            <img
              src={stock}
              alt="Stock Market"
              className="stock-card-photo card-photo"
            />
          </div>
          <div className="card-stacked">
            <span className="card-title">{item.name}</span>
            <span className="card-sub-title">{item.symbol}</span>
            <div className="card-content">
              <ul className="yesterday">
                <li>
                  <span className="bold-text">Date:</span>
                  <span>{item.lastMarketDate}</span>
                </li>
                <li>
                  <span className="bold-text">Close:</span>
                  <span className="yc">${item.yc}</span>
                </li>
                <li>
                  <span className="bold-text">High:</span>
                  <span className="yh">${item.yh}</span>
                </li>
                <li>
                  <span className="bold-text">Low:</span>
                  <span className="yl">${item.yl}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-graph">
          <Line
            data={item.chartData}
            options={{
              legend: {
                position: "bottom"
              },
              animation: false
              // animation: {
              //   duration: 0
              // },
              // hover: {
              //   animationDuration: 0
              // },
              // responsiveAnimationDuration: 0,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default Stock;
