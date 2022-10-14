import React from 'react'
import '../Styles/chessboard.css'

function ChessBoard() {

  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontalAxis = ["A","B","C","D","E","F","G","H"];

  let board = [];

  for( let j = verticalAxis.length-1 ; j >= 0  ; j--){
    for( let i = 0; i < horizontalAxis.length ; i++){

      const number = j + i + 2;

      board.push( 
        <div className={number % 2 === 0 ? 'tile black-tile' : 'tile white-tile' }></div>
       )
    }
  }

  return (
    <div className='chessboard'>{board}</div>
  )
}

export default ChessBoard