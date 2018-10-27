import React, { Component } from 'react';
import Clock from './clock';
import TodoModal from './todo-modal';
import Close from '../assets/close.svg';
import Plus from '../assets/plus.svg';

var taskHeightArray = [];
var taskTopArray = [];
var checkForPageReload = true;

class Planner extends Component {
    constructor(props) {
        super(props);

        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    componentDidUpdate() {
        if(this.props.todos.length > taskHeightArray.length) {
            this.setTasksPosition();
        }
    }

    handleAddTodo = (todo, cb) => {
        this.props.setParentState([ ...this.props.todos, todo ]);
        cb();
    }

    handleRemoveTodo = (index) => {
        this.props.setParentState(this.props.todos.filter((todo, i) => i !== index));
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
        event.target.parentNode.style.height = taskHeightArray[indexOfHeightArray] + 'px';

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
        let topPosition;
        let endPosition;
        let taskArrayStart;
        let timeSlotContainer;
        let taskArrayEnd;
        let taskArrayDay;
        let matchStart;
        let matchEnd
        let tasksArray;
        let getTasksColumnPosition;
        let elementHeight;
        let elementTop;
        let timeSlotElementHeight;
        
        if (this.props.todos.length) {
            tasksArray = [...document.querySelectorAll('.list-group-item')];
            timeSlotContainer = [...document.querySelectorAll('[data-time]')].map(el => el.getAttribute('data-time'));
            timeSlotElementHeight = document.querySelectorAll('.time-unit')[1].offsetHeight;
            taskArrayStart = tasksArray.map(el => el.getAttribute('data-start'));
            taskArrayEnd = tasksArray.map(el => el.getAttribute('data-end'));
            taskArrayDay = tasksArray.map(el => el.getAttribute('data-day'));
            // matchStart = timeSlotContainer.filter(element => taskArrayStart.includes(element));
            matchStart = this.getMatch(taskArrayStart, timeSlotContainer);
            // matchEnd = timeSlotContainer.filter(element => taskArrayEnd.includes(element));
            matchEnd = this.getMatch(taskArrayEnd, timeSlotContainer);
            console.log(matchStart);

            tasksArray.forEach(function (val, index) {
                topPosition = document.querySelector('[data-time=' + CSS.escape(matchStart[index]) + ']').getAttribute('data-time-index');
                endPosition = document.querySelector('[data-time=' + CSS.escape(matchEnd[index]) + ']').getAttribute('data-time-index');

                if (index === (taskArrayDay.length - 1) && checkForPageReload === false) {
                    elementHeight = (endPosition - topPosition) * timeSlotElementHeight;
                    elementTop = topPosition * timeSlotElementHeight;
                    taskHeightArray.push(elementHeight);
                    taskTopArray.push(elementTop);
                }

                if (checkForPageReload === true) {
                    elementHeight = (endPosition - topPosition) * timeSlotElementHeight;
                    elementTop = topPosition * timeSlotElementHeight;
                    taskHeightArray.push(elementHeight);
                    taskTopArray.push(elementTop);
                }

                getTasksColumnPosition = taskArrayDay[index];
                document.querySelector('[data-column-name=' + CSS.escape(getTasksColumnPosition) + ']').appendChild(val);
                val.style.height = taskHeightArray[index] + 'px';
                val.style.top = taskTopArray[index] + 'px';
            });
        }
        checkForPageReload = false;
    }

    render() {
        const { open, closePlanner, todos, dayColumns, timeSlotRows } = this.props;

        const defaultClassName = 'container-todo';
        const className = open ? `${defaultClassName} open` : defaultClassName;

        return (
            <div className={className}>
                <img
                    className="close-icon"
                    width="35px"
                    height="35px"
                    alt="close icon"
                    src={Close}
                    onClick={closePlanner}
                />
                <TodoModal
                    days={timeSlotRows}
                    timeSlots={dayColumns}
                    onAddTodo={this.handleAddTodo}
                    todos={todos}
                />
                <div className="list-group">
                    {todos.map((todo, index) => (
                        <div className="list-group-item task"
                            key={todo.todoTitle}
                            data-start={todo.todoStartTime}
                            data-end={todo.todoEndTime}
                            data-day={todo.todoDayIndex}
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
                                data-close-index={index}
                                onClick={this.closeTaskDetails}
                            />
                            <h4 className="list-group-item-heading" >
                                {todo.todoTitle} {" "}
                                <span className="label label-info" >
                                    {todo.todoPriority}
                                </span>
                            </h4>
                            <p className="list-group-item-responsible">
                                {todo.todoResponsible}
                            </p>
                            <p className="list-group-item-description">
                                {todo.todoDescription}
                            </p>
                            <Clock
                                startTime={todo.todoStartTime}
                                endTime={todo.todoEndTime}
                                dayOfWeek={todo.todoDay}
                                dayIndex={todo.todoDayIndex}
                             />
                            <button className="btn btn-danger btn-sm" onClick={() => this.handleRemoveTodo(index)}> Delete </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Planner;