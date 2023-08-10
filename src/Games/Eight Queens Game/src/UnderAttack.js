/**
 * Get array of positions of Queens under attack
 *
 * @param position
 * @returns {Array}
 */
export function underAttack(position) {
    let attacked = [];
    let positionArray = Object.keys(position);
    Object.keys(position).forEach(function(square) {
        let paths = getQueenPaths(square);
        if (positionArray.some(r => paths.indexOf(r) >= 0)) {
            attacked.push(square);
        }
    });

    return attacked;
}

export function attackedSquares(position) {
    let attackedSquares = [];
    Object.keys(position).forEach(function(square) {
        getQueenPaths(square).forEach(function(square) {
            if (attackedSquares.indexOf(square) === -1) {
                attackedSquares.push(square);
            }
        });
    });

    return attackedSquares;
}

/**
 * Get all possible attack paths of a Queen
 *
 * @param square
 * @returns {Array}
 */
export function getQueenPaths(square) {
    const col = square.substr(0,1); // Column, File, Letter
    const row = parseInt(square.substr(1,1)); // Row, Rank, Number

    let queenPaths = [];
    let i;

    for (i = 1; i <= 8; i++) { // row
        if (i !== row) {
            queenPaths.push([col] + i);
        }
    }

    for (i = 1; i <= 8; i++) { // column
        if (numberToAlpha(i) !== col) {
            queenPaths.push(numberToAlpha(i) + row);
        }
    }

    if (col !== 'h' && row !== 8) { // diagonal up right
        let colWalk = col;
        let rowStart = row + 1;
        for (let rowWalk = rowStart; rowWalk <= 8; rowWalk++) {
            colWalk = incrementAlpha(colWalk);
            if (colWalk === 'i') {
                break;
            }
            queenPaths.push(colWalk + rowWalk);
        }
    }

    if (col !== 'a' && row !== 8) { // diagonal up left
        let colWalk = col;
        let rowStart = row + 1;
        for (let rowWalk = rowStart; rowWalk <= 8; rowWalk++) {
            colWalk = decrementAlpha(colWalk);
            if (colWalk === '`') { // ascii decimal: a=97 `=96
                break;
            }
            queenPaths.push(colWalk + rowWalk);
        }
    }

    if (col !== 'h' && row !== 1) { // diagonal down right
        let colWalk = col;
        let rowStart = row - 1;
        for (let rowWalk = rowStart; rowWalk >= 1; rowWalk--) {
            colWalk = incrementAlpha(colWalk);
            if (colWalk === 'i') {
                break;
            }
            queenPaths.push(colWalk + rowWalk);
        }
    }

    if (col !== 'a' && row !== 1) { // diagonal down left
        let colWalk = col;
        let rowStart = row - 1;
        for (let rowWalk = rowStart; rowWalk >= 1; rowWalk--) {
            colWalk = decrementAlpha(colWalk);
            if (colWalk === '`') {
                break;
            }
            queenPaths.push(colWalk + rowWalk);
        }
    }

    return queenPaths;
}

/**
 * Convert numbers into chess alphabet
 * @param number
 * @returns {string}
 */
export function numberToAlpha(number) {
    switch (number) {
        case 1: return 'a';
        case 2: return 'b';
        case 3: return 'c';
        case 4: return 'd';
        case 5: return 'e';
        case 6: return 'f';
        case 7: return 'g';
        case 8: return 'h';
        default: return ''; // ERROR
    }
}

/**
 * increment a, b, c, d, e, f, g, h, (i)
 * @param alpha
 * @returns {string}
 */
export function incrementAlpha(alpha) {
    return String.fromCharCode(alpha.charCodeAt(0) + 1);
}

/**
 * decrement h, g, f, e, d, c, b, a, (`)
 * @param alpha
 * @returns {string}
 */
export function decrementAlpha(alpha) {
    return String.fromCharCode(alpha.charCodeAt(0) - 1);
}
