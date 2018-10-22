import React, {Component} from 'react';
import Clock from './clock';
import TodoInput from './todoInput';
import Close from '../assets/close.svg'; 
import Plus from '../assets/plus.svg'; 

var taskHeightArray= [];
var taskTopArray= [];
var checkForPageReload = true;

class Planner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        };

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
        this.setTasksPosition = this.setTasksPosition.bind(this);
        this.openTaskDetails = this.openTaskDetails.bind(this);
    }


    handleAddTodo = (todo) => {
        var temp = [...this.state.todos];
        temp.push(todo);
        this.props.setParentState({todo: temp});
        this.setState({
            todos: [...this.state.todos, todo]
        },() => {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
            localStorage.setItem('todosLength', JSON.stringify(this.state.todos.length + 1));
            checkForPageReload = false;
          });
    }

    handleRemoveTodo = (index) => {
        this.setState({
            todos: this.state.todos.filter(function (e, i) {
                return i !== index;
            })
        });
    }

    openTaskDetails = (event) => {
        const checkIfLastColumn = event.target.parentNode.parentNode.dataset.columnName;
        if(checkIfLastColumn === '6') {
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
        if(checkIfLastColumn === '6') {
            event.target.parentNode.style.right = 'auto'
        }
    }

    closeTodoContainer = () => {
        const container = document.querySelector('.container-todo');
        container.classList.remove('open');
    }

    getMatch = (arr1, arr2) => {
        var matches = [];
    
        for ( var i = 0; i < arr1.length; i++ ) {
            for ( var e = 0; e < arr2.length; e++ ) {
                if ( arr1[i] === arr2[e] ) matches.push(arr1[i]);
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

            if(this.state.todos.length) {
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

                tasksArray.forEach(function(val,index) { 
                    topPosition = document.querySelector('[data-time=' + CSS.escape(matchStart[index]) + ']').getAttribute('data-time-index');
                    endPosition = document.querySelector('[data-time=' + CSS.escape(matchEnd[index]) + ']').getAttribute('data-time-index');

                    if(index === (taskArrayDay.length-1) && checkForPageReload === false) {
                        elementHeight = (endPosition - topPosition) * timeSlotElementHeight;
                        elementTop = topPosition * timeSlotElementHeight;
                        taskHeightArray.push(elementHeight);
                        taskTopArray.push(elementTop);
                    } 
                    if( checkForPageReload === true) {
                        elementHeight = (endPosition - topPosition) * timeSlotElementHeight;
                        elementTop = topPosition * timeSlotElementHeight;
                        taskHeightArray.push(elementHeight);
                        taskTopArray.push(elementTop);
                    }

                    console.log(taskHeightArray);

                    getTasksColumnPosition = taskArrayDay[index];
                    document.querySelector('[data-column-name=' + CSS.escape(getTasksColumnPosition) + ']').appendChild(val);
                    val.style.height = taskHeightArray[index] + 'px';
                    val.style.top = taskTopArray[index] + 'px';
                });  
            }
            checkForPageReload = false;
    }

    componentDidUpdate () {
        this.setTasksPosition();
    }

    render() {
        return ( 
            <div className ="container-todo">
            <img src={Close} className="close-icon" width="35px" height="35px" alt="close icon" onClick={this.closeTodoContainer}/>
            <TodoInput days = {this.props.horizontal} timeSlots = {this.props.vertical}
            onAddTodo = {this.handleAddTodo} tasks={this.state.todos}/>
                <div className="list-group">
                    {this.state.todos.map((todo, index) => (
                        <div className = "list-group-item task" key = {index} data-start={todo.todoStartTime} data-end={todo.todosEndTime} data-day={todo.todoDayIndex}>
                            <img src={Plus} className="plus-icon-task" width="25px" height="25px" alt="plus icon for task" onClick={this.openTaskDetails}/>
                            <img src={Close} className="close-icon-task" width="35px" height="35px" alt="close icon for task" data-close-index={index} onClick={this.closeTaskDetails}/>
                            <h4 className = "list-group-item-heading" > 
                                {todo.todoTitle} { " " } 
                                <span className = "label label-info" > 
                                    {todo.todoPriority}
                                </span>
                            </h4>
                            <p className="list-group-item-responsible">{todo.todoResponsible}</p> 
                            <p className="list-group-item-description">{todo.todoDescription}</p>
                            <Clock startTime={todo.todoStartTime} endTime={todo.todosEndTime} dayOfWeek={todo.todoDays}  dayIndex={todo.todoDayIndex}/>
                        
                            <button className = "btn btn-danger btn-sm" onClick = {() => this.handleRemoveTodo(index)}> Delete </button> 
                        </div>
                    ))}
                </div>
            <hr/>
            </div>
        );
    }
}

export default Planner;