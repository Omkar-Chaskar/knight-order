import "../Styles/tiles.css";

interface Props {
  image?: string;
  number: number;
}

function Tiles({ number , image }: Props) {
    const className: string = ["tile",
      number % 2 === 0 && "black-tile",
      number % 2 !== 0 && "white-tile",
      image && "chess-piece-tile"
    ].filter(Boolean).join(' ');
  
  return (
    <div className={className}>
      <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>
    </div>
  );
}

export default Tiles