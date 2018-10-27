import React, { Component } from 'react';

class GridPlanner extends Component {

  render() {
    const {timeSlotRows, dayColumns} = this.props;
    return (
      <div className="grid-planner">
          {timeSlotRows.map((val,indexColumn) => 
            <div className="columns" key={val} data-column-name={indexColumn}>
              {dayColumns.map(indexRow => <div className="rows" key={indexRow}></div>)}
            </div>)}   
      </div>
    );
  }
}

export default GridPlanner;