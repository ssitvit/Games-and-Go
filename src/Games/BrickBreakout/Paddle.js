import React from 'react'

export default (context, canvas, paddleProps) => {
    class Paddle{
        constructor(x) {
            this.x = x;
            this.y = canvas.height - 30;
            this.height = 20;
            this.width = paddleProps.width;
            this.colors = ["#f32", "#ffa62b"];
        } // geometry of the paddle
        move(){
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.fillStyle = this.broke ? "#fff" : this.colors[1];
            context.strokeStyle = this.broke ? "#000" : this.colors[0];
            context.lineWidth = 1;
            context.shadowBlur = 0;
            context.shadowColor = "#33f";
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.fill();
        } // functioning of the paddle
    }

    let paddle = new Paddle(paddleProps.x);
    paddle.move();
    if (paddleProps.x <= 0) {
        paddleProps.x = 0;
    } else if (paddleProps.x + paddleProps.width >= canvas.width) {
        paddleProps.x = canvas.width - paddleProps.width;
    } // setting boundary limits 
};


