import React, { Component } from 'react';

class GridPlanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
  }

  render() {
    return (
      <div className="grid-planner">
          {this.props.horizontal.map((val,indexColumn) => 
            <div className="columns" key={val} data-column-name={indexColumn}>
              {this.props.vertical.map(indexRow => <div className="rows" key={indexRow}></div>)}
            </div>)}   
      </div>
    );
  }
}

export default GridPlanner;