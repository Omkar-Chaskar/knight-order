import "../Styles/tiles.css";

interface Props {
  image?: string;
  number: number;
  highlight: boolean;
}

function Tiles({ number , image , highlight}: Props) {
    const className: string = ["tile",
      number % 2 === 0 && "black-tile",
      number % 2 !== 0 && "white-tile",
      image && "chess-piece-tile",
      highlight && "tile-highlight"
    ].filter(Boolean).join(' ');
  
  return (
    <div className={className}>
      {image && <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>}
    </div>
  );
}

export default Tiles