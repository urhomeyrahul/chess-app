import isOpponentPiece from '../utils/helpers';

export default function getQueenMoves(x, y, color, board) {
  const moves = [];

  // All 8 directions (bishop + rook)
  const directions = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],  // diagonal
    [-1, 0], [1, 0], [0, -1], [0, 1]     // straight
  ];

  for (const [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;

    while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      const target = board[nx][ny];

      if (target === '') {
        moves.push([nx, ny]);
      } else {
        if (isOpponentPiece(target, color)) {
          moves.push([nx, ny]);
        }
        break; // blocked
      }

      nx += dx;
      ny += dy;
    }
  }

  return moves;
}
