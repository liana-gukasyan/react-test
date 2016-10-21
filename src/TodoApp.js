import React from 'react'
import classNames from 'classnames'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Link } from 'react-router'
import { IndexLink } from 'react-router'

import TodoList from './TodoList'
import TodoItem from './TodoItem'

const ENTER_KEY = 13
const CANCEL_CHANGE = -1

export default class TodoApp extends React.Component {

  render() {
    let mode = this.props.params.modeName || 'all'
    let onKeyDown = (e) => {
      if (e.which === ENTER_KEY) {
        let newText = this.refs.pushInput.value
        this.props.createTask(newText)
        this.refs.pushInput.value = ''
      }
    }

    return (
      <section className='main-part'>
        <header className='header'>
          <h1>todos</h1>
          <input className='push-input'
            placeholder='What needs to be done?'
            autoFocus={true} 
            onKeyDown={onKeyDown}
            ref='pushInput'/>
        </header>
        <TodoList
             tasks={this.props.tasks}
             editingItemId={this.props.editingItemId} 
             onTaskToggleEdit={this.props.onTaskToggleEdit}
             handleEdit={this.props.handleEdit}
             removeTask={this.props.removeTask}
             completeTask={this.props.completeTask}
             mode={mode}/>
        <footer className='filter-footer'>
          <ul className='filters'>
            <li><IndexLink to='/' 
                    className='filter-div-item' 
                    activeClassName='filter-div-item-current'
                    >All</IndexLink></li>
            <li><Link to='/completed'
                    className='filter-div-item' 
                    activeClassName='filter-div-item-current'
                    >Completed</Link></li>
            <li><Link to='/active'
                    className='filter-div-item' 
                    activeClassName='filter-div-item-current'
                    >Active</Link></li>
          </ul>
        </footer>
      </section>
    )
  }
}
