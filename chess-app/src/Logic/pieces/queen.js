import isOpponentPiece from '../utils/helpers';

export default function getQueenMoves(x, y, color, board) {
  const moves = [];

  const directions = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],   // Diagonals (Bishop)
    [-1, 0], [1, 0], [0, -1], [0, 1]      // Straights (Rook)
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
        break; // Blocked by any piece
      }

      nx += dx;
      ny += dy;
    }
  }

  return moves;
}
