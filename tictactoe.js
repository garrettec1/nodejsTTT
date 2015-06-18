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
    return(board_index);
};

//Some repeated code here for row and column. Function it?
// Finds if this is a move that exists on the board
Game_Board.prototype._check_move = function(move){
    var row = move.charAt(0);
    var column = move.charAt(1);
    // I am aware there are some really cool functional ways to do this.
    // I will try to figure them out later.
    return((row == 1 || row == 2 || row == 3) &&
           (column == 'a' || column == 'b' || column =='c'));
};

Game_Board.prototype._is_move_index_empty = function(move_index){
    return(this.board[move_index] == ' ');
};

Game_Board.prototype.make_move = function(move, piece){
    if (this._check_move(move)){
        var move_index = this._find_index(move);
        if (this._is_move_index_empty(move_index)){
            this.board[move_index] = piece;
        }
        return(true);
    } else{
        return(false);
    }

};

var testing = new Game_Board();
testing.display_board();
console.log('1a');
testing.make_move('1a','X');
testing.display_board();
console.log('2a');
testing.make_move('2a','X');
testing.display_board();
console.log('2a');
console.log(testing.make_move('2a','X'));
testing.display_board();
console.log('4a');
console.log(testing.make_move('4a','X'));
testing.display_board();
console.log('1G');
console.log(testing.make_move('1G','X'));
testing.display_board();
console.log('2');
console.log(testing.make_move('2','X'));
testing.display_board();
