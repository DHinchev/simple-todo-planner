import React, { Component } from 'react';

class TodoModal extends Component {
    state = {
        todoTitle: "",
        todoPersonResponsible: "",
        todoDescription: "",
        todoPriority: "Lowest",
        todoDay: "Monday",
        todoDayIndex: "0",
        todoStartTime: "09:00",
        todoEndTime: "09:15"
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;

        if (name === 'todoDay') {
            const temp = event.target.selectedIndex;

            this.setState({
                todoDayIndex: temp,
                [name]: value,
            });
            return;
        }

        this.setState({ [name]: value});
    }

    checkForTimeCollision = () => {
        const { todoStartTime, todoEndTime, todoDay } = this.state;
        const { todos } = this.props;

        let checkForTimeCollision = false;

        const newTodoStartTime = Date.parse('01/01/2018 ' + todoStartTime + ':00');
        const newTodoEndTime = Date.parse('01/01/2018 ' + todoEndTime + ':00');

        todos.forEach(function (todo) {
            if (todoDay === todo.todoDay) {
                const otherTodoStartTime = Date.parse('01/01/2018 ' + todo.todoStartTime + ':00');
                const otherTodoEndTime = Date.parse('01/01/2018 ' + todo.todoEndTime + ':00');
                const startTimeCollision = newTodoStartTime >= otherTodoStartTime && newTodoStartTime < otherTodoEndTime;
                const endTimeCollision = newTodoEndTime >= otherTodoStartTime && newTodoEndTime < otherTodoEndTime;
                const checkEndTimeStartTime = newTodoStartTime >= newTodoEndTime
                if (startTimeCollision || endTimeCollision || checkEndTimeStartTime || todoStartTime === todoEndTime) {
                    checkForTimeCollision = true;
                }
            }
        });

        return checkForTimeCollision;
    } 

    handleSubmit = (event) => {
        event.preventDefault();

        const hasTimeCollision = this.checkForTimeCollision();
        
        if (!hasTimeCollision) {
            this.props.onAddTodo(this.state, () => {
                this.setState({
                    todoTitle: '',
                    todoPersonResponsible: '',
                    todoDescription: '',
                    todoPriority: 'Lowest',
                    todoDay: 'Monday',
                    todoDayIndex: '0',
                    todoStartTime: '09:00',
                    todoEndTime: '09:15'
                });
            });
        } else {
            this.showWarningMessagte();
        }
    }

    showWarningMessagte = () => {
        const defaultClassName = 'time-collision-warning';
        document.getElementsByClassName(defaultClassName)[0].classList.add('show');
        setTimeout(function () {
            document.getElementsByClassName(defaultClassName)[0].classList.remove('show');;
        }, 3000);
    }

    render() {
        const { todoTitle, todoPersonResponsible, todoDescription, todoPriority, todoDay, todoStartTime, todoEndTime } = this.state;

        return (
            <div>
                <h4 className="new-todo-headline">Add New Todo</h4>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label
                            htmlFor="inputTodoTitle"
                            className="col-sm-2 control-label"
                        >
                            Todo
                        </label>
                        <div className="col-sm-10">
                            <input
                                name="todoTitle"
                                type="text"
                                className="form-control"
                                id="inputTodoTitle"
                                placeholder="Title"
                                value={todoTitle}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="inputTodoPersonResponsible"
                            className="col-sm-2 control-label"
                        >
                            Person Responsible
                        </label>
                        <div className="col-sm-10">
                            <input
                                name="todoPersonResponsible"
                                type="text"
                                className="form-control"
                                id="inputTodoPersonResponsible"
                                placeholder="Person Responsible"
                                value={todoPersonResponsible}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="inputTodoDesc"
                            className="col-sm-2 control-label"
                        >
                            Description
                        </label>
                        <div className="col-sm-10">
                            <textarea
                                name="todoDescription"
                                className="form-control"
                                rows="3"
                                id="inputTodoDesc"
                                value={todoDescription}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label
                            htmlFor="inputTodoPriority"
                            className="col-sm-2 control-label"
                        >
                            Priority
                        </label>
                        <div className="col-sm-10" >
                            <select
                                name="todoPriority"
                                className="form-control"
                                id="inputTodoPriority"
                                value={todoPriority}
                                onChange={this.handleInputChange}
                            >
                                <option>Lowest</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Highest</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group" >
                        <label
                            htmlFor="inputtodoDay"
                            className="col-sm-2 control-label"
                        >
                            Days
                        </label>
                        <div className="col-sm-3" >
                            <select
                                name="todoDay"
                                className="form-control"
                                id="inputTodoPriority"
                                value={todoDay}
                                onChange={this.handleInputChange}
                            >
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group" >
                        <label
                            htmlFor="inputtodoStartTime"
                            className="col-sm-2 control-label"
                        >
                            Start Time
                        </label>
                        <div className="col-sm-3" >
                            <select
                                name="todoStartTime"
                                type="text"
                                className="form-control"
                                id="inputtodoStartTime"
                                value={todoStartTime}
                                onChange={this.handleInputChange}
                                placeholder="Months Remaining"
                            >
                                {
                                    this.props.timeSlots.map(index => (
                                        <option key={index}>
                                            {index}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="inputtodosEndTime"
                            className="col-sm-2 control-label"
                        >
                            End Time
                        </label>
                        <div className="col-sm-3">
                            <select
                                name="todoEndTime"
                                type="text"
                                className="form-control"
                                id="inputtodosEndTime"
                                value={todoEndTime}
                                onChange={this.handleInputChange}
                                placeholder="Time Remaining"
                            >
                                {
                                    this.props.timeSlots.map(index => (
                                        <option key={index}>
                                            {index}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="time-collision-warning">
                        <span className="time-collision-warning-text">
                            The set duration for this task is already booked or overlapping.Please select different time!
                        </span>
                    </div>

                    <div className="form-group" >
                        <div className="col-sm-offset-2 col-sm-10" >
                            <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Add Todo</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default TodoModal;