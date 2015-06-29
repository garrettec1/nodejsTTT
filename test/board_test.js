//var assert = require("assert");
var expect = require('chai').expect;
var ttt = require('../tictactoe.js');

//describe the name of the class
describe('Game_Board', function(){
    var board;
    beforeEach(function(){
       board = new ttt.board();
    });
    // describe the name of the method being tested
    describe('#_check_move', function(){
        it('should validate a move', function(){
            //var board = new ttt.board();
            expect(board._check_move("1a")).to.equal(true);
        });

        it('rejects improrperly formatted moves', function() {
            //var board = new ttt.board();
            expect(board._check_move('2A')).to.equal(false);
        });
    });
    var valid_indexes;
    describe('#_find_index', function(){
        it('should return a valid board index for a valid move string input',function(){
            valid_indexes = ['1a','1b','1c','2a','2b','2c','3a','3b','3c'];
            valid_indexes.forEach(function(element, index){
                expect(board._find_index(element)).to.equal(index);
            });
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
                board[i] = 'X';

            };
            for (i = 0; i < 9; i++){
                console.log(i, board[i]);
                console.log(board.display_board());
                expect(board._is_move_index_empty(i)).to.equal(false);
            };
        });
    });
});
