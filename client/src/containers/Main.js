// main react imports
import React, { Component } from "react";
// components/utils
import Navbar from "../components/Navbar";
import API from "../utils/API";
import Stock from "../components/Stock";
import Weather from "../components/Weather";

// Main react component
class Main extends Component {
  // main component state
  state = {
    stockErr: false,
    stockLoading: false,
    weatherErr: false,
    weatherLoading: false,
    stocks: [],
    cities: []
  };

  // whent the component mounts to the DOM
  componentDidMount() {
    this.staticStocks();
    this.staticCities();
  }

  // handle input change for state
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // function for stock input
  // adds new stock card to page dynamically
  addStockCard = event => {
    event.preventDefault();
    if (this.state.stockInput) {
      this.setState({ stockLoading: true });
      console.log(`New Stock Card: ${this.state.stockInput}`);
      this.getStocks(this.state.stockInput);
      document.getElementById("stock-input").value = "";
      this.setState({ stockInput: "" });
    } else {
      console.log("👎🏽");
    }
  };

  // get request for stock passed as param
  getStocks = symbol => {
    API.getStocks(symbol)
      .then(res => {
        console.log(res.data);
        let closeData = res.data.data[0].close.split(".")[0];
        let highData = res.data.data[0].high.split(".")[0];
        let lowData = res.data.data[0].low.split(".")[0];
        let lastMarketDate = res.data.data[0].date;
        let lastFiveDates = [
          `${res.data.data[4].date.split("-")[1]} / ${
            res.data.data[4].date.split("-")[2]
          }`,
          `${res.data.data[3].date.split("-")[1]} / ${
            res.data.data[3].date.split("-")[2]
          }`,
          `${res.data.data[2].date.split("-")[1]} / ${
            res.data.data[2].date.split("-")[2]
          }`,
          `${res.data.data[1].date.split("-")[1]} / ${
            res.data.data[1].date.split("-")[2]
          }`,
          `${res.data.data[0].date.split("-")[1]} / ${
            res.data.data[0].date.split("-")[2]
          }`
        ];
        let lastFiveClose = [
          res.data.data[4].close.split(".")[0],
          res.data.data[3].close.split(".")[0],
          res.data.data[2].close.split(".")[0],
          res.data.data[1].close.split(".")[0],
          res.data.data[0].close.split(".")[0]
        ];
        let lastFiveHigh = [
          res.data.data[4].high.split(".")[0],
          res.data.data[3].high.split(".")[0],
          res.data.data[2].high.split(".")[0],
          res.data.data[1].high.split(".")[0],
          res.data.data[0].high.split(".")[0]
        ];
        let lastFiveLow = [
          res.data.data[4].low.split(".")[0],
          res.data.data[3].low.split(".")[0],
          res.data.data[2].low.split(".")[0],
          res.data.data[1].low.split(".")[0],
          res.data.data[0].low.split(".")[0]
        ];
        this.setState({
          stocks: [
            ...this.state.stocks,
            {
              name: res.data.name.toUpperCase(),
              symbol: res.data.symbol.toUpperCase(),
              yc: closeData || "--",
              yh: highData || "--",
              yl: lowData || "--",
              lastMarketDate: lastMarketDate,
              chartData: {
                labels: [...lastFiveDates],
                datasets: [
                  {
                    // label: res.data.data[res.data.data.length-1].date.split('-')[0],
                    label: "CLOSE",
                    backgroundColor: "rgba(0, 0, 0, .1)",
                    borderColor: "rgb(35, 123, 12)",
                    data: [...lastFiveClose]
                  },
                  {
                    label: "HIGH",
                    backgroundColor: "rgba(0, 0, 0, .1)",
                    borderColor: "rgb(255, 0, 40)",
                    data: [...lastFiveHigh]
                  },
                  {
                    label: "LOW",
                    // backgroundColor: 'rgba(255, 255, 255, 0)',
                    backgroundColor: "rgba(0, 0, 0, .1)",
                    borderColor: "rgb(12, 63, 214)",
                    data: [...lastFiveLow]
                  }
                ]
              }
            }
          ],
          stockLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ stockErr: true, stockLoading: false });
        setTimeout(() => {
          this.setState({ stockErr: false });
        }, 2000);
      });
  };

  // add three stock cards on page load
  staticStocks = () => {
    this.getStocks("dow");
    this.getStocks("sp_500");
    this.getStocks("nasdaq");
  };

  // add weather card to DOM
  addWeatherCard = event => {
    event.preventDefault();
    if (this.state.weatherInput.length > 4) {
      this.setState({ weatherLoading: true });
      console.log(`New Weather Card ${this.state.weatherInput}`);
      this.getWeather(this.state.weatherInput);
      document.getElementById("weather-input").value = "";
      this.setState({ weatherInput: "" });
    } else {
      console.log("👎🏽");
      document.getElementById("weather-input").value = "";
      this.setState({ weatherInput: "" });
      this.setState({ weatherErr: true, weatherLoading: false });
      setTimeout(() => {
        this.setState({ weatherErr: false });
      }, 2000);
    }
  };

  // get request for city based on zip code passed as param
  getWeather = zip => {
    API.getWeather(zip)
      .then(res => {
        console.log(res.data.results[0]);
        let city = res.data.results[0].address_components[1].long_name;
        let state = res.data.results[0].address_components[3].short_name;
        this.setState({
          cities: [
            ...this.state.cities,
            {
              name: `${city.toUpperCase()}, ${state.toUpperCase()}`,
              zip: zip,
              ct: this.state.cities.length,
              tomAvg: this.state.cities.length
            }
          ],
          weatherLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ weatherErr: true, weatherLoading: false });
        setTimeout(() => {
          this.setState({ weatherErr: false });
        }, 2000);
      });
  };

  // add three weather cards on page load
  staticCities = () => {
    this.getWeather("07724");
    this.getWeather("07740");
    this.getWeather("07715");
  };

  // render method for Main
  render() {
    return (
      <div>
        <Navbar />
        <div className="main-container">
          <div className="sub-container stock-div">
            <div className="form-container">
              <h3 className="sub-header-text sub-header stock-header">
                Market Watch
              </h3>
              <form
                className="sub-form stock-form"
                onSubmit={this.addStockCard}
              >
                <div className="input-field">
                  <p className="input-label" htmlFor="stock-name">
                    Enter a new stock here
                  </p>
                  <input
                    type="text"
                    placeholder="Stock Symbol"
                    id="stock-input"
                    name="stockInput"
                    onChange={this.handleInputChange}
                  />
                  {this.state.stockLoading ? (
                    <p className="center-align input-loading">
                      <i className="fas fa-spin fa-hourglass-end" />
                    </p>
                  ) : (
                    <p className="input-error">
                      {this.state.stockErr ? (
                        "Not a valid Stock Symbol"
                      ) : (
                        <br />
                      )}
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className="main-card-div">
              <Stock stateItems={this.state.stocks} />
            </div>
          </div>

          <div className="sub-container weather-div">
            <div className="form-container">
              <h3 className="sub-header-text sub-header weather-header">
                Weather
              </h3>
              <form
                className="sub-form weather-form"
                onSubmit={this.addWeatherCard}
              >
                <div className="input-field">
                  <p className="input-label" htmlFor="weather-name">
                    Enter a new City here
                  </p>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    id="weather-input"
                    name="weatherInput"
                    onChange={this.handleInputChange}
                  />
                  {this.state.weatherLoading ? (
                    <p className="center-align input-loading">
                      <i className="fas fa-spin fa-hourglass-end" />
                    </p>
                  ) : (
                    <p className="input-error">
                      {this.state.weatherErr ? "Not a valid Zip Code" : <br />}
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className="main-card-div weather-cards">
              <Weather stateItems={this.state.cities} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
