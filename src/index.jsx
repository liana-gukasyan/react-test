import React from 'react'
import { render } from 'react-dom'

let tasks = [
  {id: '1', text: 'Make some coding', completed: true},
  {id: '2', text: 'Go to bed', completed: false}
]
let editingItemId = null

function findIndex(id) {
  var tempInd = -1
  tasks.forEach(function(item, i, tasks) {
    if (item.id == id) {
      tempInd = i
    }
  })
  return tempInd
}

function onTaskToggleEdit(id) {
  let taskIndex = findIndex(id)
  if (taskIndex != -1) {
    let currentTask = tasks[taskIndex]
    editingItemId = id
  } else {
    editingItemId = -1
  }
  renderAll()
}

function handleEdit(id, newText) {
  let taskIndex = findIndex(id)
  let currentTask = tasks[taskIndex]
  currentTask.text = newText
  editingItemId = -1
  renderAll()
}

const ESCAPE_KEY = 27
const ENTER_KEY = 13

class TodoApp extends React.Component {
  renderTasks() {
    let editingItemId = this.props.editingItemId
    let tasks = this.props.tasks.map((task) => {
      let taskId = task.id
      let onTaskToggleEdit = (e) => {
        this.props.onTaskToggleEdit(taskId)
      }
      let handleEdit = (e) => {
        let newText = this.refs.editTask.value
        this.props.handleEdit(taskId, newText)
      }
      let handleKeyDown = (e) => {
        if (e.which === ESCAPE_KEY) {
          this.props.onTaskToggleEdit(-1)
        } else if (e.which === ENTER_KEY) {
          let newText = this.refs.editTask.value
          handleEdit(taskId, newText)
        }
      }
      let isEditing = editingItemId == taskId
      let taskElement = <li key={taskId} onDoubleClick={onTaskToggleEdit}>
                     {task.text}</li>

      let inputElement = <input
            ref='editTask'
            className='change-input'
            key={taskId} 
            defaultValue={task.text}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus={true}
          />

      return isEditing ? inputElement : taskElement
    })
    return tasks
  }

  render() {
    let tasks = this.renderTasks()
    return (
      <section className='main-part'>
        <h1>todos</h1>
        <ul className='main-list'>
          {tasks}
        </ul>
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
             />,
    document.getElementsByClassName('container')[0])
}

renderAll()
