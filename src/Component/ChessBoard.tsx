import { useRef , useState } from 'react';
import '../Styles/chessboard.css';
import Tiles from './Tiles';
import Referee from "../utils/knightMove";
interface Piece {
  image: string
  x: number
  y: number
  possibleMoves?: Position[]
}

interface Position {
  x: number
  y: number
}

const initialPiece : Piece[] = [
  { 
    image:"../../assets/knight.png", 
    x:4 ,
    y:4
  }
];

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["A","B","C","D","E","F","G","H"];

function ChessBoard() {

  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabX, setGrabX] = useState(0);
  const [grabY, setGrabY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialPiece);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function updatePossibleMoves() {
    setPieces((currentPieces) => {
        return currentPieces.map(p => {
            p.possibleMoves = referee.getPossibleKnightMoves(p.x, p.y);
            return p;
        });
    });
}

function samePosition(cx: number, cy: number, grabx: number, graby: number) {
  return cx === grabx && cy === graby;
}

  function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if(element.classList.contains("chess-piece") && chessboard){
      setGrabX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGrabY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      updatePossibleMoves();
      setActivePiece(element);
    }
  }
  
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }

      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }
  
  function dropPirce(e: React.MouseEvent){
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );


      setPieces((value) => {
        const pieces = value.map((p) => {
          if(p.x === grabX && p.y === grabY) {
            const validMove = referee.isValidMove(grabX, grabY, x, y);

            if(validMove){
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty('top');
              activePiece.style.removeProperty('left');
            }
          }
          return p;
        })
        return pieces
      })

      setActivePiece(null);
    }
  }

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

      let currentPieces = activePiece != null ? pieces.find(p => samePosition(p.x , p.y , grabX , grabY)) : undefined ;
      let highlight = currentPieces?.possibleMoves ? currentPieces.possibleMoves.some(p=> samePosition(p.x, p.y , i , j )) : false;

      board.push(<Tiles key={`${j},${i}`} number={number} image={image} highlight={highlight}/>);
    }
  }

  return (
    <div className='chessboard'
    onMouseDown={(e)=> grabPiece(e) }
    onMouseMove={(e)=> movePiece(e) }
    onMouseUp={(e)=> dropPirce(e) }
    ref={chessboardRef}
    >
        {board}
      </div>
  );
}

export default ChessBoard