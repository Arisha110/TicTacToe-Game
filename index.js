const gameInfo=document.querySelector("[game-info]");
const newGameBtn=document.querySelector(".btn");
const boxes=document.querySelectorAll("[box]");
const grid=document.querySelector(".TicTacToe");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8],[2,4,6]
];

//initialising the game
function init(){
    grid.classList.remove("active");
    currentPlayer="X";
    gameGrid=["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
init();


boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        handle(index); 
    });
});
function handle(index){
    if (gameGrid[index]==="") {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none"; 
        //changing player
        swapTurn();
        //checking for winner
        checkGameOver();
    }
}
function swapTurn(){
    if(currentPlayer==="X"){
      currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //updating on UI
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
         && (gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]])){
        
            if(gameGrid[position[0]]==="X"){
             answer="X";
            }
            else{
            answer="O";
            }
            boxes.forEach((box)=>{
                 box.style.pointerEvents="none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
    if(answer!==""){
        gameInfo.innerText=`Winner is ${answer}`;
        newGameBtn.classList.add("active");
        navigator.vibrate(200);
        // grid.classList.add("active");
    }
    // else{
    //     gameInfo.innerText=`Game Tied`;
    //     // newGameBtn.classList.add("active");
    // }
    // boxes.forEach((position)=>{
    //     if(gameGrid!=="" && answer===""){
    //         gameInfo.innerText=`Game Tied`;
    //         newGameBtn.classList.add("active");
    //     }
    // })
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });
    if(fillCount==9){
        gameInfo.innerText="Game Tied!";
       
        grid.classList.add("active");
         setTimeout(init, 500);
        // newGameBtn.classList.add("active");
    }
}
newGameBtn.addEventListener("click",()=>{
    init();
    boxes.forEach((index)=>{
        gameGrid[index].innerText="";
    })
});
