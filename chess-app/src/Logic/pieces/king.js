import isOpponentPiece from '../utils/helpers';
import isSquareAttacked from '../utils/isSquareAttacked';

export default function getKingMoves(x, y, color, board) {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  const kingChar = color === 'w' ? 'K' : 'k';
  const opponentColor = color === 'w' ? 'b' : 'w';

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;

    const target = board[nx][ny];
    if (target !== '' && !isOpponentPiece(target, color)) continue;

    const simulatedBoard = JSON.parse(JSON.stringify(board));
    simulatedBoard[x][y] = '';
    simulatedBoard[nx][ny] = kingChar;

    if (!isSquareAttacked(nx, ny, simulatedBoard, opponentColor)) {
      moves.push([nx, ny]);
    }
  }

  return moves;
}
