import {combineReducers} from 'redux';
import { keyBy } from 'lodash';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection };
    case 'ACCOUNT_LOADED':
      return { ...state, account: action.account};
    default:
      return state;
  }
}

function contract(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_REWARD_CONTRACT_LOADED':
      return { ...state, tokenRewardContract: action.tokenRewardContract };
    case 'IPFS_CONTRACT_LOADED':
      return { ...state, ipfsContract: action.ipfsContract };
    default:
      return state;
  }
}


function journeys(state = {journeys: [],loading:false,error:null}, action) {
  switch(action.type) {
    case 'GET_JOURNEYS':
      return {
        ...state,
        loading:true,
error:null
      };
    case 'GOT_JOURNEYS':
      return {
        ...state,
        loading:false,
        journeys: action.journeys,
error:null
      };
    default:
      return state;
  }
}
function tickets(state = {tickets: null, ticket: null,loading:false,error:null}, action) {
  switch(action.type) {
    case 'GET_TICKETS':
      return {
        ...state,
        loading:true,
error:null
      };
    case 'GOT_TICKETS':
      const ticketsByIndex = keyBy(state.tickets, 'index')
      const updatedTickets = action.payload.map((ticket) => {
        const updatedTicket = { ...ticketsByIndex[ticket.index], ...ticket }
        return updatedTicket
      })
      return {
        ...state,
        loading:false,
        tickets: action.updatedtickets,
error:null,
ticket: null
      };
    case 'GET_TICKET':
      return {
        ...state,
        loading:false,
error:null,
        ticket: state.tickets ? state.tickets[action.payload] : null
      };
    case 'UPLOAD_TICKET':
      return {
        ...state,
        loading:true,
error:null
      };
    case 'UPLOADED_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

const rootReducer = new combineReducers({
  web3, contract, journeys, tickets
});

export default rootReducer;
