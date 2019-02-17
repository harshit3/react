import React from "react";
import './App.css';

class App extends React.Component {
  state = {
    incomingR: '',
    incomingW: '',
    outgoing: '',
    totalIncomingR: 0,
    totalIncomingW: 0,
    totalOutgoing: 0,
    showTotal: false,
    errorMessage: ''
  }

  handleChange = (e) => {
    if (e.target.value === '-') {
      this.setState({
        [e.target.name]: e.target.value,
        errorMessage: ''
      })
    }
    else if (isNaN(e.target.value)) {
      this.setState({
        errorMessage: "Only Numbers Allowed"
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        errorMessage: ''
      })
    }
  }

  toggleTotals = () => {
    this.setState({
      showTotal: !this.state.showTotal
    })
  }

  resetFields = () => {
    this.setState({
      incomingR: '',
      incomingW: '',
      outgoing: '',
      errorMessage: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { totalIncomingR, totalIncomingW, totalOutgoing, incomingR, incomingW, outgoing } = this.state;
    incomingR = incomingR === '' ? 0 : incomingR;
    incomingW = incomingW === '' ? 0 : incomingW;
    outgoing = outgoing === '' ? 0 : outgoing;
    this.setState({
      totalIncomingR: totalIncomingR + parseInt(incomingR),
      totalIncomingW: totalIncomingW + parseInt(incomingW),
      totalOutgoing: totalOutgoing + parseInt(outgoing),
      incomingR: '',
      incomingW: '',
      outgoing: ''
    })
  }

  render() {
    const state = this.state;
    return (
      <div className="App">
        {/*{state.incomingR} {state.incomingW} {state.outgoing}*/}
        <h2>Daily Sales Portal</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <h3>Incoming(R)</h3>
          <input type="text" name="incomingR" autoFocus onChange={this.handleChange} value={state.incomingR} />&nbsp;&nbsp;<span>{state.showTotal ? state.totalIncomingR : ''}</span>

          <h3>Incoming(W)</h3>
          <input type="text" name="incomingW" onChange={this.handleChange} value={state.incomingW} />&nbsp;&nbsp;<span>{state.showTotal ? state.totalIncomingW : ''}</span>

          <h3>Outgoing</h3>
          <input type="text" name="outgoing" onChange={this.handleChange} value={state.outgoing} />&nbsp;&nbsp;<span>{state.showTotal ? state.totalOutgoing : ''}</span>
          <br /><br />
          <button type="submit">SUBMIT</button>
        </form>
        <br />
        <hr />
        <br /><br />
        <button onClick={this.toggleTotals}>{state.showTotal ? "Hide Totals" : "Show Totals"}</button>
        &nbsp;&nbsp;
        <button>Generate Report</button>
        &nbsp;&nbsp;
        <button onClick={this.resetFields}>Reset</button>
        <br /><br />
        <strong>{this.state.errorMessage}</strong>
        <br />
        <hr />
      </div>
    );
  }
}

export default App;
