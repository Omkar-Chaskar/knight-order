
import '../Styles/chessboard.css'
import Tiles from './Tiles';

interface Piece {
  image: string
  x: number
  y: number
}

const pieces: Piece[] = [];

pieces.push({ image:"../../assets/knight.png", x:0 ,y:0})

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["A","B","C","D","E","F","G","H"];

function ChessBoard() {

  let board = [];

  for( let j = verticalAxis.length-1 ; j >= 0  ; j--){
    for( let i = 0; i < horizontalAxis.length ; i++){

      const number = j + i + 2;

      let image = undefined;

      pieces.forEach(p => {
        if(p.x === i && p.y === j){
          image = p.image;
        }
      })

       board.push(<Tiles key={`${j},${i}`} number={number} image={image}/>);
    }
  }

  return (
    <div className='chessboard'>
        {board}
      </div>
  );
}

export default ChessBoard