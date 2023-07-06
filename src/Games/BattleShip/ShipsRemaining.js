import React, { Component } from 'react';
import styled from 'styled-components';
import "./style2.css";
const ShipsList = styled.ul`
  columns: 2;
  border: 1px solid black;
  text-align: center;
  padding: 5px;
  //  display: flex;
  // flex-direction: column; 
`;

const ShipLi = styled.li`
  /* text-align: left; */
  /* border: 1px solid black; */
`;

class ShipsRemaining extends Component {
  render() {
    const shipLis = this.props.ships.map(ship => {
      const shipLi =
        ship.remainingHits === 0 ? (
          <ShipLi className="sunk" key={ship.name}>
            {ship.name}
          </ShipLi>
        ) : (
          <ShipLi key={ship.name}>{ship.name}</ShipLi>
        );
      return shipLi;
    });
    return (
      <div>
        <h3>Ships Remaining:</h3>
        <ShipsList>{shipLis}</ShipsList>
      </div>
    );
  }
}

export default ShipsRemaining;
