import React, { Component } from "react";
import _ from "lodash";
import Journey from "./Journey";
import Loading from "./Loading";
import Search from "./Search";
import SelectRoute from "./SelectRoute";
import SelectAnotherRoute from "./SelectAnotherRoute";

class Home extends Component {
  static defaultProps = {
    journeys: [],
  };

  render() {
    const { journeys, loading, error } = this.props.journeys;
    return (
      <div className='banner-content col-lg-12 light middle'>
        <div className='row'>
          <Search />
          <div className='col-sm-6'>
            {loading ? (
              <Loading />
            ) : !_.isEmpty(journeys) ? (
              <>
                {journeys.journeys.map((journey, index) => (
                  <Journey
                    key={index}
                    journey={journey}
                    index={index}
                    {...this.props}
                    max_co2_emission={
                      journeys.context.car_direct_path.co2_emission.value
                    }
                  />
                ))}
              </>
            ) : (
              <SelectRoute />
            )}
          </div>
          <div />
        </div>
      </div>
    );
  }
}
export default Home;
