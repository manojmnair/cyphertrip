import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rewards from "./Rewards";


class BookTicket extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }

  render() {
    //const id = this.props.match.params.id
    //const journeys = this.props.journeys

    const { match, journeys } = this.props;
    const id = Number(match.params.id);
    const max_co2_emission =
      journeys.journeys.context.car_direct_path.co2_emission.value;
    const journey = journeys.journeys.journeys[id];
const trips = Math.floor((max_co2_emission - journey.co2_emission.value) / 100);
    //console.log(journeys.journeys.journeys)
    //console.log(journey);

    return (
      <div className='banner-content col-lg-12 light middle'>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='card  bord'>
              <div className='nobord'>
                <div className='card-body bord'>
                  <h5 className='card-title'>
                    {journey.departure_date_time.substring(0, 4)}:
                    {journey.departure_date_time.substring(4, 6)}:
                    {journey.departure_date_time.substring(6, 8)}
                  </h5>
                  <h6 className='card-title'>
                    {journey.fare.total.value / 100} &euro;
                  </h6>
                  <h6 className='card-title'>
                    {journey.departure_date_time.substring(9, 11)}:
                    {journey.departure_date_time.substring(11, 13)}:
                    {journey.departure_date_time.substring(13, 15)} >
                    {journey.arrival_date_time.substring(9, 11)}:
                    {journey.arrival_date_time.substring(11, 13)}:
                    {journey.arrival_date_time.substring(13, 15)}
                  </h6>

                  <h6 className='card-title'>
                    <img
                      src={require("../image/walking.png")}
                      alt=''
                      style={{ width: "20px", height: "20px" }}
                    />
                    {Math.floor(journey.durations.walking / 60)}min
                    {journey.durations.walking -
                      Math.floor(journey.durations.walking / 60) * 60}
                    s<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img
                      src={require("../image/metro.png")}
                      alt=''
                      style={{ width: "20px", height: "20px" }}
                    />
                    {Math.floor(
                      (journey.durations.total - journey.durations.walking) / 60
                    )}
                    min
                    {journey.durations.total -
                      journey.durations.walking -
                      Math.floor(
                        (journey.durations.total - journey.durations.walking) /
                          60
                      ) *
                        60}
                    s
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <img
                      src={require("../image/zigma.png")}
                      alt=''
                      style={{ width: "20px", height: "20px" }}
                    />
                    {Math.floor(journey.durations.total / 60)}min
                    {journey.durations.total -
                      Math.floor(journey.durations.total / 60) * 60}
                    s
                  </h6>

                  <h6 className='card-title'>
                    CO2 emission: {Math.floor(journey.co2_emission.value)}
                  </h6>
                  <p>Max CO2 emission: {Math.floor(max_co2_emission)}</p>
                  <h6 className='card-title'>
                    TRIP earned:{" "}
                    {trips}
                  </h6>
                  <Link to={"/Profile"}>
                    <input
                      className='button'
                      type='submit'
                      value='Book Ticket'
                      onClick={this.handleClick}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-6'>

              
                <Rewards trips = {trips}/>
              
 }



            
          </div>
        </div>
      </div>
    );
  }
}
export default BookTicket;
