import React, { Component } from 'react';
import DayGrid from './dayGrid';
import TimeSlotGrid from './timeSlotGrid';
import GridPlanner from './gridPlanner';
import Planner from './planner';

class App extends Component {

    constructor() {
      super();
      this.state = {
        timesList: [],
        dayList: [],
        todos: [],
        daysNum: '',
        timeSlotLength: ''
      }
    }

  handleTasks = (value) => {
      this.setState({todos: value});
  }
 
  openTodoContainer = () => {
    const todoContainer = document.querySelector('.container-todo');
    todoContainer.classList.add('open');
}

  render() {
    return (
      <div className="App">
        <div className="menu-organiser">
          <button className="createTask" onClick={this.openTodoContainer}> Create new task</button>
        </div>
        <div className="todo-count-tasks">
          <h4>
            Todo Count: <span> {JSON.parse(localStorage.getItem('todosLength')) || 0} </span>
          </h4>
        </div>
        <div className="grid-times">
          <TimeSlotGrid setParentState={this.setState.bind(this)} />
          <div className="grid-days">
            <DayGrid setParentState={this.setState.bind(this)} />
            <GridPlanner horizontal={this.state.dayList} vertical={this.state.timesList} tasks={this.state.todos}/>
          </div>
        </div>
        <div className="menu-planner">{this.state.todos.todoStartTime}
          <Planner horizontal={this.state.dayList} vertical={this.state.timesList} setParentState={this.handleTasks} />
        </div>
      </div>
    );
  }
}

export default App;

