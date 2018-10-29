import React, { Component } from 'react';
import TodoModal from './todo-modal';
import Close from '../assets/close.svg';


class Planner extends Component {
    constructor(props) {
        super(props);

        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    handleAddTodo = (todo, cb) => {
        this.props.setParentState([ ...this.props.todos, todo ]);
        cb();
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
            </div>
        );
    }
}

export default Planner;