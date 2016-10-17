import React from 'react'
import classNames from 'classnames'

import TodoItem from './TodoItem'

const ENTER_KEY = 13
const CANCEL_CHANGE = -1

export default class TodoApp extends React.Component {
  constructor() {
    super()
    let hashStatus = window.location.hash
    
    if (hashStatus == '#completed') {
      this.state = { mode: 'completed' }
    } else if (hashStatus == '#active') {
      this.state = { mode: 'active' }
    } else {
      this.state = { mode: 'all' }
    } 
  }

  changeMode(modeName) {
    this.setState({mode: modeName})
  }

  renderTasks() {
    let editingItemId = this.props.editingItemId

    let tempTasks = []
    let filterTasks = (task) => {
      if (this.state.mode == 'completed') {
        return task.completed
      }
      if (this.state.mode == 'active') {
        return !(task.completed)
      }
      return true
    }
    let tasks = this.props.tasks.filter(filterTasks).map((task) => {
      
      let taskId = task.id
      let isEditing = editingItemId == taskId

      return <TodoItem key={taskId}
                       text={task.text}
                       completed={task.completed}
                       isEditing={isEditing}
                       onTaskEscEdit={_ => this.props.onTaskToggleEdit(CANCEL_CHANGE)}
                       onTaskToggleEdit={_ => this.props.onTaskToggleEdit(taskId)}
                       handleEditText={newText => this.props.handleEdit(taskId, newText)}
                       handleRemoveTask={_ => this.props.removeTask(taskId)}
                       handleCompleteTask={_ => this.props.completeTask(taskId)}/>
    })
    
    return tasks
  }

  render() {
    let tasks = this.renderTasks()

    let onKeyDown = (e) => {
      if (e.which === ENTER_KEY) {
        let newText = this.refs.pushInput.value
        this.props.createTask(newText)
        this.refs.pushInput.value = ''
      }
    }

    let getStylesForFilter = (mode) => {
      return classNames({
        'filter-div-item': true,
        'filter-div-item-current': this.state.mode == mode
      })
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
        <ul className='main-list'>
          {tasks}
        </ul>
        <footer className='filter-footer'>
          <ul className='filters'>
            <li><a href='#'
                   className={getStylesForFilter('all')}
                   onClick={() => this.changeMode('all')}>All</a></li>
            <li><a href='#active'
                   className={getStylesForFilter('active')}
                   onClick={() => this.changeMode('active')}>Active</a></li>
            <li><a href='#completed'
                   className={getStylesForFilter('completed')}
                   onClick={() => this.changeMode('completed')}>Completed</a></li>
          </ul>
        </footer>
      </section>
    )
  }
}
