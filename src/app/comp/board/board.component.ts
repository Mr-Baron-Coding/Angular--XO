import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares!: any[];
  movesLeft!: number;
  xIsNext!: boolean;
  winner!: string;
  draw: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  
  newGame() {
    this.squares = Array(9).fill(null);
    this.movesLeft = 9;
    this.winner = '';
    this.xIsNext = true;
    this.draw = false;
   }
  
   get player() {
    return this.xIsNext ? 'X' : 'O';
   }
  
   makeMove(idx: number) {
    if(!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.movesLeft = this.movesLeft - 1;
      this.xIsNext = !this.xIsNext;
      
    }
    this.winner = this.caclulateWinner();
    
   }
  
   caclulateWinner() {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
      for(let i=0; i<lines.length; i++) {
        const [a,b,c] = lines[i];
        if (
          this.squares[a] &&
          this.squares[a] === this.squares[b] && 
          this.squares[a] === this.squares[c]
        ) {
          setTimeout(() => this.newGame(),3000);
          return this.squares[a];
        }
      }
      if (this.movesLeft === 0) {
        this.draw = true;
        setTimeout(() => this.newGame(),3000);
      }  
      return null;
    }
}
