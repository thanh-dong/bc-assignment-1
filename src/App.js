import React, { Component } from 'react'
import logo from './logo.svg'
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

    const selectAccount = (account) => this.setState({selectAccount: account})
    const selectNumber = (e, number) => this.setState({selectNumber: number})
    const amountChanged = (event, amount) => this.setState({amount})
    const bet = () => {
      getContractInstance().pickNumber(this.state.selectNumber, {
        from: this.state.selectedAccount,
        value: initWeb3().toWei(this.state.amount, 'finney'),
        gas: 1000000
      });
    }
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
            options={getAccounts()}
          />
        </div>
        <div className="container">
          <Select
            name="number"
            value={this.state.selectedAccount}
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
