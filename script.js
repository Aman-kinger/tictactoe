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

    function play(row,col){
        if(gameBoard.getValue(row,col) === null){
            gameBoard.getBoard()[row][col] = currentPlayer.getSymbol();
            gameBoard.printBoard();
            changePlayer();
        }
    }

    return {play};

}

const game = Game();
