//Capturando a pripriedade
const canvas = document.querySelector('canvas');
//Capturando contexto da propriedade
const ctx = canvas.getContext('2d');

const audio = new Audio('../assets/audio.mp3');

//tamanho da snake
const size = 30;
//crianto a snake como array
const snake = [
    { x: 270, y: 240 },
];

//gerando um numero aleatorio com minimo e maximo
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

//gerando uma posição aleatoria
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
};

//gerando uma cor aleatoria
const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

//criando a comida item interativo
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
};

//criando direção, id de loop
let direction, loopId;


const drawFood = () => {

    //desestruturando para usar dentro da function
    const { x, y, color } = food;
    //efeito de borrar e sombra
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    //zerar o blur para não atingir outros elementos da tela
    ctx.shadowBlur = 0;

}

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

const drawGrid = () => {
    //definindo tamanho e cor do desenho em linha
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919 ";

    //definindo começo e fim
    for (let i = 30; i < canvas.width; i += size) {

        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        //função que efetivamente desenha
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }



}

const checkEat = () => {
    const head = snake[snake.length - 1];

    if (head.x == food.x && head.y == food.y) {
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();

        while(snake.find((position)=>  position.x == x && position.y == y)){
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
}

//Loop de criação e manutenção do jogo
const gameLoop = () => {

    //limpando o loop anterior
    clearInterval(loopId);
    //limpando tela antes de mover e desenhar
    ctx.clearRect(0, 0, 600, 600);

    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();

    loopId = setTimeout(() => {
        gameLoop()
    }, 300);

};

gameLoop();

//adicionando eventos ao html, fução para baixo
document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
});






