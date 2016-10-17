import React from 'react'
import classNames from 'classnames'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

export default class TodoItem extends React.Component {
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
