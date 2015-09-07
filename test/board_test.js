var assert = require("assert");
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


function Mock_Board(board){
    this.message = [];
}


// mock of display does nothing:
Mock_Board.prototype.display_board = function(){
    this.message.push('display_board')
};

// Checks to ensure the space is empty and available to take a move.
Mock_Board.prototype.is_move_index_empty = function(move_index){
    this.message.push('is_move_index_empy')
    return(true);
};

Mock_Board.prototype.detect_win = function(piece){
    this.message.push('detect_win ' + piece);
    if (piece == 'O'){
        return(true);
    }else{
        return(false);
    }
};

// Mock make_move applies a move, returns index for testing
Mock_Board.prototype.make_move = function(index, piece){
    this.message.push('make_move '+ index + ' '+ piece);
};



describe( 'Game', function(){
    var game;
    beforeEach(function(){
        game = new ttt.game(new ttt.board(), new ttt.player('X'),
                            new ttt.player('O'));
    });
    //var moves = ['1a','2a','1b','2b','1c'];
    var moves = ['1a','2a'];
    var final_state = [ 'display_board',
                        'is_move_index_empy',
                        'make_move 0 X',
                        'detect_win X',
                        'display_board',
                        'is_move_index_empy',
                        'make_move 3 O',
                        'detect_win O',
                        'display_board',
                        'display_board' ];

    var input_event = new event.EventEmitter();
    describe('#main', function(){
        xit('should make some moves', function(){
            game = new ttt.game(new Mock_Board(), new ttt.player('X'),
                                new ttt.player('O'));
            var index;
            game.main(input_event);
            for (entry of moves){
                input_event.emit('data', entry);
            }
            console.log(game.board.message);
            //expect(game.board.messages).to.deep.equal(final_state);
            assert.deepEqual(final_state, game.board.messages);
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
    describe('#three_in_a_row', function(){
        it('should return false if all are different', function(){
            // it will receive a set of three and check if all are the same piece
            expect(board.three_in_a_row(['X', 'O', 'X'])).to.equal(false);
        });
        it('should return true if all are the same', function(){
            expect(board.three_in_a_row(['X', 'X', 'X'])).to.equal(true);
        });
        it('it should return false if all three are blank', function(){
            expect(board.three_in_a_row([' ', ' ', ' '])).to.equal(false);
        });
    });
    describe('#build_set', function(){
        it('returns an 3 array with values from specified indices', function(){
            board = new ttt.board(['X','X','X',' ',' ',' ',' ',' ',' ']);
            expect(board.build_set([0,1,2])).to.deep.equal(['X', 'X', 'X']);
        });
        it('returns an 3 array with values from specified indices', function(){
            board = new ttt.board(['X','O','X','X','O','O','O','X','X']);
            expect(board.build_set([0,1,2])).to.deep.equal(['X', 'O', 'X']);
        });
        it('returns an 3 array with values from specified indices', function(){
            board = new ttt.board(['X','O','X','X','O','O','O','X','X']);
            expect(board.build_set([0,3,6])).to.deep.equal(['X', 'X', 'O']);
        });
    });
    describe('#detect_win', function(){
        it('should respond true if the game is won', function(){
            board = new ttt.board(['X','X','X',' ',' ',' ',' ',' ',' ']);
            expect(board.detect_win('X')).to.equal(true);
        });
        it('should return false for O and true for X', function(){
            board = new ttt.board(['X','X','X','O',' ',' ','O',' ',' ']);
            expect(board.detect_win('O')).to.equal(false);
            expect(board.detect_win('X')).to.equal(true);
        });
        it('should return false if the game is not won',function(){
            board = new ttt.board(['X','O','X','X','O','O','O','X','X']);
            expect(board.detect_win('X')).to.equal(false);
            expect(board.detect_win('O')).to.equal(false);
        });
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
