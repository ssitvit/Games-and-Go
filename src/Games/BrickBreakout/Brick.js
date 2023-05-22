import React from 'react'

export default function Brick(level, bricks, canvas, brick) {
    brick.width = canvas.width / 5 - 1;

    let newbricks = [];
    if (!bricks) {
        return [];
    }
    if (bricks.length >=  5 * level) {
        return;
    } // if all the rows are filled

    console.log(bricks.y);

    // brick wall formation here 
    for (let i = 0; i < 5 * level; i++) {
        let newBrick = new SingleBrick(
            brick.x + brick.width,
            brick.y,
            brick.width,
            brick.height,
            brick.colors
        );
        newbricks.push(newBrick);
        // newBrick.draw();
        brick.x += brick.width + 1;
        if (brick.x + brick.width >= canvas.width) {
            brick.x = 0.5;
            brick.y += brick.height + 1;
        }
    }
    // console.log(newbricks);
    return newbricks;
}

class SingleBrick {
    constructor(x, y, w, h, c) {
        this.x = x - w;
        this.y = y;
        this.width = w;
        this.height = h;
        this.colors = c;
        this.broke = false;
    } // brick geometry
    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        // context.fllStyle = this.broke ? "#134959" : this.colors[1];
        context.fllStyle = this.broke ? "rgba(19, 73, 89, 0)" : this.colors[1];
        context.lineWidth = 5;
        // context.strokeStyle = this.broke ? "#134959" : "#134959";
        context.strokeStyle = this.broke ? "rgba(19, 73, 89, 0)" : "transparent";
        // context.fllStyle = this.broke ? "#134959" : this.colors[1];
        // context.shadowBlur = 0;
        // context.shadowColor = "#33f";
        context.fill();
        context.strokeRect(this.x, this.y, this.width, this.height);
    } // brick functioning
}