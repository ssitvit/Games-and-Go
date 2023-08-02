import React from 'react';
import Header from './components/header';
import Body from './components/body';

class App extends React.Component {
  render() {
    return (
      <div id="react-rollball">
        <Header/>
        <Body name="Danny"/>
      </div>
    );
  }
}

React.render(
  <App/>,
  document.body
);
