// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'

type Props = {
  id?: string,
  className?: string,
  ids?: ?Array<string>,
  idsDone?: Array<string>,
  handleDone: Function,
  handleChildDone?: Function,
  children?: React$Element<any> | Array<React$Element<any>>
}

type State = {
  ids: Object
}

class Requirements extends Component<void, Props, State> {
  state: State
  done: boolean
  ids: Object
  markAsDone: Function
  static childContextTypes = {
    markAsDone: PropTypes.func,
  }

  constructor(props: Props) {
    super(props)
    this.done = false
    this.markAsDone = this.markAsDone.bind(this)
    this.state = {
      ids: {},
    }
  }

  isDone() {
    return this.done
  }

  markAsDone(id: string) {
    if (this.done) {
      return
    }

    const newStateIds = this.state.ids

    if (!newStateIds[id]) {
      newStateIds[id] = true
      this.setState({
        ids: newStateIds,
      })
      if (this.props.handleChildDone) {
        this.props.handleChildDone(id)
      }
    } else {
      console.warn(`The id ${id} was already marked`)
    }

    this.done = this.refreshDone(newStateIds)
  }

  checkDone(id: string, idsDone?: Array<string>): boolean {
    if (!idsDone) {
      return false
    }

    return idsDone.reduce(
      (isIdDone, idDone) => idDone === id || isIdDone,
      false
    )
  }

  checkAllDone(currentIds: Object): boolean {
    const idsKeys = Object.keys(currentIds)
    if (idsKeys.length > 0) {
      return idsKeys.reduce(
        (isDone, idKey) => currentIds[idKey] && isDone,
        true
      )
    }
    return false
  }

  refreshDone(currentIds: Object): boolean {
    const isIdsDone = this.checkAllDone(currentIds)
    if (isIdsDone && !this.done) {
      this.props.handleDone(true)
    } else if (!isIdsDone && this.done) {
      this.props.handleDone(false)
    }
    return isIdsDone
  }

  getChildId(child: React$Element<any>, index?: number) {
    return child.props.id || child.key || (index && index.toString())
  }

  refreshIds(
    newIds?: ?Array<string>,
    children?: React$Element<any> | Array<React$Element<any>>,
    idsDone?: Array<string>
  ) {
    let changed = false
    let ids: ?Array<string> = []
    const newStateIds = this.state.ids

    if (newIds && newIds.length > 0) {
      ids = newIds || []
    } else if (children) {
      ids = React.Children.map(children, (child: React$Element<any>, index) =>
        this.getChildId(child, index)
      )
    }

    if (ids && ids.length > 0) {
      ids.forEach(newId => {
        if (newId) {
          if (
            newStateIds[newId] === undefined ||
            (!newStateIds[newId] && this.checkDone(newId, idsDone))
          ) {
            newStateIds[newId] = this.checkDone(newId, idsDone)
            changed = true
          }
        }
      })
    }

    if (changed) {
      this.done = this.refreshDone(newStateIds)
      this.setState({
        ids: newStateIds,
      })
    }
  }

  getChildContext() {
    return {
      markAsDone: this.markAsDone,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.refreshIds(nextProps.ids, nextProps.children, nextProps.idsDone)
  }

  componentDidMount() {
    this.refreshIds(this.props.ids, this.props.children, this.props.idsDone)
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const childId = this.getChildId(child)
      if (childId) {
        return React.cloneElement(child, {
          done: this.state.ids[childId],
        })
      }
      return child
    })

    return (
      <div id={this.props.id} className={this.props.className}>
        {childrenWithProps}
      </div>
    )
  }
}

export default Requirements
