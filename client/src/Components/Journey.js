import React, { Component } from "react";
import { Link } from 'react-router-dom';


class Journey extends Component {
  render() {

    const { journey, index, max_co2_emission } = this.props;
    //console.log(journey);
    return (

      <div className='card  nobord' key={index}>
        <div className={index % 2 ? "nobord1" : "nobord2"}>
          <div className='card-body bord'>
          <h6 className='card-title'>

          {journey.departure_date_time.substring(0, 4)}:
          {journey.departure_date_time.substring(4, 6)}:
          {journey.departure_date_time.substring(6, 8)}

          </h6>
          <h5 className='card-title'>

{journey.fare.total.value / 100} &euro;


</h5>
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
                  (journey.durations.total - journey.durations.walking) / 60
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
            <p>
              Max CO2 emission: {Math.floor(max_co2_emission)}
            </p>
            <h6 className='card-title'>TRIP earned: {Math.floor((max_co2_emission - journey.co2_emission.value) / 100)}</h6>
<Link to={`/BookTicket/${index}`}>
            <input className='button' type='submit' value='Select journey' />
</Link>
          </div>
          </div>
        </div>


    );
  }
}

export default Journey;
