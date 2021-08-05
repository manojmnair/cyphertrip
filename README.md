cypherTrip

A blockchain-based User incentive scheme to promote public modes of transport

cyphertrip aims at promoting public means of transport in order to reduce carbon emission. It is trying to incentivise those who are using public means . It does that by issuing a new token called TripToken, "TRIP" and awarding those to commuters based on their savings on carbon emission.

Installation:
1. Clone the directory
2. Run npm install (root directory) 
3. cd into client, run npm install (client directory) 
4. Start the client (npm run start (client folder): it will open at localhost:3000)

[For trip search select 01/12/2019 as date]

Solidity contracts in rootfolder/Contracts
Compiled contracts on rootfolder/client/src/Contracts

PRIVATE NODE SETUP
Install Geth

Access the geth folder and initiate the genesis file geth --datadir node init genesis.json

Initiate and Run the Private Ethereum Blockchain
geth --port 3001 --networkid 58343 --nodiscover --datadir=./node --maxpeers=0 --rpc --rpcport 8545 --ipcpath "~/.ethereum/geth.ipc" --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner"

Connect to the private Ethereum blockchain using the Geth Javascript console geth attach http://127.0.0.1:8545

Create an account and “mine” for dummy Ether

personal.newAccount('seed') personal.unlockAccount(web3.eth.coinbase, "seed", 15000)
miner.start()

Run the following command from the root folder $ truffle migrate --reset

Import the account to metamask(make sure the chain id and rpc port is same as that of the private blockchain)

Backup file of the Private chain is provided under the geth folder along with the paper Wallet for the account[0] The password for the wallet account is "seed".
