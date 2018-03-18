import Web3 from 'web3';
import fs from 'fs-extra';
import path from 'path';
import solc from 'solc';

export function initWeb3() {
  let web3js = undefined;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
  return web3js;
}

export function getAccounts() {
  const web3 = initWeb3();
  return web3.eth.accounts.map(account => ({
    value: account,
    label: account,
  }));
}

export function getContractInstance() {
  let input = fs.readFileSync('../contracts/VirtLotto.sol', 'utf8');
  let output = solc.compile(input, 1);
  let abi = JSON.parse(output.contracts[':VirtLotto'].interface);
  let bytecode = output.contracts[':VirtLotto'].bytecode;
  return new web3.eth.contract(abi);
}

export function deployContract() {
  const web3 = initWeb3();
  const input = fs.readFileSync('../contracts/VirtLotto.sol', 'utf8');
  const output = solc.compile(input, 1);
  const abi = JSON.parse(output.contracts[':VirtLotto'].interface);
  const bytecode = output.contracts[':VirtLotto'].bytecode;

  const contract = web3.eth.contract(abi);
  return contract.new({
      data: '0x' + bytecode,
      from: web3.eth.coinbase,
      gas: 90000*2
  }, (err, contract) => {
      if (err) {
          console.log(err);
          return;
      }
      return {
        contractName,
        address: contract.address,
        abi: contract.abi
      };
  });
}
