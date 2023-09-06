//Capturando a pripriedade
const canvas = document.querySelector('canvas');
//Capturando contexto da propriedade
const ctx = canvas.getContext('2d');

//tamanho da snake
const size = 30;
//crianto a snake como array
const snake = [
    {x: 200, y: 200},
    {x: 230, y: 200},
    {x: 260, y: 200},
    {x: 290, y: 200}
];

const drawSnake = () => {
    //dando cor ao desenho
    ctx.fillStyle = "#483D8B";//DarkSlateBlue
    
    snake.forEach((position, index) => {
        
        if(index == snake.length - 1){
            ctx.fillStyle = "#6A5ACD";//SlateBlue
        }
        //desenhando o objeto
        ctx.fillRect(position.x, position.y, size, size);
    });
};

drawSnake();



