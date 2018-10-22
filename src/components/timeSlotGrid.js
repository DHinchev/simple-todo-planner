import React, { Component } from 'react';

class TimeSlotGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: []
    }
  }

  componentDidMount() {
  this.setState(prevState => ({
    time: intervals
  }));

  document.getElementsByClassName('time-slot-grid')[0].click();
}

  propagateToParent(e){
    e.preventDefault();
    this.props.setParentState({ timesList: intervals});
  }

  render() {
    return (
      <div className="time-slot-grid" onClick={this.propagateToParent.bind(this)}>
        <ul>
          <li className="time-unit">Time</li>
          {this.state.time.map((val, index) =>  <TimeSlots key={index} time={val} timeIndex={index}/>)}
        </ul>
      </div>
    );
  }
}

const TimeSlots = (props) => <li className="time-unit" data-time-index={props.timeIndex} data-time={props.time}>{props.time}</li>

const chosenStart = "09:00:00";
const chosenEnd = "18:00:00";
const timeGap = 15;

//2018-06-05 it can be any day since all the days have same amount of hours
let startTime = "2018-06-05 " + chosenStart;
let endTime = "2018-06-05 " + chosenEnd;

//Parse In
const parseIn = function(date_time){
  const d = new Date();
  d.setHours(date_time.substring(11,13));
  d.setMinutes(date_time.substring(14,16));
  
  return d;
}

//make list
const getTimeIntervals = function (time1, time2) {
  const arr = [];
  while(time1 <= time2){
    arr.push(time1.toTimeString().substring(0,5));
    time1.setMinutes(time1.getMinutes() + timeGap);
  }

  return arr;
}

startTime = parseIn(startTime);
endTime = parseIn(endTime);

const intervals = getTimeIntervals(startTime, endTime);

export default TimeSlotGrid;