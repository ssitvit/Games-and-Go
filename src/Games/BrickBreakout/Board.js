import React, { useEffect, useRef } from 'react'
import "./BrickBreakout.css"
import { BallMovement } from './BallMovement';
import data from './BBdata';
import WallCollision from './util/WallCollision';
import Paddle from './Paddle';
import Brick from './Brick';
import BrickCollision from './util/BrickCollision';
import PaddleHit from './util/PaddleHit';
import PlayerStats from './PlayerStats';
import AllBroke from './util/AllBroke';
import ResetBall from './util/ResetBall';

let bricks = [];
let  { ballObj, paddleProps, brickObj, player } = data;

export default function Board() {

    const canvasRef = useRef(null); // using useRef() to utilise canvas

    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            paddleProps.y = canvas.height - 30;
            
            let newBrickSet = Brick(player.level, bricks, canvas, brickObj);  
            if (newBrickSet && newBrickSet.length > 0) {
                bricks = newBrickSet;
            } // Assign Bricks

            
            context.clearRect(0, 0, canvas.width, canvas.height); // to prevent the duplicate
            PlayerStats(context, player, canvas);
            
            bricks.map((brick) => {
                return brick.draw(context);
            }); // display bricks
            
            BallMovement(context,ballObj); // handle ballMovement
            
            AllBroke(bricks, player, canvas, ballObj); // check all bricks broken
            
            if (player.lives === 0) {
                alert("Game over! press ok to restart");
                player.lives = 5;
                player.level = 1;
                player.score = 0;
                ResetBall(ballObj, canvas, paddleProps);
                bricks.length = 0;
            }

            WallCollision(ballObj, canvas, player, paddleProps); // ball and wall collision

            let brickCollision; //BRick collision

            for (let i = 0; i < bricks.length; i++) {
                brickCollision = BrickCollision(ballObj, bricks[i]);

                if (brickCollision.hit &&  !bricks[i].broke){
                    // console.log(brickCollision);
                    if (brickCollision.axis === "X"){
                        ballObj.dx *= -1;
                        bricks[i].broke = true;
                    } else if (brickCollision.axis === "Y"){
                        ballObj.dy *= -1;
                        bricks[i].broke = true;
                    }
                    player.score += 10; 
                }
            }

            Paddle(context, canvas, paddleProps); // paddle movement

            PaddleHit(ballObj, paddleProps); // paddle & ball collision

            requestAnimationFrame(render);
        };
        render();
    }, [])

    return (
        <div>
            <canvas 
                id='canvas' 
                ref={canvasRef}
                onMouseMove={(event) => (
                    paddleProps.x = 
                    event.clientX - 
                    (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) -
                    paddleProps.width / 2 - 10)
                }
                height="500px" 
                width={
                    window.innerWidth < 90 ?
                        window.innerWidth - 20 :
                        window.innerWidth - (window.innerWidth * 20) / 100
                }
            />
        </div>
    )
}
