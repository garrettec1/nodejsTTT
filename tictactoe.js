//Command Line Tic-Tac-Toe game
//Garrett Fuller
//Authored June 2015

var util = require('util');

// rough mock up of board object
// constructor
function Game_Board() {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
}
// class methods
// going to do this in the most straight forward possible way first
Game_Board.prototype.display_board = function(){
    //console.trace();
    console.log(util.format("\n\t  a   b   c"));
    console.log(util.format('\t1 %s | %s | %s', this.board[0], this.board[1],
                            this.board[2]));
    console.log(util.format('\t  ==|===|=='));
    console.log(util.format('\t2 %s | %s | %s', this.board[3], this.board[4],
                            this.board[5]));
    console.log(util.format('\t  ==|===|=='));
    console.log(util.format('\t3 %s | %s | %s', this.board[6], this.board[7],
                            this.board[8]));
};

// Again, keeping it simple for now. I will assume a valid move is passed
Game_Board.prototype.make_move = function(move, piece){
}

var testing = new Game_Board();
testing.display_board();
