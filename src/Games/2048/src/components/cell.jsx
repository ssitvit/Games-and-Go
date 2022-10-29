import React, {Component} from 'react'

export default class Cell extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <span className='cell'>{''}</span>
        );
    }
}