/*
// canvas width = 480
// canvas height = 640
// 48 x 64 matrix
//
*/


let piece = 'I';

function createPiece(type) {
	if(type === 'T') {
		return [
				[0, 0, 0],
				[1, 1, 1],
				[0, 1, 0],
				];
	} else if(type === 'O') {
		return [
				[1, 1],
				[1, 1], 
				];
	} else if(type === 'I') {
		return [
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				];
	} else if(type === 'L') {
		return [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 1],
				];
	} else if(type === 'J') {
		return [
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 0],
				];
	} else if(type === 'S') {
		return [
				[0, 1, 1],
				[1, 1, 0],
				[0, 0, 0],
				];
	} else if(type === 'Z') {
		return [
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0],
				];
	}
}

var startSoundURL = jsfxr([0,,0.0484,,0.4694,0.3134,,0.1415,,,,,,0.5451,,,,,1,,,,,0.5]);
var endSoundURL = jsfxr([0,,0.3436,,0.3248,0.3584,,0.3789,,,,,,0.0172,,0.6011,,,1,,,,,0.5]); 
var resetSoundURL = jsfxr([2,,0.4681,0.1602,0.3898,0.2781,,0.0021,0.189,,,-0.7238,,,-0.0617,-0.596,-0.0026,-0.0124,0.3961,-0.7293,-0.7573,0.0522,-0.2574,0.5]);
var audioPlayer = new Audio();


let dropCounter = 0;
let dropInterval = 500;

let lastTime = 0;

function updatePieces(time = 0) {
    const deltaTime = time - lastTime;
	lastTime = time;
	
	dropCounter += deltaTime;
	if(dropCounter > dropInterval) {
		playerDrop();
	}


	draw();
	drawPieces(createPiece(piece), player.pos);
	updatePiecesAnimationFrameId = requestAnimationFrame(updatePieces);
}

document.addEventListener( "keydown", event => {
	if(event.keyCode === 39){              //right arrow
		player.pos.x++;
		if( player.pos.x > 42 ) 
			player.pos.x--;
	} else if(event.keyCode === 37) {      //left arrow
		player.pos.x--;
		if( player.pos.x < 3)
			player.pos.x++;
	} else if(event.keyCode === 40) {      //down arrow
		playerDrop();
	} else if(event.keyCode === 32) {       //space bar
		cancelAnimationFrame( splashAnimationFrameId );
		//gameLevel = 1;
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		draw();
		audioPlayer.src = startSoundURL;
		audioPlayer.play();
		drawScreenInterval("Chapter: " + gameLevel);
		setTimeout('draw()', 1000);
	} else if(event.keyCode === 84) {       // T button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'T';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 79) {       // O button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'O';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 76) {       // L button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'L';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 73) {       // I button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'I';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 74) {       // J button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'J';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 83) {       // S button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'S';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 90) {       // Z button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		player.pos.x = 21;
		player.pos.y = 0;
		piece = 'Z';
		player.matrix = createPiece(piece);
		updatePiecesAnimationFrameId = updatePieces();
	} else if(event.keyCode === 82) {      // R button
		if(gameLevel > totalLevel) {
			document.removeEventListener("keydown",arguments.callee,false);
		}
		platform = createLevel(gameLevel);
		arena = createMatrix(42, 44, 0);
		//reset splash may be given
		audioPlayer.src = resetSoundURL;
		audioPlayer.play();
		draw();
	}
});

function checkMatrices(platform, arena) {
	let platformFlag = true, arenaFlag = true;

	for(let i = 0; i < platform.length; ++i) {
		for(let j = 0; j < platform[i].length; ++j) {
			if( platform[i][j] === 0 ) {
				platformFlag = false;
				break;
			}
		}
	}

	for(let i = 0; i < arena.length; ++i) {
		for(let j = 0; j < arena[i].length; ++j) {
			if( arena[i][j] !== 0 ) {
				arenaFlag = false;
				break;
			}
		}
	}

	if( platformFlag && arenaFlag ) {
		update();
	}

}

function collide(platform, arena, player) {
	const [m, o] = [player.matrix, player.pos];

	for( let y = 0; y < m.length; ++y ) {
		for( let x = 0; x < m[y].length; ++x) {
			if( m[y][x] !== 0 &&
			  ( arena[y+ o.y] && 
			  	arena[y + o.y][x + o.x - 3] !== 0 ) ) {
					return true;
			}

			if( m[y][x] !== 0 &&
			  ( platform[y + o.y - 44] &&
				platform[y + o.y - 44][x + o.x] !== 0) ) {
					return true;
			}
		}
	}
	return false;
}

function drawPieces(matrix, offset) {
	matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value != 0) {
				context.fillStyle = "#D50000";
				context.fillRect(x + offset.x,
								 y + offset.y, 
								 1, 1);
			}
		});
	});
}

function merge(platform, arena, player) {
	player.matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if( value !== 0 && arena[y + player.pos.y]) {
				arena[y + player.pos.y][x + player.pos.x -3] = value;
			}

			if( value !== 0 && platform[y + player.pos.y - 44] ) {
				platform[y + (player.pos.y - 44)][x + player.pos.x] = value; 
			}
		});
	});
}

function playerDrop() {
	player.pos.y++;

	if( collide( platform, arena, player ) ) {
		cancelAnimationFrame( updatePiecesAnimationFrameId );
		player.pos.y--;
		merge(platform, arena, player);
		player.pos.y = 100;
		draw();
		checkMatrices(platform, arena);
	}
	
	dropCounter = 0;
}

let player = {
	pos: { x: 3, y: 0 },
	matrix: createPiece(piece),
}


//drawPlatform(platform);
//drawPieces(tPiece, player.pos);

