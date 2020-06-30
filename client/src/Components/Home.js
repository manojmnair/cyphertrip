import React, { Component } from "react";
import _ from 'lodash';
//import { connect } from "react-redux";
import Journey from "./Journey";
import Loading from "./Loading";
import Search from "./Search";
import SelectRoute from "./SelectRoute";



class Home extends Component {
  static defaultProps = {
    journeys: []
  };
  //componentDidMount() {
    //this.props.getJourneys();
  //}

  render() {
    //console.log("this.props", this.props.journeys);
//journeys["max_co2_emission] = 0;

    const { journeys, loading, error } = this.props.journeys;
    
    //const max_co2_emission = 100000;

//journeys.journeys["max_co2_emission"] = journeys.journeys && journeys.context.car_direct_path.co2_emission.value;
    //console.log("this.props journeys", journeys);
//journeys.journeys['max_co2_emission']= journeys && journeys.context.car_direct_path.co2_emission.value;

//journeys["max_co2_emission"] = journeys && journeys.context.car_direct_path.co2_emission.value
//journeys.max_co2_emission = max_co2_emission;
//let context = {};
//context = journeys.context;
    //console.log("this.props journeys context", context);
    //console.log("this.props journeys context",journeys["max_co2_emission"]);
    return (
      <div className='banner-content col-lg-12 light middle'>
        <div className='row'>

          <Search />
            <div className='col-sm-6'>
          {loading ? <Loading /> : !_.isEmpty(journeys) ?
<>
                  {journeys.journeys.map((journey, index) => (
                      <Journey key={index} journey={journey} index = {index} {...this.props} max_co2_emission = {journeys.context.car_direct_path.co2_emission.value} />
                    ))
}
</>
 : <SelectRoute />}!

            </div>
          <div />
        </div>
      </div>
    );
  }
}
export default Home;
//export default connect(null, { journeysLoading})(Home);
