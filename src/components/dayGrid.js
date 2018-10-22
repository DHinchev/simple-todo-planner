import React, { Component } from 'react';

class DayGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }
  }

  componentDidMount() {
    document.getElementsByClassName('day-grid')[0].click();
  }

  propagateToParent(e){
    e.preventDefault();
    this.props.setParentState({ dayList: this.state.days});
  }

  render() {
    return (
      <div className="day-grid" onClick={this.propagateToParent.bind(this)}>
        <ul>
          {this.state.days.map(index => <Days key={index} weekDays={index} />)}
        </ul>
      </div>
    );
  }
}

const Days = (props) => <li className="day-unit">{props.weekDays}</li>

export default DayGrid;