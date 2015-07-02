assert = require("assert");
var expect = require('chai').expect;
var ttt = require('../tictactoe.js');

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
            assert.equal(board.get_board_index_state(0), 'X');
        });
        it('should make an O in an empty space', function() {
            board.make_move(7,'O');
            assert.equal(board.get_board_index_state(7), 'O');
        });
        it('should not make a move in a filled space', function() {
            board.make_move(0, 'X');
            board.make_move(0, 'O');
            assert.equal(board.get_board_index_state(0), 'X');
        });
        it('should return true when it makes a move', function() {
            assert.equal(board.make_move(0, 'X'), true);
        });
        it('should return false if that space is already occupied',
           function() {
               board.make_move(0, 'X');
               assert.equal(board.make_move(0, 'X'), false);
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
