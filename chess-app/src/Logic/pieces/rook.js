import isOpponentPiece from '../utils/helpers';

export default function getRookMoves(x, y, color, board) {
  const moves = [];
  const directions = [
    [-1, 0], [1, 0],  
    [0, -1], [0, 1]   
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
        break;
      }

      nx += dx;
      ny += dy;
    }
  }

  return moves;
}
