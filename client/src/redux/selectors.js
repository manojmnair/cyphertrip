import {get} from 'lodash';
import {createSelector} from 'reselect';

// WEB3
const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, a => a);

//TOKENREWARDCONTRACT
const tokenRewardContract = state => get(state, 'contract.tokenRewardContract', null);
export const tokenRewardContractSelector = createSelector(tokenRewardContract, a => a);

//IPFSCONTRACT
const ipfsContract = state => get(state, 'contract.ipfsContract', null);
export const ipfsContractSelector = createSelector(ipfsContract, a => a);

//JOUNEYS
const journeys = state => get(state, 'data.journeys', []);
export const journeysSelector = createSelector(journeys, a => a);
