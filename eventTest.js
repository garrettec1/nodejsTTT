var ttt = require('./tictactoe.js');
var game = new ttt.game();
//var board = new ttt.board();
//var player1 = new ttt.player('X');
//var player2 = new ttt.player('O');

var stdin = process.stdin;
var player = game.player1;



console.log("Welcome to tic tac toe. Here is the board.");
game.board.display_board();
console.log("Enter a move: eg 1a: ");

process.stdin.on('data', function (text) {
    text = text.toString().trim();
    do_a_move(text, player);
});

var do_a_move = function(text){
    console.log();
    if (game.validate_move(text)){
        game.board.make_move(game.find_index(text), player.piece );
        if (player === game.player1){
            player = game.player2;
        }else{
            player = game.player1;
        }
        game.board.display_board();
    }else{
        game.board.display_board();
    }
};
