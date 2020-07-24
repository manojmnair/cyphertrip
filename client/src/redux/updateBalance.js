import { loadBalance } from "./interactions";


export const updateBalance = (dispatch, contract, web3) => {
  window.ethereum.on('accountsChanged', async function (accounts) {
    await loadBalance(dispatch, contract, web3);
  });
}
