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

Game_Board.prototype._find_index = function(move){
};
// Again, keeping it simple for now. I will assume a valid move is passed
// This function is currently doing way too much. Need to do some abstraction
Game_Board.prototype.make_move = function(move, piece){
    var row = move.charAt(0);
    var column = move.charAt(1);
    var board_index = 0;

    board_index = board_index + (row-1)*3;

    if (column == 'a'){
        board_index = board_index + 0;
    }else if (column == 'b'){
        board_index = board_index + 1;
    }else if (column == 'c'){
        board_index = board_index + 2;
    }
}
    return(board_index);
};

// Again, keeping it simple for now. I will assume a valid move is passed
Game_Board.prototype.make_move = function(move, piece){
    var move_index = this._find_index(move);
    this.board[move_index] = piece;
};

var testing = new Game_Board();
testing.display_board();
