// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
// $FlowFixMe: suppressing external lib validation
import Requirements from '../../../lib'

type State = {
  count: number,
  done: boolean
}

const RequirementListItem = (
  props: { num: string, done?: boolean },
  context: { markAsDone: string => void }
) => {
  const textStyle = props.done ? { textDecoration: 'line-through' } : {}
  const doneButtonComponent = (
    <button className="doneBtn" onClick={() => context.markAsDone(props.num)}>
      Done
    </button>
  )

  return (
    <li key={props.num}>
      <span style={textStyle}>Requirement {props.num}</span>
      {!props.done ? doneButtonComponent : null}
    </li>
  )
}

RequirementListItem.contextTypes = {
  markAsDone: PropTypes.func,
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
