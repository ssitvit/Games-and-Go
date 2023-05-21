import React, { useEffect, useRef } from 'react'
import "./BrickBreakout.css"
import { BallMovement } from './BallMovement';
import data from './BBdata';
import WallCollision from './util/WallCollision';
import Paddle from './Paddle';
import Brick from './Brick';
import BrickCollision from './util/BrickCollision';
let bricks = [];

let  { ballObj, paddleProps, brickObj, player } = data;

export default function Board() {

    const canvasRef = useRef(null); // using useRef() to utilise canvas

    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            
            let newBrickSet = Brick(2, bricks, canvas, brickObj);  
            if (newBrickSet && newBrickSet.length > 0) {
                bricks = newBrickSet;
            } // Assign Bricks


            context.clearRect(0, 0, canvas.width, canvas.height); // to prevent the duplicate

            bricks.map((brick) => {
                return brick.draw(context);
            }); // display bricks

            BallMovement(context,ballObj); // handle ballMovement

            WallCollision(ballObj, canvas); // ball and wall collision

            let brickCollision; //BRick collision

            for (let i = 0; i < bricks.length; i++) {
                brickCollision = BrickCollision(ballObj, bricks[i]);

                if (brickCollision.hit &&  !bricks[i].broke){
                    console.log("collision");
                    if (brickCollision.axis === "X"){
                        ballObj.dx *= -1;
                        bricks[i].broke = true;
                    } else if (brickCollision.axis === "Y"){
                        ballObj.dy *= -1;
                        bricks[i].broke = true;
                    }
                    // player.score += 10; 
                }
            }

            Paddle(context, canvas, paddleProps); // paddle movement

            requestAnimationFrame(render);
        };
        render();
    }, [])

    return (
        <canvas 
            id='canvas' 
            ref={canvasRef}
            onMouseMove={(event) => {paddleProps.x = event.clientX - paddleProps.width / 2 - 350}}
            height="500px" 
            width="800px" 
        />
    )
}
