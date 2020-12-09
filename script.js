let canvas = document.getElementById("snake"); //pega a tag canvas com id snake
let context = canvas.getContext("2d"); //transforma a visão do canvas em 2d
let box = 32; //tamanho do quadrado
let snake = []; 
snake[0] = { //inicia a cobrinha num lugar aleatório da tela
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let direction = "right"; //inicializa direção pra direita
let food = { //inicia a comidinha num lugar aleatório da tela
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//cria o background
function criarBG(){ 
    context.fillStyle = "lightgreen"; 
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//cria a cobrinha
function criarCobrinha(){ 
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//cria a comidinha
function desenharComida(){ 
    context.fillStyle = "orange";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //coloca um listener para eventos do teclado

//atualiza a posição da cobrinha
function update(event){ 
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down"; 
}

//inicia o jogo
function iniciarJogo(){ 
    //condicionais que avaliam se a cobrinha extrapolou a tela 
    if(snake[0].x > 15 * box && direction === "right")  snake[0].x = 0;
    if(snake[0].x < 0 * box && direction === "left")  snake[0].x = 15*box;
    if(snake[0].y > 15 * box && direction === "down")  snake[0].y = 0;
    if(snake[0].y < 0 * box && direction === "up")  snake[0].y = 15*box;
    
    //checa se a cabeça da cobra se chocou com o corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");
            let restart = prompt("Quer recomeçar o jogo? S/N");
            if(restart === 'S'){
                document.location.reload(true);
            }
        }
    }

    criarBG();
    criarCobrinha();
    desenharComida();

    //pega a posição atual da cabeça cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //condicionais que checam a direção atual da cobrinha e atualizam a posição
    if(direction == "right")    snakeX += box;
    if(direction == "left")     snakeX -= box;
    if(direction == "up")       snakeY -= box;
    if(direction == "down")     snakeY += box;

    //condicionais que checam se a comidinha foi pega ou não
    if(snakeX != food.x || snakeY != food.y){//se não pegou, apaga a cabeça
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //atualiza a posição da cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //cria uma nova cabeça
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 150);

