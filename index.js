const canvas = document.getElementById("gameField");
const ctx = canvas.getContext("2d");

let x = 400;
let y = 300;
let size = 30;
let step = 10;

let goUp = false;
let goDown = false;
let goRight = false;
let goLeft = false;


function gameLoop(){
    // console.log("interwał");
    requestAnimationFrame(gameLoop); // umożliwia harmonijne planowanie i wykonywanie animacji oraz innych operacji związanych z odświeżaniem interfejsu użytkownika. Ooptymalizowane renderowanie animacji, aby zapewnić płynność i oszczędność zasobów.
    clearGameField();
    move();
    boundryCheck();
    drawBloob();
}

function boundryCheck(){
    if(y < size) y = size;
    if(y > canvas.height - size) y = canvas.height - size;
    if(x < size) x = size;
    if(x > canvas.width - size) x = canvas.width - size;
}

function move(){
    if(goDown) y += step;
    if(goUp) y -= step;
    if(goRight) x += step;
    if(goLeft) x -= step;
}

function drawBloob(){
    ctx.fillStyle = "white";
    if(goUp) ctx.fillStyle = "red";
    if(goDown) ctx.fillStyle = "blue";
    if(goRight) ctx.fillStyle = "yellow";
    if(goLeft) ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
}

function clearGameField(){ //jeżeli pominiemy tą funkcję kulka będzie pozostawiała za sobą ślad
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.body.addEventListener("keydown", keyHandler);
document.body.addEventListener("keyup", keyHandler);
// document.body.addEventListener("keydown", e => {
//     console.log(e.key);
//     console.log(e.code);
//     console.log(e.keyCode);
// });

function keyHandler(e) {
    const state = e.type === "keydown" ? true : false;

    switch (e.key) {
        case "ArrowDown":
            goDown = state;
            break;
        case "ArrowUp":
            goUp = state;
            break;
        case "ArrowRight":
            goRight = state;
            break;
        case "ArrowLeft":
            goLeft = state;
            break;
    }
}



gameLoop()