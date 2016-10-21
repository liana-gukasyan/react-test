import React from 'react'
import classNames from 'classnames'

import TodoItem from './TodoItem'

const ENTER_KEY = 13
const CANCEL_CHANGE = -1

export default class TodoList extends React.Component {
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
      if (this.props.mode == 'completed') {
        return task.completed
      }
      if (this.props.mode == 'active') {
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
    return (
      <ul className='main-list'>
        {tasks}
      </ul> 
    )
  }
}