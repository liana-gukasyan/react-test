import React from 'react'
import { render } from 'react-dom'
import classNames from 'classnames'

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

function completeTask(id) {
  let taskIndex = findIndex(id)
  let currentTask = tasks[taskIndex]
  currentTask.completed = !currentTask.completed
  renderAll()
}

function createTask(text) {
  let tempTask = {}
  tempTask.text = text
  tempTask.completed = false
  tempTask.id = idForNewTask
  idForNewTask = idForNewTask + 1
  tasks.push(tempTask)
  renderAll()
}

const ESCAPE_KEY = 27
const ENTER_KEY = 13
const CANCEL_CHANGE = -1
let idForNewTask = 100

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

    let taskElementClasses = classNames({
      'item': true,
      'completed': this.props.completed
    })

    let handleCompleteItem = this.props.handleCompleteTask

    let taskElement = (
      <li>
        <div className={taskElementClasses}
             onDoubleClick={onTaskToggleEdit}>
          <input className='check-input'
                 type='checkbox'
                 onClick={handleCompleteItem}
                 defaultChecked={this.props.completed}>
          </input>
          <label className='item-label'>{taskText}</label>
          <button className='close' onClick={handleRemoveTask}></button>
        </div>
      </li>
    )
    let inputElement = (
      <li>
        <div className='item'
             onDoubleClick={onTaskToggleEdit}>
          <input className='check-input'
                 type='checkbox'
                 onClick={handleCompleteItem}
                 defaultChecked={this.props.completed}>
          </input>
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

function renderAll() {
  render(
    <TodoApp tasks={tasks}
             editingItemId={editingItemId} 
             onTaskToggleEdit={onTaskToggleEdit}
             handleEdit={handleEdit}
             removeTask={removeTask}
             completeTask={completeTask}
             createTask={createTask}/>,
    document.getElementsByClassName('container')[0])
}

renderAll()
