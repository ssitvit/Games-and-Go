import React from 'react'

export default function BrickCollision(circle, rect) {
    let distX = Math.abs(circle.x - rect.x - rect.width / 2);
    let distY = Math.abs(circle.y - rect.y - rect.width / 2);

    if (distX > rect.width / 2 + circle.rad) {
        // return false;
        return {
            hit: false,
        };
    }
    if (distY > rect.height / 2 + circle.rad) {
        // return false;
        return {
            hit: false,
        };
    }
    
    if (distX <= rect.width / 2 ) {
        // return true;
        return {
            hit: true,
            axis: 'Y',
        };
    }
    if (distY <= rect.height / 2 ) {
        // return true;
        return {
            hit: true,
            axis: 'X',
        };
    }

    // also test for corner collision
    let dx = distX - rect.width / 2;
    let dy = distY - rect.hieght / 2;
    // return dx * dx + dy <= circle.rad * circle.rad;
    return {
        hit: dx * dx + dy <= circle.rad * circle.rad,
        axis: 'X',
    };
}

