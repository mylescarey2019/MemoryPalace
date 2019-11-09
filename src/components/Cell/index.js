import React from 'react';
import "./style.css";

export default function Cell(props) {
  // console.log(props);
  return (
    <div  className="game-cell" onClick={() => props.clickSymbol(props.symbol)}>
      <p className={props.elemClass}>{props.symbol}</p>
    </div>
  )
}
