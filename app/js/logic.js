const playerOne="one";
const playerTwo="two";
let currPlayer= playerOne;

let gameOver=false;
let board;

const rows=7;
const columns=6;
let currColumns=[];


window.onload=function(){
    setGame();
}

function setGame(){
    board=[];
    currColumns = [6, 6, 6, 6, 6, 6, 6];

    for(let r=0; r < rows; r++){
        let row=[];
        for(let c=0; c < columns; c++){
            
            row.push(' ');

            let tile=document.createElement('div');
            tile.id=`${r.toString()} - ${c.toString()}`;
            tile.classList.add('tile');
            tile.addEventListener('click',playGame);
            document.getElementById('board').append(tile);
            
            
        }
        board.push(row);
    }
}
function playGame(){
    if(gameOver){
        return;
    }

    // get the coordinates of the clicked tile 
    let coord=this.id.split("-");
    let r=parseInt(coord[0]);
    let c=parseInt(coord[1]);

    //locate which row the current column
    r=currColumns[c];

    if(r < 0){
        return;
    }

    board[r][c]=currPlayer;
    let tile=document.getElementById(`${r.toString()} - ${c.toString()}`);


    if(currPlayer == playerOne){
        tile.classList.add('red-piece');
        currPlayer=playerTwo;
    }else{
        tile.classList.add('yellow-piece');
        currPlayer=playerOne;
    }

    r -=1; //updating the current height of the column
    currColumns[c] = r; //update the array

    checkWinner();

}


function checkWinner(){

    // for vertical;
    for(let r=0; r < rows; r++){
        for(let c=0; c < columns - 3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    // for horizontal
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    
    // for diagonal
    for(let r=3; r < rows; r++){
        for(let c=0; c < columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    for(let r=0;r<rows-3;r++){
        for(let c=0; c < columns - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][r+1] == board[r+2][r+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    


}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerOne) {
        winner.innerText = "Red Win's"; 
        winner.style.borderBottom='70px var(--color-pink) solid';
        winner.style.boxShadow='0px 10px 20px rgb(0 0 0)';
                
    } else {
        winner.innerText = "Yellow Win's";
        winner.style.borderBottom='70px var(--color-yellow) solid';
        winner.style.boxShadow='0px 10px 20px rgb(0 0 0)';
        
    }
    gameOver = true;
}

function resetGame(){
    
}