import React, { Component } from 'react';

class GridPlanner extends Component {

  render() {
    const {horizontal, vertical} = this.props;
    return (
      <div className="grid-planner">
          {horizontal.map((val,indexColumn) => 
            <div className="columns" key={val} data-column-name={indexColumn}>
              {vertical.map(indexRow => <div className="rows" key={indexRow}></div>)}
            </div>)}   
      </div>
    );
  }
}

export default GridPlanner;