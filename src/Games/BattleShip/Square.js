import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: ${({ border }) => border || '1px solid black'};
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color || 'white'};
`;

class Square extends Component {
  render() {
    if (this.props.showBoats) {
    }
    let color;
    if (this.props.showBoats && this.props.value > 0 && this.props.value < 10) {
      color = '#292E37';
    } else if (this.props.value < 10) color = 'lightblue';
    else if (this.props.value === 10) color = 'white';
    else if (this.props.value === 100) color = 'red';
    return (
      <StyledDiv
        color={color}
        onClick={() => this.props.squareClicked(this.props.position)}
      />
    );
  }
}

export default Square;
