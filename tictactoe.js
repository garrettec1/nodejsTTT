//Command Line Tic-Tac-Toe game
//Garrett Fuller
//Authored June 2015

// for use with .format
var util = require('util');

// constructor
// Instantiates an empty game board.
function Game_Board(board) {
    this.board = board || [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.win_conditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
                           [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
                           [0, 4, 8], [6, 4, 2]];           //diagonals
}

// class methods
// returns the state of a board index. Yay abstraction!
Game_Board.prototype.get_board_index_state = function(board_index){
    return (this.board[board_index]);
};

//Game_Board.prototype.negamax = function(node, color){
    // issue with detect_win() taking peice
    // general issue of needing remaining available moves to make child
    // need to value the final board state
    //if ( node.detect_win() node.detect_tie()){
    //return (color * the heuristic value of node);
    //}
    //var bestValue := -1000;
    // a generate array of valid moves
    // var valid moves;
    // loop is boord index empty
    // if it is valid move.push(index);
    // am I going to be constructing a large amount of board objects?
    // for (element of valid moves){
//         temp_board = new Game_Board(boardcopy);
//         temp_board.make_move(element, piece);
//         value = -negamax(child, depth -1, -color);
//         bestValue = max(bestValue, value);
//     }
//     return bestValue;


// };


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

Game_Board.prototype.detect_tie = function(){
    for(square of this.board){
        if( square == ' '){
            console.log('square' + square);
            return(false);
        }
    }
    return(true);
};


// loop win conditions
// if there is a piece, check if all 3 are the same
// if not break
Game_Board.prototype.detect_win = function(){
    var test = this.three_in_a_row;
    return(this.detect_set(test));
};


Game_Board.prototype.detect_set = function(test){
    for(index_set of this.win_conditions){
        var test_set = this.build_set(index_set);
        var is_win = test(test_set);
        if(is_win){
            return(is_win);
        }
    }
    return(is_win);
};

// Checks if a set of three contains all of the same element, but not blank
Game_Board.prototype.three_in_a_row = function(a_set){
    return(a_set[0] != ' ' && a_set[0] == a_set[1] && a_set[1] == a_set[2]);
};

Game_Board.prototype.build_set = function(index_set){
    return([this.board[index_set[0]],
            this.board[index_set[1]],
            this.board[index_set[2]]]);
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
    this.moves = [];
}


// constructor
// The Game class will be responsible for communicating and directing messages
// between Player and Game_Board. Now dependents injected.
function Game(board, player1, player2){
    this.board = board;
    this.player1 = player1;
    this.player2 = player2;
}

// causes one move to happen. Takes string usr_input, cur_player current
// Player object, and game, a reference to this Game object.
Game.prototype.do_move = function(usr_input, cur_player){
    console.log();
    if (this.validate_move(usr_input)){
        var move_index = this.find_index(usr_input);
        this.board.make_move(move_index, cur_player.piece );
        this.cur_player.moves.push(move_index);
        return(true);
    }else{
        this.board.display_board();
        return(false);
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

// Takes the current player object, returns the next player object.
Game.prototype.get_next_player = function(cur_player){
    if (cur_player === this.player1){
        cur_player = this.player2;
    }else{
        cur_player = this.player1;
    }
    this.board.display_board();
    return(cur_player);
};

// calls detect win, announces a winner and ends the prog.
Game.prototype.is_game_finished = function(piece, stdin){
    if(this.board.detect_win()){
        this.board.display_board();
        console.log("The "+ piece+ "'s have won the game!");
        console.log("Congrats! \nAnd thanks for playing!");
        stdin.removeAllListeners('data');
        //process.exit();
    }else if(this.board.detect_tie()){
        this.board.display_board();
        console.log("This game is a tie!");
        console.log("Thanks for playing!");
        stdin.removeAllListeners('data');
    }
};

// Deals with the event loop
// the game variable is assigned to Game.this because the when process.stdin
// starts, this gets bound to process.
// Injecting an event emitter (Hopefully)
Game.prototype.main = function(event_doohicky){
    var stdin = event_doohicky;
    var current_player = this.player1;
    var game = this;

    console.log("Welcome!");
    console.log("Here is the board.");
    game.board.display_board();
    console.log("Enter a move. eg 1a: ");

    stdin.on('data', function (text){
        text = text.toString().trim();
        if(game.do_move(text, current_player)){
            game.is_game_finished(current_player.piece, stdin);
            current_player = game.get_next_player(current_player);
        }
    });
};


module.exports.game = Game;
module.exports.board = Game_Board;
module.exports.player = Player;

game = new Game(new Game_Board(), new Player('X'), new Player('O'));
game.main(process.stdin);
