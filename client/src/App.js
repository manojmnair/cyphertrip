//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import * as actionCreators from './redux/actions'
import Main from './Components/Main'
import {withRouter } from 'react-router';



function mapStateToProps(state, ownProps) {
  return {
journeys:state.journeys
  }
}

//function mapDispachToProps(dispatch) {
  //return bindActionCreators(actionCreators, dispatch);
//}

const App = withRouter(connect(mapStateToProps)(Main));

export default App;
