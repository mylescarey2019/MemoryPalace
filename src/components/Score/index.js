import React from 'react';
import './style.css';
import '../../App.css';


export default function Score(props) {
  // console.log(props);
  return (
    <div>
      <p id={props.id} className="card-text info-field">{props.scoreName} {props.score}</p>
    </div>  
  );
};
