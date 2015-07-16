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
Game_Board.prototype.is_move_index_empty = function(move_index){
    return(this.board[move_index] == ' ');
};

// Takes a valid move and a piece from Game and applies it to the board.
Game_Board.prototype.make_move = function(index, piece){
    this.board[index] = piece;
};


// constructor
// Builds a player object.
// Because the event loop operates differently then I anticipated. This object
// will no longer be primarily responsible for interfacing with the player.
// I anticipate it handling AI in the future.
function Player (piece){
    this.piece = piece;
}


// constructor
// The Game class will be responsible for communicating and directing messages
// between Player and Game_Board.
function Game(){
    this.board = new Game_Board();
    this.player1 = new Player('X');
    this.player2 = new Player('O');
}

// causes one move to happen.
Game.prototype.do_move = function(usr_input, cur_player, game){
    console.log();
    if (game.validate_move(usr_input)){
        game.board.make_move(game.find_index(usr_input), cur_player.piece );
        if (cur_player === game.player1){
            cur_player = game.player2;
        }else{
            cur_player = game.player1;
        }
        game.board.display_board();
        return(cur_player);
    }else{
        game.board.display_board();
    }
};


// Takes a valid move string eg '1a' and converts it to the index of board[]
Game.prototype.find_index = function(move){
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

// Checks for valid move input: is this a valid coordinate?
Game.prototype.check_move = function(move){
    var row = move.charAt(0);
    var column = move.charAt(1);
    // I am aware there are some really cool functional ways to do this.
    // I will try to figure them out later.
    return((row == 1 || row == 2 || row == 3) &&
           (column == 'a' || column == 'b' || column =='c'));
};


//Takes string input from stdin listener, validates and returns bool
Game.prototype.validate_move = function(input){
    var index;
    if( this.check_move(input)){
        index = this.find_index(input);
    }else{
        console.log("invalid format");
        return (false);
    }if (this.board.is_move_index_empty(index)){
        return(true);
    }else{
        console.log("That space is full.");
        return (false);
    }
};

// Broken. Very Broken. Working on it.
// Deals with the event loop
Game.prototype.main = function(){
    var stdin = process.stdin;
    var current_player = this.player1;
    var game = this;

    console.log("Welcome!");
    console.log("Here is the board.");
    game.board.display_board();
    console.log("Enter a move. eg 1a: ");

    process.stdin.on('data', function (text){
        text = text.toString().trim();
        current_player = game.do_move(text, current_player, game);
    });
};


module.exports.game = Game;
module.exports.board = Game_Board;
module.exports.player = Player;

game = new Game();
//console.log(game.validate_move('1a'));
game.main();
