import React from 'react'
import { render } from 'react-dom'
import classNames from 'classnames'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import TodoItem from './TodoItem'
import TodoApp from './TodoApp'

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

const CANCEL_CHANGE = -1
let idForNewTask = 100

let todoListWrapper = React.createClass({
  render: function () {
    return (
        <TodoApp 
             {...this.props} 
             tasks={tasks}
             editingItemId={editingItemId}
             onTaskToggleEdit={onTaskToggleEdit}
             handleEdit={handleEdit}
             removeTask={removeTask}
             completeTask={completeTask}
             createTask={createTask}/>
    )
  }
})

function renderAll() {
  render(
    <div>
    <Router history={browserHistory}>
      <Route path='/(:modeName)' component={todoListWrapper}></Route>
    </Router>
    </div>,
    document.getElementsByClassName('container')[0])
}

renderAll()
