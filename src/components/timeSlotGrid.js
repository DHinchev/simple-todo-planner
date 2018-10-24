import React, { Component } from 'react';

class TimeSlotGrid extends Component {
  state = {
    time: []
  }

  componentDidMount = () => {
    this.setState({
      time: this.generate()
    }, () => {
    this.propagateToParent();
  });
}

  propagateToParent = () =>{
    this.props.setParentState({ timesList: this.state.time});
  }

  getTimeIntervals = (time1, time2) => {
    const arr = [];
    const timeGap = 15;

    while(time1 <= time2) {
      arr.push(time1.toTimeString().substring(0,5));
      time1.setMinutes(time1.getMinutes() + timeGap);
    }
  
    return arr;
  }

  parseIn = (dateTime) => {
    const d = new Date();
    d.setHours(dateTime.substring(11,13));
    d.setMinutes(dateTime.substring(14,16));
    
    return d;
  }

  generate = () => {
    const chosenStart = "09:00:00";
    const chosenEnd = "18:00:00";

    let startTime = "2018-06-05 " + chosenStart;
    let endTime = "2018-06-05 " + chosenEnd;

    startTime = this.parseIn(startTime);
    endTime = this.parseIn(endTime);

    const intervals = this.getTimeIntervals(startTime, endTime);

    return intervals;
  }

  render() {
    const TimeSlots = (props) => <li className="time-unit" data-time-index={props.timeIndex} data-time={props.time}>{props.time}</li>
    return (
      <div className="time-slot-grid">
        <ul>
          <li className="time-unit">Time</li>
          {this.state.time.map((val, index) =>  <TimeSlots key={index} time={val} timeIndex={index}/>)}
        </ul>
      </div>
    );
  }
}

export default TimeSlotGrid;