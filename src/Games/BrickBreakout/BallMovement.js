import React from 'react'

export function BallMovement(context, ballObj) {
    let data = new Ball(ballObj.x, ballObj.y, ballObj.rad); // this ball is instantiating from the below Ball class 
    data.draw(context);
    ballObj.x += ballObj.dx;
    ballObj.y += ballObj.dy;
} // exporting function which takes the properties of the ball
    class Ball {
        constructor(x, y, rad) {
            this.x = x;
            this.y = y;
            this.rad = rad;
        } // it takes the geometry of the ball 
        draw(context) {
            context.beginPath();
            context.fillStyle = "#f42";
            context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
            context.strokeStyle = "#010";
            context.strokeWidth = 2;
            context.fill();
            context.stroke();
        } // properties due to which the ball gets its functioning 
    }
