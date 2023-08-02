import React from 'react';
 
export default class Body extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className="row">
          <h1>Welcome {this.props.name}</h1>
          <p>Yeahhhhhhhh!!!!</p>
        </div>
      </div>
    );
  }
};
