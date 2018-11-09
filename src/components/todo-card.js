import React, { Component } from 'react';
import Close from '../assets/close.svg';
import Plus from '../assets/plus.svg';
import Clock from './clock';

var taskHeightArray = [];
var tempTaskHeightArray = [];
var taskTopArray = [];
var tasksCount = 0;

class GridPlanner extends Component {

componentDidUpdate() {
  if(this.props.tasks.length > tasksCount) {
    this.setTasksPosition();
  }
}

handleRemoveTodo = (index) => {
  this.props.setParentState(this.props.tasks.filter((todo, i) => i !== index));
  tasksCount -= 1;
}

openTaskDetails = (event) => {
  const checkIfLastColumn = event.target.parentNode.parentNode.dataset.columnName;
  if (checkIfLastColumn === '6') {
    event.target.parentNode.style.right = '0px'
  }
  event.target.parentNode.classList.add('open');
  event.target.parentNode.style.height = 'auto';
}

closeTaskDetails = (event) => {
  event.target.parentNode.classList.remove('open');
  const indexOfHeightArray = event.target.dataset.closeIndex;
  event.target.parentNode.style.height = tempTaskHeightArray[indexOfHeightArray] + 'px';

  const checkIfLastColumn = event.target.parentNode.parentNode.dataset.columnName;
  if (checkIfLastColumn === '6') {
    event.target.parentNode.style.right = 'auto'
  }
}

getMatch = (arr1, arr2) => {
  var matches = [];

  for (var i = 0; i < arr1.length; i++) {
    for (var e = 0; e < arr2.length; e++) {
      if (arr1[i] === arr2[e]) matches.push(arr1[i]);
    }
  }
  return matches;
}

setTasksPosition = () => {
  let topPosition=[];
  let endPosition=[];
  let taskArrayStart;
  let timeSlotContainer;
  let taskArrayEnd;
  let matchStart;
  let matchEnd;
  let tasksArray;
  let elementHeight;
  let elementTop;
  let timeSlotElementHeight;
    
  if (this.props.tasks.length) {
    tasksArray = [...document.getElementsByClassName('list-group-item')];
    timeSlotContainer = [...document.querySelectorAll('[data-time]')].map(el => el.getAttribute('data-time'));
    timeSlotElementHeight = document.querySelectorAll('.time-unit')[1].offsetHeight;
    taskArrayStart = tasksArray.map(el => el.getAttribute('data-start'));
    taskArrayEnd = tasksArray.map(el => el.getAttribute('data-end'));
    matchStart = this.getMatch(taskArrayStart, timeSlotContainer);
    matchEnd = this.getMatch(taskArrayEnd, timeSlotContainer);

    tasksArray.forEach(function (val, index) {
      topPosition.push(document.querySelector('[data-time=' + CSS.escape(matchStart[index]) + ']').getAttribute('data-time-index'));
      endPosition.push(document.querySelector('[data-time=' + CSS.escape(matchEnd[index]) + ']').getAttribute('data-time-index'));

      elementHeight = (endPosition[index] - topPosition[index]) * timeSlotElementHeight;
      elementTop = topPosition[index] * timeSlotElementHeight;
      taskHeightArray.push(elementHeight);
      taskTopArray.push(elementTop);
      tasksCount = taskTopArray.length;

      val.style.height = taskHeightArray[index] + 'px';
      val.style.top = taskTopArray[index] + 'px';
      val.getElementsByClassName('close-icon-task')[0].dataset.closeIndex = index;
    });
  }

  tempTaskHeightArray = taskHeightArray;
  taskHeightArray = [];
  taskTopArray = [];
}

  render() {
    const {timeSlotRows, dayColumns, tasks, mobileDaySelection, checkMobile} = this.props;

    return (
      <div className="grid-planner">
          {timeSlotRows.map((val,indexColumn) => 
            (checkMobile === true) ?
            (val === mobileDaySelection) ?
              <div className="columns" key={val} data-column-name={indexColumn}>
              {tasks.map((tasks, index) => (
                (parseInt(tasks.todoDayIndex, 10) === indexColumn) ?
                  <div className="list-group-item task"
                    key={tasks.todoTitle}
                    data-start={tasks.todoStartTime}
                    data-end={tasks.todoEndTime}
                    data-day={tasks.todoDayIndex}
                  >
                    <img src={Plus} 
                      className="plus-icon-task"
                      width="25px" height="25px"
                      alt="plus icon for task"
                      onClick={this.openTaskDetails}
                    />
                    <img src={Close}
                      className="close-icon-task"
                      width="35px" height="35px"
                      alt="close icon for task"
                      onClick={this.closeTaskDetails}
                    />
                      <h4 className="list-group-item-heading" >
                        {tasks.todoTitle} {" "}
                        <span className="label label-info" >
                          {tasks.todoPriority}
                        </span>
                      </h4>
                      <p className="list-group-item-responsible">
                        {tasks.todoResponsible}
                      </p>
                      <p className="list-group-item-description">
                        {tasks.todoDescription}
                      </p>
                        <Clock
                          startTime={tasks.todoStartTime}
                          endTime={tasks.todoEndTime}
                          dayOfWeek={tasks.todoDay}
                          dayIndex={parseInt(tasks.todoDayIndex, 10)}
                        />
                      <button className="btn btn-danger btn-sm" onClick={() => this.handleRemoveTodo(index)}> Delete </button>
                  </div>
              : null))}
              
              {dayColumns.map(indexRow => <div className="rows" key={indexRow}></div>)}
            </div>
            : null
            : <div className="columns" key={val} data-column-name={indexColumn}>
            {tasks.map((tasks, index) => (
              (parseInt(tasks.todoDayIndex, 10) === indexColumn) ?
                <div className="list-group-item task"
                  key={tasks.todoTitle}
                  data-start={tasks.todoStartTime}
                  data-end={tasks.todoEndTime}
                  data-day={tasks.todoDayIndex}
                >
                  <img src={Plus} 
                    className="plus-icon-task"
                    width="25px" height="25px"
                    alt="plus icon for task"
                    onClick={this.openTaskDetails}
                  />
                  <img src={Close}
                    className="close-icon-task"
                    width="35px" height="35px"
                    alt="close icon for task"
                    onClick={this.closeTaskDetails}
                  />
                    <h4 className="list-group-item-heading" >
                      {tasks.todoTitle} {" "}
                      <span className="label label-info" >
                        {tasks.todoPriority}
                      </span>
                    </h4>
                    <p className="list-group-item-responsible">
                      {tasks.todoResponsible}
                    </p>
                    <p className="list-group-item-description">
                      {tasks.todoDescription}
                    </p>
                      <Clock
                        startTime={tasks.todoStartTime}
                        endTime={tasks.todoEndTime}
                        dayOfWeek={tasks.todoDay}
                        dayIndex={parseInt(tasks.todoDayIndex, 10)}
                      />
                    <button className="btn btn-danger btn-sm" onClick={() => this.handleRemoveTodo(index)}> Delete </button>
                </div>
            : null))}
            
            {dayColumns.map(indexRow => <div className="rows" key={indexRow}></div>)}
          </div>)}  
             
      </div>
    );
  }
}

export default GridPlanner;