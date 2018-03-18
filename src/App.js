import React, { Component } from 'react'
import './App.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {initWeb3, getAccounts, getContractInstance} from './Service'
import _ from 'lodash';

class App extends Component {
  state = {
    selectedAccount: undefined,
    selectNumber: undefined,
    amount: undefined
  }

  render() {
    const numberOptions = _.range(1, 10).map(number => ({
      value: number,
      label: number
    }));

    const selectAccount = (account) => this.setState({selectedAccount: account})
    const selectNumber = (number) => this.setState({selectNumber: number})
    const amountChanged = (event) => this.setState({amount: event.target.value})
    const bet = () => {
      getContractInstance().pickNumber(
        this.state.selectNumber.value,
        {
          from: this.state.selectedAccount.value,
          value: initWeb3().toWei(this.state.amount, 'finney'),
          gas: 1000000
        },
        (error, result) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }

    const accounts = getAccounts()
    return (
      <div className="app">
        <div className="app-header">
          <h2>VirtLotto</h2>
        </div>
        <div className="container">
          <Select
            name="account"
            value={this.state.selectedAccount}
            onChange={selectAccount}
            options={accounts}
          />
        </div>
        <div className="container">
          <Select
            name="number"
            value={this.state.selectNumber}
            onChange={selectNumber}
            options={numberOptions}
          />
        </div>
        <div className="container">
          <input value={this.state.amount} onChange={amountChanged}/>
        </div>
        <div className="container">
          <button
            onClick={bet}> Bet
          </button>
        </div>
      </div>
    )
  }
}

export default App
