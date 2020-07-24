import {combineReducers} from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection };
    case 'ACCOUNT_LOADED':
      return { ...state, account: action.account};
    case 'BENEFICIARIES_LOADED':
      return { ...state, beneficiaries: action.beneficiaries};
    default:
      return state;
  }
}

function contract(state = {}, action) {
  switch (action.type) {
    case 'CONTRACT_LOADED':
      return { ...state, contract: action.contract };
    case 'TOTALSUPPLY_LOADED':
      return { ...state, totalSupply: action.totalSupply };
    case 'BALANCE_LOADED':
      return { ...state, balance: action.balance };
    //case 'BALANCE_UPDATED':
      //return { ...state, balance: action.balance };
    default:
      return state;
  }
}
function journeys(state = {journeys: [],loading:false,error:null}, action) {
  switch(action.type) {
    case 'GET_JOURNEYS':
      return {
        ...state,
        loading:true
      };
    case 'GOT_JOURNEYS':
      return {
        ...state,
        loading:false,
        journeys: action.journeys
      };
    default:
      return state;
  }
}
const rootReducer = new combineReducers({
  web3, contract, journeys
});

export default rootReducer;
