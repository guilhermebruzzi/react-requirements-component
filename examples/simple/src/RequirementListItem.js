import React from 'react'
import PropTypes from 'prop-types'
import './RequirementListItem.css'

const RequirementListItem = (
  props: { num: string, done: boolean },
  context
) => {
  const textStyle = props.done ? { textDecoration: 'line-through' } : {}

  const doneButton = !props.done
    ? (<button className="doneBtn" onClick={() => context.markAsDone(props.num)}>
        Done
      </button>)
    : null

  return (
    <li key={props.num}>
      <span style={textStyle}>Requirement {props.num}</span>
      {doneButton}
    </li>
  )
}

RequirementListItem.contextTypes = {
  markAsDone: PropTypes.func,
}

export default RequirementListItem
