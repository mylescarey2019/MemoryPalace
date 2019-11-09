import React from 'react';
import './style.css';
import '../../App.css';


export default function Message(props) {
  // console.log(props);
  return (
    <div>
      <p id={props.id} className="card-text info-field">{props.msgTxt}</p>
    </div>  
  );
};
