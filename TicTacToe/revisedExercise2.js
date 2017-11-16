document.getElementById('sE2').onclick = function() {
// Begining of code ************************************************************

// Inserting Media *************************************************************
const boardShape = new Image ();
boardShape.src = 'Board.png';
const oShape = new Image ();
oShape.src = 'O.png';
const xShape = new Image ();
xShape.src = 'X.png';
const tick = new Audio ();
tick.src = 'Tick.mp3';
const tack = new Audio ();
tack.src = 'Tack.mp3';
const win = new Audio ();
win.src = 'Win.wav';
// const loos = new Audio ();
// tack.src = 'Loos.wav';
// *****************************************************************************
// Data of game ****************************************************************
var game = {
    _board: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ],
    _winHappend: false,
    _tie: false,
    _isXTurn: true
}
// Initial parameters **********************************************************
const canvas = document.getElementById ("canvas");
const ctx = canvas.getContext ("2d");
const billboard = document.getElementById ('score');
const billboard2 = document.getElementById ('score2');
canvas.width = 500;
canvas.height = 500;
game._isXTurn = !!Math.floor(Math.random() * 2);

// *****************************************************************************
const starter = function (inp) {
    if (inp) {
        return "X";
    } else {
        return "O";
    }
}
billboard2.innerHTML = `Player ${starter(game._isXTurn)} would Start first!`;
// Defining _status function ***************************************************
const statusOfGame = function (_board) {
    _status= {
        _decision: ``,
        _suggestion: ``
    }

    // Defining classes ********************************************************
    class RowColumnDiagon {
            /**
             * This is a constructor for the class
             *
             * @param _nX         Number of X's which are inside the board
             * @param _nO         Number of O's which are inside the board
             * @param _type       Denotes row's from up to down sequently 0 to 2
             *                    Denotes column's from left to right sequently 3 to 5
             *                    Denotes diagonal's from left to right sequently 6 and 7
             * @param

             */
            constructor(_nX, _nO, _type) {
                this._nX = _nX;
                this._nO = _nO;
                this._type = _type;
              }
              //********************************************************
              get _winX() {
                return this.calcWinX();
              }
              calcWinX() {
                  if (this._nX === 3 && this._nO === 0) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _winO() {
                return this.calcWinO();
              }
              calcWinO() {
                  if (this._nX === 0 && this._nO === 3) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _getStuck() {
                return this.calcGetStuck();
              }
              calcGetStuck() {
                  if ((this._nX === 1 && this._nO === 2) || (this._nX === 2 || this._nO === 1)) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _notWin() {
                return this.calcNotWin();
              }
              calcNotWin() {
                  if (this._nX === 1 && this._nO === 1) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _aboatToWinX() {
                return this.calcAboatToWinX();
              }
              calcAboatToWinX() {
                  if (this._nX === 2 && this._nO === 0) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _aboatToWinO() {
                return this.calcAboatToWinO();
              }
              calcAboatToWinO() {
                  if (this._nX === 0 && this._nO === 2) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _freeToTryX() {
                return this.calcFreeToTryX();
              }
              calcFreeToTryX() {
                  if (this._nX === 1 && this._nO === 0) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _freeToTryO() {
                return this.calcFreeToTryO();
              }
              calcFreeToTryO() {
                  if (this._nX === 0 && this._nO === 1) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //********************************************************
              get _freeToTry() {
                return this.calcFreeToTry();
              }
              calcFreeToTry() {
                  if (this._nX === 0 && this._nO === 0) {
                      return true;
                  } else {
                      return false;
                  }
            }
    }
    // End of Defining classes **************************************


    // Finding number of X and O based on the _board ********************
        const countXandO = function (_board, _type) {
            var _n = {
                X: 0,
                O: 0
            }
            if (_type === 0) {
                for (var i = 0; i < 3; i++) {
                    if (_board[0][i] === "o" || _board[0][i] === "O") {
                        _n.O += 1;
                    } else if (_board[0][i] === "x" || _board[0][i] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 1) {
                for (var i = 0; i < 3; i++) {
                    if (_board[1][i] === "o" || _board[1][i] === "O") {
                        _n.O += 1;
                    } else if (_board[1][i] === "x" || _board[1][i] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 2) {
                for (var i = 0; i < 3; i++) {
                    if (_board[2][i] === "o" || _board[2][i] === "O") {
                        _n.O += 1;
                    } else if (_board[2][i] === "x" || _board[2][i] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 3) {
                for (var i = 0; i < 3; i++) {
                    if (_board[i][0] === "o" || _board[i][0] === "O") {
                        _n.O += 1;
                    } else if (_board[i][0] === "x" || _board[i][0] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 4) {
                for (var i = 0; i < 3; i++) {
                    if (_board[i][1] === "o" || _board[i][1] === "O") {
                        _n.O += 1;
                    } else if (_board[i][1] === "x" || _board[i][1] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 5) {
                for (var i = 0; i < 3; i++) {
                    if (_board[i][2] === "o" || _board[i][2] === "O") {
                        _n.O += 1;
                    } else if (_board[i][2] === "x" || _board[i][2] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 6) {
                for (var i = 0; i < 3; i++) {
                    if (_board[i][i] === "o" || _board[i][i] === "O") {
                        _n.O += 1;
                    } else if (_board[i][i] === "x" || _board[i][i] === "X") {
                        _n.X += 1;
                    }
                }

            }
            if (_type === 7) {
                for (var i = 0; i < 3; i++) {
                    if (_board[i][2-i] === "o" || _board[i][2-i] === "O") {
                        _n.O += 1;
                    } else if (_board[i][2-i] === "x" || _board[i][2-i] === "X") {
                        _n.X += 1;
                    }
                }

            }

        return _n;
        }
    // End of Finding number of X and O *****************************


    // Constructing _items of _board by classes **************************

        var _items = [];
        for (var i = 0; i < 8; i++) {
            _items[i] = new RowColumnDiagon (countXandO (_board, i).X, countXandO (_board, i).O, i);
        }

    // End of _items *************************************************


    // Making _decision based on _items Datas ***************************
    const decision = function (_items) {
        var _reply = {
            _player:'',
            _type: 0,
            _makeAction: 0
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._winX) {
                _reply._player = 'X';
                _reply._type = i;
                _reply._makeAction = 0;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._winO) {
                _reply._player = 'O';
                _reply._type = i;
                _reply._makeAction = 0;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._aboatToWinO) {
                _reply._player = 'O';
                _reply._type = i;
                _reply._makeAction = 1;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._aboatToWinX) {
                _reply._player = 'X';
                _reply._type = i;
                _reply._makeAction = 1;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._freeToTryO) {
                _reply._player = 'O';
                _reply._type = i;
                _reply._makeAction = 2;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._freeToTryX) {
                _reply._player = 'X';
                _reply._type = i;
                _reply._makeAction = 2;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._freeToTry) {
                _reply._player = 'XO';
                _reply._type = i;
                _reply._makeAction = 3;
                return _reply;
            }
        }
        for (var i = 0; i < 8; i++) {
            if (_items[i]._notWin) { //tie
                _reply._player = 'XO';
                _reply._type = i;
                _reply._makeAction = 4;
                return _reply;
            }
        }//
        const tieChecker = function (i) {
            if (i === 8) {
                _reply._player = 'NONE';
                _reply._type = `ALL`;
                _reply._makeAction = 7;
                return true;
            }
            if (_items[i]._getStuck) {
                return tieChecker (i+1);
            }
        }
        if (tieChecker (0)) {
            return _reply;
        }
    // return _reply;
    }
    // End **********************************************************

    // Performing _decision ********************************************
    const action = function (_decision, _board) {
        const isFree = function (i, j) {
            if (_board[i][j] != ' ') {
                return false;
            } else {
                return true;
            }
        }
        if (_decision._type === 0) {//
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (0, i)) {
                        return `[0, ${i}]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [0, 0], [0, 1], [0, 2] ]`;
            }

        }//
        if (_decision._type === 1) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (1, i)) {
                        return `[1, ${i}]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [1, 0], [1, 1], [1, 2] ]`;
            }

        }
        if (_decision._type === 2) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (2, i)) {
                        return `[2, ${i}]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [2, 0], [2, 1], [2, 2] ]`;
            }

        }
        if (_decision._type === 3) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (i, 0)) {
                        return `[${i}, 0]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [0, 0], [1, 0], [2, 0] ]`;
            }

        }
        if (_decision._type === 4) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (i, 1)) {
                        return `[${i}, 1]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [0, 1], [1, 1], [2, 1] ]`;
            }

        }
        if (_decision._type === 5) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (i, 2)) {
                        return `[${i}, 2]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [0, 2], [1, 2], [2, 2] ]`;
            }

        }
        if (_decision._type === 6) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (i, i)) {
                        return `[${i}, ${i}]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [0, 0], [1, 1], [2, 2] ]`;
            }

        }
        if (_decision._type === 7) {
            if (_decision._makeAction > 0 && _decision._makeAction != 7) {
                for (var i = 0; i < 3; i++) {
                    if (isFree (2-i, i)) {
                        return `[${2-i}, ${i}]`;
                    }
                }
            } else if (_decision._makeAction != 7) {
                return `[ [0, 2], [1, 1], [2, 0] ]`;
            }

        }
        if (_decision._makeAction === 7) {
            return `[]`;
        }

    }
    // End of action ***********************************************************

    _status._decision = decision (_items);
    _status._suggestion = action (decision (_items, _board), _board);

    return _status;

}
// End of statusOfGame function *****************************************************
// reset ***********************************************************************
const reset = function () {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            game._board[i][j] = ' ';
        }
    }
}
// Defining nextMove function **************************************************
const nextMove = function (_board, _isX) {
    if (!game._isXTurn) {
        reset();
        const i = Math.floor(3 * Math.random());
        const j = Math.floor(3 * Math.random());
        game._isXTurn = !game._isXTurn;
        return `[${i}, ${j}]`;
    } else {
        const _status = statusOfGame (_board);

        if (_status._decision._makeAction != 0 && _status._decision._makeAction != 7) {
            return _status._suggestion;
        }
    }

}
// End of next move function ***************************************************

// Defining findWinner *********************************************************
const findWinnerOrTie = function (_board) {
    const _status = statusOfGame (_board);
    if (_status._decision._makeAction === 0) {
        game._winHappend = !game._winHappend;
        return {
            _player: _status._decision._player,
            _path: _status._suggestion,
            _wining: true,
            _tie: false,
            _type: _status._decision._type
            }
        } else if (_status._decision._makeAction === 7) {
            game.tie = !game.tie;
            return {
                _player: _status._decision._player,
                _wining: false,
                _tie: true,
                _type: _status._decision._type
            }
        }

    }
// End of findWinner ***********************************************************

// Defining display ************************************************************
const display = function (_board) {
    const _status = statusOfGame (_board);
    const output = findWinnerOrTie (_board);
    if (_status._decision._makeAction === 0) {
        if (output._wining) {
            billboard.innerHTML = `The player "${output._player}" won in this path: ${output._path}`;
            setTimeout(function(){
            win.play(); }, 1000);
            setTimeout(function(){reset();}, 3000);
        }
    }
    if (_status._decision._makeAction === 7) {
        if (output._tie) {
            billboard.innerHTML = `All players engaged a Tie!`;
        }
        setTimeout(function(){reset();}, 3000);
    }
}
// End of display **************************************************************

// Defining makeMove function **************************************************
const makeMove = function (_board, _point, _isX) {
    const _pose = JSON.parse (_point);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (_pose[0] === i && _pose[1] === j) {
                if (_board[i][j] === ' ') {
                    if (_isX) {
                        game._board[i][j] = 'x';
                    } else {
                        game._board[i][j] = 'o';
                    }
                }
            }
        }
    }

}

// Defining Render function ****************************************************
const render = function (_board) {

    const arrayToPose = function (_point) {
        const _pose = JSON.parse (_point);
        var _output = [];
        _output[0] = _pose[0] * canvas.width / 3 + canvas.width / 21;
        _output[1] = _pose[1] * canvas.height / 3 + canvas.width / 21;
        return _output;
    }
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    ctx.drawImage (boardShape, 0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (_board[i][j] === 'x' || _board[i][j] === 'X') {
                ctx.drawImage (xShape, arrayToPose(`[${i}, ${j}]`)[1], arrayToPose(`[${i}, ${j}]`)[0], canvas.width/4, canvas.height/4);
            } else if (_board[i][j] === 'o' || _board[i][j] === 'O'){
                ctx.drawImage (oShape, arrayToPose(`[${i}, ${j}]`)[1], arrayToPose(`[${i}, ${j}]`)[0], canvas.width/4, canvas.height/4);
            }
        }
    }
}
render(game._board);
// End of Render function ******************************************************

// Performing mouse event ******************************************************
if (!game._isXTurn) {
    render(game._board);
    makeMove (game._board, nextMove(game._board, false), false);
    render(game._board);
    tack.play();
}
const getMousePos = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    const playerAct = function () {
        var ii = 0;
        var jj = 0;
        if (mousePos.x > 0 && mousePos.x < (canvas.width / 3)) {
            jj = 0;
        } else if (mousePos.x > (canvas.width / 3) && mousePos.x < (canvas.width / 3 * 2)) {
            jj = 1;
        } else if (mousePos.x > (canvas.width / 3 * 2) && mousePos.x < canvas.width) {
            jj = 2;
        }
        if (mousePos.y > 0 && mousePos.y < (canvas.height / 3)) {
            ii = 0;
        } else if (mousePos.y > (canvas.height / 3) && mousePos.y < (canvas.height / 3 * 2)) {
            ii = 1;
        } else if (mousePos.y > (canvas.height / 3 * 2) && mousePos.y < canvas.height) {
            ii = 2;
        }
        return {
            i: ii,
            j: jj
        }
    }

    if (game._isXTurn) {
        if (!game._winHappend && !game._tie) {
            makeMove (game._board, `[${playerAct().i}, ${playerAct().j}]`, true);
            render(game._board);
            tick.play();
            display(game._board);
            makeMove (game._board, nextMove(game._board, false), false);
            setTimeout(function(){
            render(game._board);
            tack.play();}, 500);
            display(game._board);
        }
    }
console.log(game._board);
}, true);

// End of mouse event **********************************************************



// End of the code *************************************************************
}
