//Capturando a pripriedade
const canvas = document.querySelector('canvas');
//Capturando contexto da propriedade
const ctx = canvas.getContext('2d');

const score = document.querySelector('.score--value');
const finalScore = document.querySelector('.final-score > span');
const menu = document.querySelector('.menu-screen');
const buttonPlay = document.querySelector('.btn-play');

const audioTakeBall = new Audio('../assets/audio.mp3');
// const audioGameOver = new Audio('../assets/game-over.wav');

//tamanho da snake
const size = 30;
//crianto a snake como array
const initialPosition = { x: 270, y: 240 };
let snake = [initialPosition];

const incrementScore = () => {
    score.innerText = +score.innerText + 10;
};

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
        incrementScore();
        snake.push(head);
        audioTakeBall.play();

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
}

const checkCollison = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver();
    }
};

const gameOver = () => {
    direction = undefined;
    menu.style.display = 'flex';
    finalScore.innerText = score.innerText;
    canvas.style.filter = 'blur(3px)';

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
    checkCollison();
    



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

buttonPlay.addEventListener('click', () => {

    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";
    snake = [initialPosition];

});






