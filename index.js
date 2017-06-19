#!/usr/bin/env node
'use strict';

var cli = require('cli');

cli.parse(null, ['new', 'move']);

class Game {
  constructor() {
    this.board = [[0,0,0],[0,0,0],[0,0,0]];
    this.currentPlayer = 1;
  }

  toggle(x, y) {
    if (this.board[x][y]) console.log('Invaild move!');
    else this.board[x][y] = 1;
  }
  
  isPlayerWin() {
    for (let i = 0; i < 3; i++) {
      if (winInRow(i)) return true;
    }
    for (let j = 0; j < 3; j++) {
      if (winInCol(j)) return true;
    }
    if (winInDiagonal()) return true;
    return false;
  }

  winInRow(row) {
    for (let piece of this.board[row]) {
      if (!piece) return false;
    }
    return true;
  }

  winInCol(col) {
    for (let i = 0; i < 3; i++) {
      if (!this.board[i][col]) return false;
    }
    return true;
  }

  winInDiagonal() {
    let i = 0, j = 0, x = 0, y = 2;
    while (i < 3 && j < 3) {
      if (!this.board[i++][j++]) return false;
    }
    while (x < 3 && y >= 0) {
      if (!this.board[x++][y--]) return false;
    }
    return true;
  }
}

console.log('Command is: ' + cli.command);

if (cli.command === 'new') {
  console.log('\n--------- New Game! ---------\n');
  let game = new Game();
  for (let row of game.board) {
    console.log(row);
  }
  console.log('\nNow it\'s player #' + game.currentPlayer + ' turn');
}
