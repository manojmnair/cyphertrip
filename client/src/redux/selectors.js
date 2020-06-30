import {get} from 'lodash';
import {createSelector} from 'reselect';

// WEB3
const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, a => a);


//CONTRACT
const contract = state => get(state, 'contract.contract', null);
export const contractSelector = createSelector(contract, a => a);

const totalSupply = state => get(state, 'contract.totalSupply', null);
export const totalSupplySelector = createSelector(totalSupply, a => a);

const balance = state => get(state, 'contract.balanceOf', null);
export const balanceSelector = createSelector(balance, a => a);
//JOUNEYS
const journeys = state => get(state, 'data.journeys', []);
export const journeysSelector = createSelector(journeys, a => a);
