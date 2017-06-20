#!/usr/bin/env node
'use strict';

const cli = require('cli');
const prompt = require('cli-prompt');

cli.parse(null, ['new']);

class Game {
  constructor() {
    this.board = [[0,0,0],[0,0,0],[0,0,0]];
    this.currentPlayer = 1;
  }

  play() {
    console.log('\nNow it\'s player #' + this.currentPlayer + '\'s turn');
    prompt('Please enter your move, in the format of 2a: ', (val) => {
      if (val.length !== 2) {
        console.log('Invalid Move!');
        this.play(); 
        return; 
      }
      let x = val[0] - 1;
      let y;
      if (val[1] === 'a') y = 0;
      else if (val[1] === 'b') y = 1;
      else if (val[1] === 'c') y = 2;
      else {
        console.log('Invalid Move!');
        this.play(); 
        return;       
      }

      if(!this.toggle(x, y)) {
        console.log('Invalid Move!');
        this.play();
        return;
      }
      
      if (this.isPlayerWin()) {
        this.displayBoard();
        console.log('Player #' + this.currentPlayer + ' WIN!');
      }
      else {
        this.displayBoard();
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.play();
      }
    })
  }

  displayBoard() {
    console.log('\n  | a | b | c |');
    console.log('---------------');
    for (let i = 0; i < 3; i++) {
      let row = this.board[i];
      process.stdout.write((i + 1) + ' | ');
      for (let element of row) {
        let piece;
        if (element === 1) piece = 'O';
        else if (element === 2) piece = 'X';
        else piece = ' ';
        process.stdout.write(piece + ' | ');
      }
      console.log('\n---------------');
    }
  }

  toggle(x, y) {
    if (this.board[x][y]) return false;
    else {
      this.board[x][y] = this.currentPlayer;
      return true;
    }
  }
  
  isPlayerWin() {
    for (let i = 0; i < 3; i++) {
      if (this.winInRow(i)) return true;
    }
    for (let j = 0; j < 3; j++) {
      if (this.winInCol(j)) return true;
    }
    if (this.winInDiagonal()) return true;
    return false;
  }

  winInRow(row) {
    for (let piece of this.board[row]) {
      if (piece !== this.currentPlayer) return false;
    }
    return true;
  }

  winInCol(col) {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][col] !== this.currentPlayer) return false;
    }
    return true;
  }

  winInDiagonal() {
    let i = 0, j = 0, x = 0, y = 2;
    while (i < 3 && j < 3) {
      if (this.board[i++][j++] !== this.currentPlayer) return false;
    }
    while (x < 3 && y >= 0) {
      if (this.board[x++][y--] !== this.currentPlayer) return false;
    }
    return true;
  }
}

if (cli.command === 'new') {
  console.log('\n--------- New Game! ---------\n');
  let game = new Game();
  game.displayBoard();
  game.play();
}
