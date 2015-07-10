//Command Line Tic-Tac-Toe game
//Garrett Fuller
//Authored June 2015

// for use with .format
var util = require('util');

// constructor
// Instantiates an empty game board.
function Game_Board() {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
}


// class methods
// returns the state of a board index. Yay abstraction!
Game_Board.prototype.get_board_index_state = function(board_index){
    return (this.board[board_index]);
};

// Displays the game board. Currently not very pretty
Game_Board.prototype.display_board = function(){
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

// Checks to ensure the space is empty and available to take a move.
Game_Board.prototype._is_move_index_empty = function(move_index){
    return(this.board[move_index] == ' ');
};

// Takes a move string param eg '1a' and a piece 'X' or 'O' from Player
// Returns Boolean False if not a valid move.
Game_Board.prototype.make_move = function(index, piece){
    if (this._is_move_index_empty(index)){
        this.board[index] = piece;
        return(true);
    }else{
        return(false);
    };
};



// constructor
// Builds a player object.
// Currently Players primary job is interfacing with the human player.
function Player(name, piece){
    this.name = name;
    this.piece = 'X' || 'O';
}

// Class methods
// Takes a valid move string eg '1a' and converts it to the index of board[]
Player.prototype._find_index = function(move){
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
// Checks for valid move input: is this a valid coordinate?
Player.prototype._check_move = function(move){
    var row = move.charAt(0);
    var column = move.charAt(1);
    // I am aware there are some really cool functional ways to do this.
    // I will try to figure them out later.
    return((row == 1 || row == 2 || row == 3) &&
           (column == 'a' || column == 'b' || column =='c'));
};


// constructor
// The Game class will be responsible for communicating and directing messages
// between Player and Game_Board.
function Game(){
}

module.exports.board = Game_Board;
module.exports.player = Player;

// rough testing. Needs automated testing badly.
// var testing = new Game_Board();
// testing.display_board();
//console.log('1a');
//testing.make_move('0','X');
//testing.display_board();
//console.log(testing.get_board_index_state(0));
//console.log(testing.get_board_index_state(0)== 'X');
// console.log('2a');
// console.log(testing._is_move_index_empty(3), 'is move empty');
// console.log(testing.make_move('2a','X'), 'testing.make_move');
// testing.display_board();
// console.log('2a');
// console.log(testing._is_move_index_empty(3), 'is move empty');
// console.log(testing.make_move('2a','O'), 'testing.make_move');
// testing.display_board();
// console.log('4a');
// console.log(testing.make_move('4a','O'));
// testing.display_board();
// console.log('1G');
// console.log(testing.make_move('1G','O'));
// testing.display_board();
// console.log('2');
// console.log(testing.make_move('2','O'));
// testing.display_board();
Game.prototype.instantiate_game_objects = function(){
    this.board = new Game_Board();
    this.player1 = new Player('player1', 'X');
    this.player2 = new Player('player2', 'O');
};

Game.prototype.get_player_move = function(){
    var move = this.player1.get_move();
};
module.exports.game = Game;
