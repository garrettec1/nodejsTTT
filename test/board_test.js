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
    describe('#_find_index', function(){
        it('should return a valid board index for a valid move string input',function(){
            expect(board._find_index('1a')).to.equal(0);
            expect(board._find_index('1b')).to.equal(1);
            expect(board._find_index('1c')).to.equal(2);
            expect(board._find_index('2a')).to.equal(3);
            expect(board._find_index('2b')).to.equal(4);
            expect(board._find_index('2c')).to.equal(5);
            expect(board._find_index('3a')).to.equal(6);
            expect(board._find_index('3b')).to.equal(7);
            expect(board._find_index('3c')).to.equal(8);
        });
    });
});
