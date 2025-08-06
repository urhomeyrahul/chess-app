import isOpponentPiece from '../utils/helpers';

export default function getPawnMoves(x, y, color, board) {
  const moves = [];
  const dir = color === 'w' ? -1 : 1;
  const startRow = color === 'w' ? 6 : 1;

  // Forward move 1 step
  if (board[x + dir]?.[y] === '') {
    moves.push([x + dir, y]);

    // Forward move 2 steps
    if (x === startRow && board[x + 2 * dir]?.[y] === '') {
      moves.push([x + 2 * dir, y]);
    }
  }

  // Capture diagonally left
  if (
    board[x + dir]?.[y - 1] &&
    isOpponentPiece(board[x + dir][y - 1], color)
  ) {
    moves.push([x + dir, y - 1]);
  }

  // Capture diagonally right
  if (
    board[x + dir]?.[y + 1] &&
    isOpponentPiece(board[x + dir][y + 1], color)
  ) {
    moves.push([x + dir, y + 1]);
  }

  return moves;
}
