import getWeb3 from "../getWeb3";
//import { keyBy } from 'lodash'
//import { web3Loaded, tokenRewardContractLoaded, ipfsContractLoaded, accountLoaded, getTickets, gotTickets, getTicket, gotTicket, ticketUpload,  ticketUploaded, errorLoaded, getJourneys, gotJourneys } from "./actions";
import { web3Loaded, tokenRewardContractLoaded, ipfsContractLoaded, accountLoaded, getJourneys, gotJourneys } from "./actions";
//import TripTokenContract from "../contracts/TripToken.json";
import TokenRewardContract from "../contracts/TokenReward.json";
import saveToIPFSContract from "../contracts/saveToIPFS.json";

export const loadWeb3 = async (dispatch) => {
  const web3 = await getWeb3();
  dispatch(web3Loaded(web3));
  return web3;
}
export const loadAccount = async (dispatch, web3) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(accountLoaded(account));
  return account;
}
export const loadTokenRewardContract = async (dispatch, web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = TokenRewardContract.networks[networkId];
  const tokenRewardinstance = new web3.eth.Contract(
    TokenRewardContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  dispatch(tokenRewardContractLoaded(tokenRewardinstance));
  return tokenRewardinstance;
}
export const loadipfsContract = async (dispatch, web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = saveToIPFSContract.networks[networkId];
  const ipfsInstance = new web3.eth.Contract(
    saveToIPFSContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  dispatch(ipfsContractLoaded(ipfsInstance));
  return ipfsInstance;
}
//export const ticketsByIndex = keyBy(state.tickets, 'index')
  //    const updatedTickets = action.payload.map((ticket) => {
    //    const updatedTicket = { ...ticketsByIndex[ticket.index], ...ticket }
      //  return updatedTicket
      //})
export const get_journeys = async (dispatch) => {
  dispatch(getJourneys());
}
export const got_journeys = async (dispatch,data) => {
  dispatch(getJourneys);
  const journeys = await gotJourneys();
  dispatch(gotJourneys(data));
  return journeys;
}
