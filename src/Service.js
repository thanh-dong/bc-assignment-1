import Web3 from 'web3';
import path from 'path';

let web3js = undefined;
export function initWeb3() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3js === 'undefined') {
    web3js = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
  }
  return web3js;
}

export function getAccounts() {
  const web3js = initWeb3();
  return web3js.eth.accounts.map(account => ({
    value: account,
    label: account,
  }));
}

export function getContractInstance() {
  const abi = [
    {
      "constant": false,
      "inputs": [],
      "name": "endLottery",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "number",
          "type": "uint256"
        }
      ],
      "name": "pickNumber",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_minBet",
          "type": "uint256"
        },
        {
          "name": "_maxRound",
          "type": "uint256"
        }
      ],
      "name": "virtLotto",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const web3 = initWeb3();
  const Contract = web3.eth.contract(abi);
  return Contract.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0');
}

export function deployContract() {
  
}
