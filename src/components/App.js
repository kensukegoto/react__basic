import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  increment,
  decrement,
} from '../actions'


class App extends Component {

  render() {
    const props = this.props

    return (
      <>
        <div>value: {props.value}</div>
        <button onClick={props.imcrement}>+1</button>
        <button onClick={props.decrement}>-1</button>
      </>
    );
  }
}

const mapStateToProps = state => ({ value: state.count.value })
const mapDispatchToProps = dispatch => ({
  imcrement: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
