//assert = require("assert");
var expect = require('chai').expect;
var ttt = require('../tictactoe.js');
var event = require('events');

// I think of the Game object as the object that controls the flow of
// the game. It tells the other objects when to enact their responsibilities
// and all communication between objects is to or from the Game object.

// Should create a Board object
// Should create a Player object
// Should tell Player to get a move
// Should tell Board a move has been made
// Should tell Board to check for a win


describe( 'Game', function(){
    var game;
    beforeEach(function(){
        game = new ttt.game(new ttt.board(), new ttt.player('X'),
                            new ttt.player('O'));
    });
    var moves = ['1a','2a','1b','2b','1c','2c'];
    var input_event = new event.EventEmitter();
    describe('#main', function(){
        it('should make some moves and end the game', function(){
            game.main(input_event);
            for (entry of moves){
                input_event.emit('data', entry);
            }
        });
    });
    describe('#get_next_player', function(){
        var cur_player;
        var self;
        it('should take the current player and return the next player',
           function(){
               cur_player = game.player1;
               expect(game.get_next_player(cur_player, game)).to.equal(
                   game.player2);
               cur_player = game.player2;
               expect(game.get_next_player(cur_player, game)).to.equal(
                   game.player1);
        });
    });
    describe('#validate_move', function(){
        it('should validate a properly formatted move input', function(){
            expect(game.validate_move('1a')).to.equal(true);
        });
        it('should reject improperly formatted move inputs', function(){
            expect(game.validate_move('1A')).to.equal(false);
            expect(game.validate_move('a1')).to.equal(false);
            expect(game.validate_move('0')).to.equal(false);
        });
        it('should reject move to a filled space', function(){
            game.board.make_move(0, 'X');
            expect(game.validate_move('1a')).to.equal(false);
        });
    });
    describe('#check_move', function(){
        it('should validate a properly formatted  move', function(){
            expect(game.check_move("1a")).to.equal(true);
        });
        it('rejects improrperly formatted moves', function() {
            expect(game.check_move('2A')).to.equal(false);
        });
    });
    var valid_indexes;
    describe('#find_index', function(){
        it('should return a valid board index for a valid move string input'
           ,function(){
               valid_indexes = ['1a','1b','1c','2a','2b','2c','3a','3b','3c'];
               valid_indexes.forEach(function(element, index){
                   expect(game.find_index(element)).to.equal(index);
               });
           });
    });
});


describe('Player', function(){
    var player;
    beforeEach(function(){
        player = new ttt.player();
    });
    // describe the name of the method being tested

});

//describe the name of the class
describe('Game_Board', function(){
    var board;
    beforeEach(function(){
       board = new ttt.board();
    });
    describe('#make_move', function(){
        it('should add an X in an empty space', function() {
            board.make_move(0,'X');
            expect(board.get_board_index_state(0)).to.equal('X');
        });
        it('should make an O in an empty space', function() {
            board.make_move(7,'O');
            expect(board.get_board_index_state(7)).to.equal('O');
        });
        // it('should not make a move in a filled space', function() {
        //     board.make_move(0, 'X');
        //     board.make_move(0, 'O');
        //     expect(board.get_board_index_state(0)).to.equal('X');
        // });
        // it('should return true when it makes a move', function() {
        //     expect(board.make_move(0,'X')).to.equal(true);
        // });
        // it('should return false if that space is already occupied',
        //    function() {
        //        board.make_move(0, 'X');
        //        expect(board.make_move(0,'O')).to.equal(false);
        //    });
    });

    describe('#is_move_index_empty', function(){
        it('should return true if the board index is empty',function() {
            for (var i = 0; i < 9; i++){
                expect(board.is_move_index_empty(i)).to.equal(true);
            };
        });
        it('should return false when board index is occupied', function() {
            var i;
            for(i = 0; i < 9; i++){
                board.make_move(i,'X');
            };
            for (i = 0; i < 9; i++){
                expect(board.is_move_index_empty(i)).to.equal(false);
            };
        });
    });
});
