// @flow

import React, { Component } from 'react'
import './App.css'
import Requirements from './lib'
import RequirementListItem from './RequirementListItem'

type State = {
  count: number,
  done: boolean
}

export default class App extends Component {
  state: State

  constructor() {
    super()
    this.state = {
      count: 3,
      done: false,
    }
  }

  render() {
    const requirementsList = []
    for (let i = 0; i < this.state.count; i++) {
      const index = i.toString()
      requirementsList.push(<RequirementListItem key={index} num={index} />)
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Check requirements list</h2>
        </div>
        <div className="App-body">
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Add requirement
          </button>
          <span className="App-status">
            {this.state.done ? 'All done' : 'Incomplete'}
          </span>
          <ul>
            <Requirements handleDone={done => this.setState({ done })}>
              {requirementsList}
            </Requirements>
          </ul>
        </div>
      </div>
    )
  }
}
