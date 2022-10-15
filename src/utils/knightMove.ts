interface Position {
    x: number;
    y: number;
}

export default class Referee {
  isValidMove(px: number, py: number, x: number, y: number) {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        //TOP AND BOTTOM SIDE MOVEMENT
        if (py - y === 2 * i) {
          if (px - x === j) {
            return true;
          }
        }

        //RIGHT AND LEFT SIDE MOVEMENT
        if (px - x === 2 * i) {
          if (py - y === j) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getPossibleKnightMoves(px: number, py: number) {
    const possibleMoves: Position[] = [];

    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        const verticalMove = { x: px + j, y: py + i * 2 };
        const horizontalMove = { x: px + i * 2, y: +py + j };

        possibleMoves.push(verticalMove);
        possibleMoves.push(horizontalMove);
      }
    }
    return possibleMoves;
  }
}
