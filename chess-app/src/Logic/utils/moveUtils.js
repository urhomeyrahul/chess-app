export function cloneBoard(board) {
    return board.map(row => [...row]);
}

export function applyMove(board, from, to) {

    const newBoard = cloneBoard(board);
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    newBoard[toX][toY] = newBoard[fromX][fromY];
    newBoard[fromX][fromY] = '';
    return newBoard;

}

export function inBounds(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}