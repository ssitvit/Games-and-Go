// dynamic data that is going to be used always and also easy to change

export default {
    ballObj: {
        x : 20, // ball x position
        y: 200, // ball y position
        dx: 5, // increment in ball x position
        dy: 5, // increment in ball y position
        rad: 12, // raius of the ball
        speed: 6, // speed of the ball
    }, // properties of the ball
    brickObj: {
        x: 0.5, // brick x position
        y: 50, // brick y position
        // width: 800 /10 - 1, // width of the brick
        height: 20, // height of the brick
        density: 2, // density of the brick
        colors: ["#33f", "#aff"] // colors of the brick
    }, // properties of the brick
    player: {
        name: "name", // name of the player
        lives: 5, // number of lives
        score: 0, // score of the player
        level: 1, // level of the player
    }, // about the player
    paddleProps: {
        height: 20, // height of the paddle
        width: 100, // width of the paddle
        x: 100, // x position of the paddle
        color: "#f90", // color of the paddle
    },
};