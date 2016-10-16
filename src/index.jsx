import React from 'react'
import { render } from 'react-dom'

let tasks = [
  {id: '1', text: 'Make some coding', completed: true},
  {id: '2', text: 'Go to bed', completed: false}
]
let editingItemId = null

function findIndex(id) {
  var tempInd = CANCEL_CHANGE
  tasks.forEach(function(item, i, tasks) {
    if (item.id == id) {
      tempInd = i
    }
  })
  return tempInd
}

function onTaskToggleEdit(id) {
  let taskIndex = findIndex(id)
  if (taskIndex != CANCEL_CHANGE) {
    let currentTask = tasks[taskIndex]
    editingItemId = id
  } else {
    editingItemId = CANCEL_CHANGE
  }
  renderAll()
}

function handleEdit(id, newText) {
  let taskIndex = findIndex(id)
  let currentTask = tasks[taskIndex]
  currentTask.text = newText
  editingItemId = CANCEL_CHANGE
  renderAll()
}

function removeTask(idForDel) {
  let indexOfDelEl = findIndex(idForDel)
  tasks.splice(indexOfDelEl, 1)
  renderAll()
}

const ESCAPE_KEY = 27
const ENTER_KEY = 13
const CANCEL_CHANGE = -1


class TodoItem extends React.Component {
  renderTask() {
    let taskText = this.props.text
    let handleRemoveTask = this.props.handleRemoveTask
    let onTaskToggleEdit = this.props.onTaskToggleEdit

    let handleEdit = (e) => {
      let newText = this.refs.editTask.value
      this.props.handleEditText(newText)
    }
    let handleKeyDown = (e) => {
      if (e.which === ESCAPE_KEY) {
        this.props.onTaskEscEdit()
      } else if (e.which === ENTER_KEY) {
        let newText = this.refs.editTask.value
        this.props.handleEditText(newText)
      }
    }

    let taskElement = (
      <li>
        <div className='item'
             onDoubleClick={onTaskToggleEdit}>
          <input className='check-input' type='checkbox'></input>
          <label className='item-label'>{taskText}</label>
          <button className='close' onClick={handleRemoveTask}></button>
        </div>
      </li>
    )
    let inputElement = (
      <li>
        <div className='item'
             onDoubleClick={onTaskToggleEdit}>
          <input className='check-input' type='checkbox'></input>
          <input ref='editTask'
                 className='change-input'
                 defaultValue={taskText}
                 onBlur={handleEdit}
                 onKeyDown={handleKeyDown}
                 autoFocus={true}/>
        </div>
      </li>
    )

    return this.props.isEditing ? inputElement : taskElement
  }

  render() {
    let task = this.renderTask()
    return task
  }
}

class TodoApp extends React.Component {
  renderTasks() {
    let editingItemId = this.props.editingItemId
    let tasks = this.props.tasks.map((task) => {
      let taskId = task.id
      let isEditing = editingItemId == taskId

      return <TodoItem key={taskId}
                       text={task.text}
                       completed={task.completed}
                       isEditing={isEditing}
                       onTaskEscEdit={_ => this.props.onTaskToggleEdit(CANCEL_CHANGE)}
                       onTaskToggleEdit={_ => this.props.onTaskToggleEdit(taskId)}
                       handleEditText={newText => this.props.handleEdit(taskId, newText)}
                       handleRemoveTask={_ => this.props.removeTask(taskId)}/>
    })
    return tasks
  }

  render() {
    let tasks = this.renderTasks()
    return (
      <section className='main-part'>
        <header className='header'>
          <h1>todos</h1>
          <input className='push-input'
            placeholder='What needs to be done?'
            autoFocus={true} />
        </header>
        <ul className='main-list'>
          {tasks}
        </ul>
        <footer className='filter-footer'>
          <ul className='filters'>
            <li><a href='#' className='filter-div-item filter-all filter-div-item-current'>All</a></li>
            <li><a href='#active' className='filter-div-item filter-active'>Active</a></li>
            <li><a href='#completed' className='filter-div-item filter-completed'>Completed</a></li>
          </ul>
        </footer>
      </section>
    )
  }
}

function renderAll() {
  render(
    <TodoApp tasks={tasks}
             editingItemId={editingItemId} 
             onTaskToggleEdit={onTaskToggleEdit}
             handleEdit={handleEdit}
             removeTask={removeTask}
             />,
    document.getElementsByClassName('container')[0])
}

renderAll()
