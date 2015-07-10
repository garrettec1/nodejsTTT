assert = require("assert");
var expect = require('chai').expect;
var ttt = require('../tictactoe.js');

describe( 'Game', function(){
    // I think of the Game object as the object that controls the flow of
    // the game. It tells the other objects when to enact their responsibilities
    // and all communication between objects is to or from the Game object.

    // Should create a Board object
    // Should create a Player object
    // Should tell Player to get a move
    // Should tell Board a move has been made
    // Should tell Board to check for a win

});


describe('Player', function(){
    var player;
    beforeEach(function(){
        player = new ttt.player();
    });
    // describe the name of the method being tested
    describe('#_check_move', function(){
        it('should validate a properly formatted  move', function(){
            //var board = new ttt.board();
            expect(player._check_move("1a")).to.equal(true);
        });
        it('rejects improrperly formatted moves', function() {
            //var board = new ttt.board();
            expect(player._check_move('2A')).to.equal(false);
        });
    });
    var valid_indexes;
    describe('#_find_index', function(){
        it('should return a valid board index for a valid move string input'
           ,function(){
            valid_indexes = ['1a','1b','1c','2a','2b','2c','3a','3b','3c'];
            valid_indexes.forEach(function(element, index){
                expect(player._find_index(element)).to.equal(index);
            });
        });
    });
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
        it('should not make a move in a filled space', function() {
            board.make_move(0, 'X');
            board.make_move(0, 'O');
            expect(board.get_board_index_state(0)).to.equal('X');
        });
        it('should return true when it makes a move', function() {
            expect(board.make_move(0,'X')).to.equal(true);
        });
        it('should return false if that space is already occupied',
           function() {
               board.make_move(0, 'X');
               expect(board.make_move(0,'O')).to.equal(false);
           });
    });

    describe('#_is_move_index_empty', function(){
        it('should return true if the board index is empty',function() {
            for (var i = 0; i < 9; i++){
                expect(board._is_move_index_empty(i)).to.equal(true);
            };
        });
        it('should return false when board index is occupied', function() {
            var i;
            for(i = 0; i < 9; i++){
                board.make_move(i,'X');
            };
            for (i = 0; i < 9; i++){
                expect(board._is_move_index_empty(i)).to.equal(false);
            };
        });
    });
});
