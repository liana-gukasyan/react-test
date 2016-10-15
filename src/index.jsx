import React from 'react'
import { render } from 'react-dom'

let tasks = [
	{id: '1', text: 'Make some coding', completed: true},
  {id: '2', text: 'Go to bed', completed: false}
]

function findIndex(id) {
  var tempInd = -1
  tasks.forEach(function(item, i, tasks) {
    if (item.id == id) {
      tempInd = i
    }
  })
  return tempInd
}

function onTaskEdit(id, newText) {
	let taskIndex = findIndex(id)
	let currentTask = tasks[taskIndex]
  currentTask.text = newText
	renderAll()
}

class TodoApp extends React.Component {

	renderTasks() {
		let tasks = this.props.tasks.map((task) => {
			let onTaskEdit = (e) => {
				this.props.onTaskEdit(task.id, 'ururu')
			}
			return (
				<li key={task.id} onDoubleClick={onTaskEdit}>
					{task.text}
				</li>
			)
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
						 onTaskEdit={onTaskEdit}/>,
		document.getElementsByClassName('container')[0])
}

renderAll()
