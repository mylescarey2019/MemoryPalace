import React, { Component } from 'react'
import Score from '../Score';
import Cell from '../Cell';
import Message from '../Message';
import gameSymbols from "../../symbols.json";

var pickedSymbols = [];
var curScr = 0;
var hghScr = 0;

var baseSymbolList =[];
var reloadSymbolList = [];

// console.log(gameSymbols);
gameSymbols.map(symbol => {
  return baseSymbolList.push(symbol.symbol)
});

// console.log(`base symbol list: ${baseSymbolList}`);


export default class Game extends Component {
  state = {
    highScore: 0,
    currentScore: 0,
    msgTxt: "To Play - Select no image twice",
    gameSymbols
  };
  
  

  shuffleSymbols = () => {
    // console.log('in game.shuffleSymbols');
    // clear symbol list and reload from master
    reloadSymbolList.splice(0,reloadSymbolList.length);
    baseSymbolList.forEach(element => {
      reloadSymbolList.push(element);
    });
    // console.log(`reload symbol list ${reloadSymbolList}`); 
    // randomly assign symbols from reloaded list to the state
    this.setState(state => {
      const gameSymbols = state.gameSymbols.map(tile => {
        var nextSymbol = reloadSymbolList[Math.floor(Math.random() * reloadSymbolList.length)];
        reloadSymbolList.splice(reloadSymbolList.indexOf(nextSymbol),1);
        // var rotation = Math.floor(Math.random() * 2);
        var newElemClass = 'game-cell-symbol';
        // have taken out the rotate image component until code can be 
        // refactored to have square tiles
        // rectangle tiles causing problem when the image is rotated because
        // the image in the div ends up with a non-visible box model that extends perpendicular 
        // the containing div.  That in turns allows the hover to act on the wrong tile.

        // switch (rotation) {
        //   case 0: newElemClass += ' rotate90';
        //     break;

        //   case 1: newElemClass += ' rotate180';
        //     break;

        //   case 2: newElemClass += ' rotate180';
        //     break;
        //   default: newElemClass = 'game-cell-symbol'
        //     break;  
        // };

        return {
          "id": tile.id,
          "symbol": nextSymbol,
          // "elemClass": tile.elemClass
          "elemClass": newElemClass
        }
      });
      return {gameSymbols}
    });
 
  }

  // if symbol tile on game is clicked check if used before and update game/state 
  // appropriately 
  clickSymbol = symbol => {
    console.log(`you clicked: ${symbol}`);
    console.log(`high score:  ${this.state.highScore}  current-score: ${this.state.currentScore}`);

    if (pickedSymbols.includes(symbol)) {
      console.log('already picked that one');
      this.setState({ msgTxt: 'Already Picked - Pick another to Play Again'});
      this.setState({ currentScore: 0});
      // this.setState({ pickedSymbols: []});
      pickedSymbols = [];
      curScr = 0;
      // need to shuffle the game symbols
    } else {
      console.log("that one is a new one");
      this.setState({ msgTxt: ''});
      this.setState({currentScore: this.state.currentScore + 1});
      curScr++;
      pickedSymbols.push(symbol);
      console.log(`picked symbol list: ${pickedSymbols}`);
    };

    // console.log('time to shuffle the symbol array');
    this.shuffleSymbols();

    console.log(`length of picked symbols array: ${pickedSymbols.length}`);
    // if pickedSymbols is not empty then a new symbol was found
    // otherwise a repeat was picked so game was restarted
    // set set accordingly
    // if still playing current game check to see if new High Score
    // else time to reset game board
    if (pickedSymbols.length > 0) {
      if (pickedSymbols.length === 16) {
        this.setState({highScore: curScr});
        hghScr = curScr;
        this.setState({ msgTxt: '16 for 16 - Perfect Score !'});
        pickedSymbols = [];
        // commenting this out to allow player to keep scoring past 16 
        // this.setState({currentScore: 0});
      } else if (curScr > hghScr) {
        this.setState({highScore: curScr});
        hghScr = curScr;
        console.log("new high score");
        this.setState({ msgTxt: 'That is a new High Score'});
      }
    };
    

    // console.log(`Picked Symbols: ${pickedSymbols}`);
    // // console.log(`UPDATED: high score:  ${this.state.highScore}  current-score: ${this.state.currentScore}`);
    // console.log(`UPDATED: high score:  ${hghScr}  current-score: ${curScr}`);
  };

  
  render() {
    return (
      <div className="main-div">
        <Score id="high-score" scoreName='High Score:' score={this.state.highScore} />
        <Score id="current-score" scoreName='Current Score:' score={this.state.currentScore} />
        <Message id="message" msgTxt={this.state.msgTxt} />
        {/* need to add a Key prop here */}
        {this.state.gameSymbols.map(symbol => (
          <Cell
            key={symbol.id}
            elemClass={symbol.elemClass}
            symbol={symbol.symbol}
            clickSymbol={this.clickSymbol}
          />
        ))}
      </div>
    )
  }
}
