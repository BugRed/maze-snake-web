//Capturando a pripriedade
const canvas = document.querySelector('canvas');
//Capturando contexto da propriedade
const ctx = canvas.getContext('2d');

//tamanho da snake
const size = 30;
//crianto a snake como array
const snake = [
    { x: 270, y: 240},
];

let direction, loopId;

const drawSnake = () => {
    //dando cor ao desenho
    ctx.fillStyle = "#483D8B";//DarkSlateBlue

    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "#6A5ACD";//SlateBlue
        }
        //desenhando o objeto
        ctx.fillRect(position.x, position.y, size, size);
    });
};

const moveSnake = () => {

    if (!direction) return

    //acessando o ultimo espaço do array
    const head = snake.at(-1);

    //mover para direita
      if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    //mover para esquerda
    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    };

    //mover para cima
    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    };

    //mover para baixo
    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    };

    //apagando o primeiro espaço do array
    snake.shift();
};


//Loop de criação e manutenção do jogo
const gameLoop = () => {

    //limpando o loop anterior
    clearInterval(loopId);
    //limpando tela antes de mover e desenhar
    ctx.clearRect(0, 0, 600, 600);

    moveSnake();
    drawSnake();

    loopId = setTimeout(() => {
        gameLoop()
    }, 300);

};

gameLoop();

//adicionando eventos ao html, fução para baixo
document.addEventListener("keydown", ({ key }) => {
    if(key == "ArrowRight" && direction != "left"){
        direction = "right"
    }

    if(key == "ArrowLeft" && direction != "right"){
        direction = "left"
    }

    if(key == "ArrowDown" && direction != "up"){
        direction = "down"
    } 

    if(key == "ArrowUp" && direction != "down"){
        direction = "up"
    } 
});






