const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const WINNING_COMBINATIONS = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
  ];


function GameBoard(){
    const rows = 3;
    const cols = 3;
    const board = [];

    for(let i = 0;i < rows;i++){
        board[i] = [];
        for(let j = 0;j < cols;j++){
            board[i][j] = null;;
        }
    }

    const getBoard = () => board;

    const printBoard = () =>{
        for(row of board){
            console.log(row);
        }
    }

    const getValue = (row,col) => board[row][col];

    return {getBoard, printBoard, getValue};
}

function Player(symbol){
    const getSymbol = () => symbol;
    return {getSymbol};
}

function Game(){
    player1 = Player('X');
    player2 = Player('O');
    gameBoard = GameBoard();
    gameBoard.printBoard();
    let currentPlayer = player1;

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function checkWinner(){
        for(combination of WINNING_COMBINATIONS){
            let [row1,col1] = combination[0];
            let [row2,col2] = combination[1];
            let [row3,col3] = combination[2];

            if(gameBoard.getValue(row1,col1) != null && gameBoard.getValue(row2,col2) != null && gameBoard.getValue(row3,col3) != null &&
               gameBoard.getValue(row1,col1) === gameBoard.getValue(row2,col2) && gameBoard.getValue(row2,col2) === gameBoard.getValue(row3,col3)){
                return true;
            }
        }
        return false;
    }

    function play(row,col){
        if(gameBoard.getValue(row,col) === null){
            gameBoard.getBoard()[row][col] = currentPlayer.getSymbol();
            gameBoard.printBoard();

            if(checkWinner()){
                console.log(`${currentPlayer.getSymbol()} is the winner`);
            }
            else{
                changePlayer();
            }
        }
    }

    return {play, checkWinner};

}

const game = Game();

function playGame(){
    readline.question('Enter row and column: ', (input) => {
        const [row,col] = input.split(' ').map(Number);
        game.play(row,col);
        if(game.checkWinner()){
            readline.close();
        }
        else{
            playGame();
        }
    });
}

playGame();

