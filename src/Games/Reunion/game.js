/*
// canvas width = 480
// canvas height = 640
// 48 x 64 matrix
//
// sizeof arena is 42 * 
*/

//getting the canvas and its context
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let splashAnimationFrameId;
let pikuAnimationFrameId;
let updatePiecesAnimationFrameId;
let gameLevel = 1;
let platform = createLevel(gameLevel);
let arena = createMatrix(42, 44, 0);
let totalLevel = 9;

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


//defining the characters piku and chiku
var piku = {
	pos: { x: 0, y: 0},
	matrix: pikuMatrix,
}

var chiku = {
	pos: {x: 0, y: 0},
	matrix: chikuMatrix,
}

context.scale(10,10);

context.fillStyle = '#212121';
context.fillRect(0, 0, canvas.width, canvas.height);

var pikuMatrix = [
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				];

var chikuMatrix = [
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				];

function createLevel(level) {
	let platform;
	if( level === 1) {
		platform = createMatrix(48, 20, 1);
		//T
		platform[0][7] = platform[0][8] = platform[0][9] = platform[1][8] = 0;
		//I
		platform[0][21] = platform[0][22] = platform[1][21] = platform[1][22] = 0;
		platform[0][37] = platform[1][37] = platform[2][37] = platform[3][37] = 0;

		return platform;

	} else if( level === 2) {
		platform = createMatrix(48, 20, 1);
		//O
		platform[0][20] = platform[0][21] = 0;
		platform[1][20] = platform[1][21] = 0;
		//O
		platform[0][23] = platform[0][24] = 0;
		platform[1][23] = platform[1][24] = 0;
		//I
		platform[0][7] = platform[1][7] = platform[2][7] = platform[3][7] = 0;
		platform[0][37] = platform[1][37] = platform[2][37] = platform[3][37] = 0;

		return platform;

	} else if( level === 3) {
		platform = createMatrix(48, 20, 1);
		//I
		platform[0][17] = platform[1][17] = platform[2][17] = platform[3][17] = 0;
		platform[4][17] = platform[5][17] = platform[6][17] = platform[7][17] = 0;
		platform[8][17] = platform[9][17] = platform[10][17] = platform[11][17] = 0;
		platform[12][17] = platform[13][17] = platform[14][17] = platform[15][17] = 0;
		//I
		platform[0][25] = platform[1][25] = platform[2][25] = platform[3][25] = 0;
		platform[4][25] = platform[5][25] = platform[6][25] = platform[7][25] = 0;
		platform[8][25] = platform[9][25] = platform[10][25] = platform[11][25] = 0;
		platform[12][25] = platform[13][25] = platform[14][25] = platform[15][25] = 0;
		//O
		platform[0][15] = platform[0][16] = 0;
		platform[1][15] = platform[1][16] = 0;

		platform[0][26] = platform[0][27] = 0;
		platform[1][26] = platform[1][27] = 0;

		return platform;

	} else if( level === 4) {
		platform = createMatrix(48, 20, 1);
		//O
		platform[0][15] = platform[0][16] = 0;
		platform[1][15] = platform[1][16] = 0;
		platform[2][15] = platform[2][16] = 0;
		platform[3][15] = platform[3][16] = 0;
		platform[4][15] = platform[4][16] = 0;
		platform[5][15] = platform[5][16] = 0;
		platform[6][15] = platform[6][16] = 0;
		platform[7][15] = platform[7][16] = 0;
		platform[8][15] = platform[8][16] = 0;
		platform[9][15] = platform[9][16] = 0;
		platform[10][15] = platform[10][16] = 0;
		platform[11][15] = platform[11][16] = 0;
		platform[12][15] = platform[12][16] = 0;
		platform[13][15] = platform[13][16] = 0;
		platform[14][15] = platform[14][16] = 0;
		platform[15][15] = platform[15][16] = 0;

		//O
		platform[0][26] = platform[0][27] = 0;
		platform[1][26] = platform[1][27] = 0;
		platform[2][26] = platform[2][27] = 0;
		platform[3][26] = platform[3][27] = 0;
		platform[4][26] = platform[4][27] = 0;
		platform[5][26] = platform[5][27] = 0;
		platform[6][26] = platform[6][27] = 0;
		platform[7][26] = platform[7][27] = 0;
		platform[8][26] = platform[8][27] = 0;
		platform[9][26] = platform[9][27] = 0;
		platform[10][26] = platform[10][27] = 0;
		platform[11][26] = platform[11][27] = 0;
		platform[12][26] = platform[12][27] = 0;
		platform[13][26] = platform[13][27] = 0;
		platform[14][26] = platform[14][27] = 0;
		platform[15][26] = platform[15][27] = 0;

		//T
		platform[0][20] = platform[0][21] = platform[0][22] = platform[1][21] = 0;
		//I
		platform[2][21] = platform[3][21] = platform[4][21] = platform[5][21] = 0;

		return platform;

	} else if( level === 5) {
		platform = createMatrix(48, 20, 1);

		//L
		platform[0][9] = platform[1][9] = platform[2][9] = platform[2][10] = 0;
		platform[0][33] = platform[1][33] = platform[2][33] = platform[2][32] = 0;

		//O
		platform[0][10] = platform[0][11] = 0;
		platform[1][10] = platform[1][11] = 0;
		platform[0][31] = platform[0][32] = 0;
		platform[1][31] = platform[1][32] = 0;

		return platform;

	}	else if( level === 6 ) {
		platform = createMatrix(48, 20, 1);

		platform = createMatrix(48, 20, 1);

		//L
		platform[4][9] = platform[5][9] = platform[6][9] = platform[6][10] = 0;
		platform[4][33] = platform[5][33] = platform[6][33] = platform[6][32] = 0;

		//O
		platform[0][10] = platform[0][11] = 0;
		platform[1][10] = platform[1][11] = 0;
		platform[2][10] = platform[2][11] = 0;
		platform[3][10] = platform[3][11] = 0;
		platform[4][10] = platform[4][11] = 0;
		platform[5][10] = platform[5][11] = 0;

		platform[0][31] = platform[0][32] = 0;
		platform[1][31] = platform[1][32] = 0;
		platform[2][31] = platform[2][32] = 0;
		platform[3][31] = platform[3][32] = 0;
		platform[4][31] = platform[4][32] = 0;
		platform[5][31] = platform[5][32] = 0;

		//I
		platform[0][9] = platform[1][9] = platform[2][9] = platform[3][9] = 0;
		platform[0][33] = platform[1][33] = platform[2][33] = platform[3][33] = 0;

		return platform;

	} else if( level === 7 ) {
		platform = createMatrix(48, 20, 1);

		//O
		platform[0][10] = platform[0][11] = 0;
		platform[1][10] = platform[1][11] = 0;
		platform[0][12] = platform[0][13] = 0;
		platform[1][12] = platform[1][13] = 0;
		//T
		platform[2][11] = platform[2][12] = platform[2][13] = platform[3][12] = 0;
		platform[0][31] = platform[0][32] = platform[0][33] = platform[1][32] = 0;
		platform[0][36] = platform[0][37] = platform[0][38] = platform[1][37] = 0;
		//I
		platform[2][32] = platform[3][32] = platform[4][32] = platform[5][32] = 0;
		platform[2][37] = platform[3][37] = platform[4][37] = platform[5][37] = 0;
		platform[6][32] = platform[7][32] = platform[8][32] = platform[9][32] = 0;
		platform[6][37] = platform[7][37] = platform[8][37] = platform[9][37] = 0;
		//O
		platform[0][34] = platform[0][35] = 0;
		platform[1][34] = platform[1][35] = 0;
		platform[2][34] = platform[2][35] = 0;
		platform[3][34] = platform[3][35] = 0;
		platform[4][34] = platform[4][35] = 0;
		platform[5][34] = platform[5][35] = 0;
		platform[6][34] = platform[6][35] = 0;
		platform[7][34] = platform[7][35] = 0;
		platform[8][34] = platform[8][35] = 0;
		platform[9][34] = platform[9][35] = 0;

		return platform;

	} else if( level === 8 ) {
		platform = createMatrix(48, 20, 1);
		//L
		platform[0][10] = platform[1][10] = platform[2][10] = platform[2][11] = 0;
		platform[0][33] = platform[1][33] = platform[2][33] = platform[2][34] = 0;

		//J
		platform[0][13] = platform[1][13] = platform[2][13] = platform[2][12] = 0;
		platform[0][36] = platform[1][36] = platform[2][36] = platform[2][35] = 0;

		//O
		platform[0][11] = platform[0][12] = 0;
		platform[1][11] = platform[1][12] = 0;
		platform[0][34] = platform[0][35] = 0;
		platform[1][34] = platform[1][35] = 0;

		platform[0][18] = platform[0][19] = 0;
		platform[1][18] = platform[1][19] = 0;
		platform[0][23] = platform[0][24] = 0;
		platform[1][23] = platform[1][24] = 0;

		//T
		platform[0][20] = platform[0][21] = platform[0][22] = platform[1][21] = 0;
		//I
		platform[1][20] = platform[2][20] = platform[3][20] = platform[4][20] = 0;
		platform[5][20] = platform[6][20] = platform[7][20] = platform[8][20] = 0;
		platform[9][20] = platform[10][20] = platform[11][20] = platform[12][20] = 0;

		platform[1][22] = platform[2][22] = platform[3][22] = platform[4][22] = 0;
		platform[5][22] = platform[6][22] = platform[7][22] = platform[8][22] = 0;
		platform[9][22] = platform[10][22] = platform[11][22] = platform[12][22] = 0;

		platform[0][4] = platform[1][4] = platform[2][4] = platform[3][4] = 0;
		platform[4][4] = platform[5][4] = platform[6][4] = platform[7][4] = 0;
		platform[8][4] = platform[9][4] = platform[10][4] = platform[11][4] = 0;
		platform[12][4] = platform[13][4] = platform[14][4] = platform[15][4] = 0;

		platform[0][43] = platform[1][43] = platform[2][43] = platform[3][43] = 0;
		platform[4][43] = platform[5][43] = platform[6][43] = platform[7][43] = 0;
		platform[8][43] = platform[9][43] = platform[10][43] = platform[11][43] = 0;
		platform[12][43] = platform[13][43] = platform[14][43] = platform[15][43] = 0;		


		return platform;

	} else if( level === 9 ) {
		platform = createMatrix(48, 20, 1);

			//O
		platform[0][11] = platform[0][12] = 0;
		platform[1][11] = platform[1][12] = 0;
		platform[2][11] = platform[2][12] = 0;
		platform[3][11] = platform[3][12] = 0;
		platform[4][11] = platform[4][12] = 0;
		platform[5][11] = platform[5][12] = 0;
		platform[6][11] = platform[6][12] = 0;
		platform[7][11] = platform[7][12] = 0;
		platform[8][11] = platform[8][12] = 0;
		platform[9][11] = platform[9][12] = 0;
		platform[10][11] = platform[10][12] = 0;
		platform[11][11] = platform[11][12] = 0;
		platform[12][11] = platform[12][12] = 0;
		platform[13][11] = platform[13][12] = 0;
		platform[14][11] = platform[14][12] = 0;
		platform[15][11] = platform[15][12] = 0;

		platform[0][34] = platform[0][35] = 0;
		platform[1][34] = platform[1][35] = 0;
		platform[2][34] = platform[2][35] = 0;
		platform[3][34] = platform[3][35] = 0;
		platform[4][34] = platform[4][35] = 0;
		platform[5][34] = platform[5][35] = 0;
		platform[6][34] = platform[6][35] = 0;
		platform[7][34] = platform[7][35] = 0;
		platform[8][34] = platform[8][35] = 0;
		platform[9][34] = platform[9][35] = 0;
		platform[10][34] = platform[10][35] = 0;
		platform[11][34] = platform[11][35] = 0;
		platform[12][34] = platform[12][35] = 0;
		platform[13][34] = platform[13][35] = 0;
		platform[14][34] = platform[14][35] = 0;
		platform[15][34] = platform[15][35] = 0;


		//I
		platform[12][10] = platform[13][10] = platform[14][10] = platform[15][10] = 0;
		platform[8][10] = platform[9][10] = platform[10][10] = platform[11][10] = 0;
		platform[4][10] = platform[5][10] = platform[6][10] = platform[7][10] = 0;
		platform[0][10] = platform[1][10] = platform[2][10] = platform[3][10] = 0;

		platform[12][13] = platform[13][13] = platform[14][13] = platform[15][13] = 0;
		platform[8][13] = platform[9][13] = platform[10][13] = platform[11][13] = 0;
		platform[4][13] = platform[5][13] = platform[6][13] = platform[7][13] = 0;
		platform[0][13] = platform[1][13] = platform[2][13] = platform[3][13] = 0;

		platform[12][33] = platform[13][33] = platform[14][33] = platform[15][33] = 0;
		platform[8][33] = platform[9][33] = platform[10][33] = platform[11][33] = 0;
		platform[4][33] = platform[5][33] = platform[6][33] = platform[7][33] = 0;
		platform[0][33] = platform[1][33] = platform[2][33] = platform[3][33] = 0;

		platform[12][36] = platform[13][36] = platform[14][36] = platform[15][36] = 0;
		platform[8][36] = platform[9][36] = platform[10][36] = platform[11][36] = 0;
		platform[4][36] = platform[5][36] = platform[6][36] = platform[7][36] = 0;
		platform[0][36] = platform[1][36] = platform[2][36] = platform[3][36] = 0;




		return platform;
		
	} /*else if( level === 10 ) {
		platform = createMatrix(48, 20, 1);

		return platform;
		
	} else if( level === 11 ) {
		platform = createMatrix(48, 20, 1);

		return platform;
		
	} else if( level === 12 ) {
		platform = createMatrix(48, 20, 1);

		return platform;
		
	} else if( level === 13 ) {
		platform = createMatrix(48, 20, 1);

		return platform;
		
	}*/
}


//creating the base matrix to store basic platform
function createMatrix(w, h, visual) {
	const matrix = [];
	while(h--) {
		matrix.push( new Array(w).fill(visual) );
	}
	return matrix;
}

function drawArena(matrix) {
	matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = "#D50000";
				context.fillRect(x + 3, y, 1, 1);
			}
		});
	});
}

//drawing the platform
function drawPlatform(matrix) {
	matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = '#C5CAE9';
				context.fillRect(x, y + 44 ,1 ,1);
			}
		});
	});
}

function drawPikuChiku(pikuOffset) {
	pikuMatrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = '#FFCCBC';
				context.fillRect(x + pikuOffset.x , y + 38, 1, 1);
			}
		});
	});

	chikuMatrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = '#C8E6C9';
				context.fillRect(x + 45, y + 38, 1, 1);
			}
		});
	});

	//eyes for piku
	context.fillStyle = '#000';
	context.fillRect(0.5 + pikuOffset.x, 39, 0.5, 0.5);
	context.fillRect(1.5 + pikuOffset.x, 39, 0.5, 0.5);
	
	//legs for piku
	context.fillStyle = '#FFCCBC';
	context.fillRect(0.5 + pikuOffset.x, 43, 0.5, 0.5);
	context.fillRect(0.5 + pikuOffset.x, 43.5, 0.5, 0.5);
	context.fillRect(1.7 + pikuOffset.x, 43, 0.5, 0.5);
	context.fillRect(1.7 + pikuOffset.x, 43.5, 0.5, 0.5);

	//eyes for chiku
	context.fillStyle = '#000';
	context.fillRect(47, 39, 0.5, 0.5);
	context.fillRect(46, 39, 0.5, 0.5);

	//legs for chiku
	context.fillStyle = '#C8E6C9';   
	context.fillRect(47, 43, 0.5, 0.5);
	context.fillRect(47, 43.5, 0.5, 0.5);
	context.fillRect(45.8, 43, 0.5, 0.5);
	context.fillRect(45.8, 43.5, 0.5, 0.5);

}


function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    context.fillStyle = "#CFD8DC";
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
}

function drawScreenInterval(text) {
	context.fillStyle = '#212121';
	context.globalAlpha = 0.9;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1.0;

	roundedRect(context, 11, 20, 25, 20, 2);

	context.fillStyle = "#263238";
	let textXpos = 11 + ( (25 - text.length) / 2 )
	context.fillText(text, textXpos, 31);
}

function draw() {
	context.fillStyle = '#212121';
	context.fillRect(0, 0, canvas.width, canvas.height);

	//drawArena(arena, 3);
	drawArena(arena);
	drawPlatform(platform);
	drawPikuChiku(piku.pos);
}

var pikuInterval = 100;
var pikuMotionCounter = 0;
var lastTimePiku = 0;

function update(time = 0) {
	

	var deltaTimePiku = time - lastTimePiku;
	lastTimePiku = time;

	pikuMotionCounter += deltaTimePiku;
	if(pikuMotionCounter > pikuInterval) {
		piku.pos.x++;
		pikuMotionCounter = 0;
	}

	if(piku.pos.x < 43){
		draw();
		requestAnimationFrame(update);
	} else if(piku.pos.x >= 43) {
		//put a level screen
		//pikuAfterAnimation();

		cancelAnimationFrame( pikuAnimationFrameId );
		cancelAnimationFrame( updatePiecesAnimationFrameId );

		draw();
		audioPlayer.src = endSoundURL;
		audioPlayer.play();
		drawScreenInterval("Chapter Completed");
		window.setTimeout( 'pikuAfterAnimation()', 1000 );
	}

	//in the else part, next level should be drawn
	//in the else part, have to put a love sign b/w piku and chiku
}

function pikuAfterAnimation() {
	gameLevel++;
	if(gameLevel > totalLevel) {
		drawEndScreen();
	} else {
		platform = createLevel(gameLevel);
		piku.pos.x = 0;

		draw();
		audioPlayer.src = startSoundURL;
		audioPlayer.play();
		drawScreenInterval("Chapter: " + gameLevel);
		window.setTimeout( 'draw()', 1000 );
	}
}

let splashMotionCounter = 0;
let splashLastTime = 0;
let splashInterval = 500;
let splasColorFlag = true;

function updateSplash(time = 0) {
	let splashDeltaTime = time - splashLastTime;
	splashLastTime = time;

	splashMotionCounter += splashDeltaTime;
	if(splashMotionCounter > splashInterval) {
		if(splasColorFlag) {
			drawSplash("#4FC3F7");
			splasColorFlag = false;
		} else {
			drawSplash("#FFF176");
			splasColorFlag = true;
		}
		splashMotionCounter = 0;
	}

	splashAnimationFrameId = requestAnimationFrame(updateSplash);
}


function drawSplash(color) {
	context.fillStyle = '#212121';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "#fff";

	context.font = "2.2pt Cornerstone";
	context.fillText("Reunion", 16, 15);

	context.font = "1.2pt Cornerstone"
	context.fillText("Build the road and help", 14, 22);
	context.fillText("two lost friends to reunite", 14, 24);

	context.fillStyle = color;
	context.font = "1.6pt Cornerstone";
	context.fillText("Press SpaceBar to play", 14, 50);drawPikuChiku(piku.pos);
	context.fillText("Developed By DURGESH4993", 10, 55);drawPikuChiku(piku.pos);

	drawPikuChiku(piku.pos);
}

function drawEndScreen() {
	context.fillStyle = '#212121';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "#fff";
	context.font = "2.2pt Cornerstone";
	context.fillText("The End", 16, 15);

	context.font = "1.5pt Cornerstone"
	context.fillText("You helped to lost friends to reunite", 9, 22);
	//context.fillText("two lost friends to meet", 14, 24);

}

// jsfxr:
function SfxrParams(){this.setSettings=function(e){for(var f=0;24>f;f++)this[String.fromCharCode(97+f)]=e[f]||0;0.01>this.c&&(this.c=0.01);e=this.b+this.c+this.e;0.18>e&&(e=0.18/e,this.b*=e,this.c*=e,this.e*=e)}}
function SfxrSynth(){this._params=new SfxrParams;var e,f,d,g,l,z,J,K,L,A,m,M;this.reset=function(){var c=this._params;g=100/(c.f*c.f+0.001);l=100/(c.g*c.g+0.001);z=1-0.01*c.h*c.h*c.h;J=1E-6*-c.i*c.i*c.i;c.a||(m=0.5-c.n/2,M=5E-5*-c.o);K=0<c.l?1-0.9*c.l*c.l:1+10*c.l*c.l;L=0;A=1==c.m?0:2E4*(1-c.m)*(1-c.m)+32};this.totalReset=function(){this.reset();var c=this._params;e=1E5*c.b*c.b;f=1E5*c.c*c.c;d=1E5*c.e*c.e+10;return e+f+d|0};this.synthWave=function(c,N){var a=this._params,O=1!=a.s||a.v,r=0.1*a.v*a.v,
P=1+3E-4*a.w,n=0.1*a.s*a.s*a.s,V=1+1E-4*a.t,W=1!=a.s,X=a.x*a.x,Y=a.g,Q=a.q||a.r,Z=0.2*a.r*a.r*a.r,D=a.q*a.q*(0>a.q?-1020:1020),R=a.p?(2E4*(1-a.p)*(1-a.p)|0)+32:0,$=a.d,S=a.j/2,aa=0.01*a.k*a.k,E=a.a,F=e,ba=1/e,ca=1/f,da=1/d,a=5/(1+20*a.u*a.u)*(0.01+n);0.8<a&&(a=0.8);for(var a=1-a,G=!1,T=0,v=0,w=0,B=0,t=0,x,u=0,h,p=0,s,H=0,b,U=0,q,I=0,C=Array(1024),y=Array(32),k=C.length;k--;)C[k]=0;for(k=y.length;k--;)y[k]=2*Math.random()-1;for(k=0;k<N;k++){if(G)return k;R&&++U>=R&&(U=0,this.reset());A&&++L>=A&&(A=
0,g*=K);z+=J;g*=z;g>l&&(g=l,0<Y&&(G=!0));h=g;0<S&&(I+=aa,h*=1+Math.sin(I)*S);h|=0;8>h&&(h=8);E||(m+=M,0>m?m=0:0.5<m&&(m=0.5));if(++v>F)switch(v=0,++T){case 1:F=f;break;case 2:F=d}switch(T){case 0:w=v*ba;break;case 1:w=1+2*(1-v*ca)*$;break;case 2:w=1-v*da;break;case 3:w=0,G=!0}Q&&(D+=Z,s=D|0,0>s?s=-s:1023<s&&(s=1023));O&&P&&(r*=P,1E-5>r?r=1E-5:0.1<r&&(r=0.1));q=0;for(var ea=8;ea--;){p++;if(p>=h&&(p%=h,3==E))for(x=y.length;x--;)y[x]=2*Math.random()-1;switch(E){case 0:b=p/h<m?0.5:-0.5;break;case 1:b=
1-2*(p/h);break;case 2:b=p/h;b=0.5<b?6.28318531*(b-1):6.28318531*b;b=0>b?1.27323954*b+0.405284735*b*b:1.27323954*b-0.405284735*b*b;b=0>b?0.225*(b*-b-b)+b:0.225*(b*b-b)+b;break;case 3:b=y[Math.abs(32*p/h|0)]}O&&(x=u,n*=V,0>n?n=0:0.1<n&&(n=0.1),W?(t+=(b-u)*n,t*=a):(u=b,t=0),u+=t,B+=u-x,b=B*=1-r);Q&&(C[H%1024]=b,b+=C[(H-s+1024)%1024],H++);q+=b}q=0.125*q*w*X;c[k]=1<=q?32767:-1>=q?-32768:32767*q|0}return N}}var synth=new SfxrSynth;
window.jsfxr=function(e){synth._params.setSettings(e);var f=synth.totalReset();e=new Uint8Array(4*((f+1)/2|0)+44);var f=2*synth.synthWave(new Uint16Array(e.buffer,44),f),d=new Uint32Array(e.buffer,0,44);d[0]=1179011410;d[1]=f+36;d[2]=1163280727;d[3]=544501094;d[4]=16;d[5]=65537;d[6]=44100;d[7]=88200;d[8]=1048578;d[9]=1635017060;d[10]=f;for(var f=f+44,d=0,g="data:audio/wav;base64,";d<f;d+=3)var l=e[d]<<16|e[d+1]<<8|e[d+2],g=g+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>18]+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>12&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>6&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l&63]);d-=f;return g.slice(0,g.length-d)+"==".slice(0,d)};


//draw();
//drawStartLevel();
drawSplash();
updateSplash();
//update();
//draw();
//drawEndScreen();

