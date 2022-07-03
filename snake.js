var cells = 20

var container = document.querySelector('.container')
var scoreTag = document.querySelector('.score > h2')
var restart = document.querySelector('.restart')
var gameOver = document.querySelector('.game-over')
var gameOverScore = document.querySelector('.game-over > div h2')

var containerWidth = container.clientWidth
var containerHeight = container.clientHeight
var score = 0



var snakeBody = {
    toado: [{x: 10*25,y: 10*25}],
    getToado: function() {return this.toado},
    setToado: function(toado) {this.toado = toado},
    draw: function() {
        var square = document.querySelector('span')
        var getSquare = document.querySelectorAll('span')

        this.toado.map((snake) => {
            snake.x = snake.x > (containerWidth - square.offsetWidth) ? 0 : snake.x
            snake.x = snake.x < 0 ? (containerWidth - square.offsetWidth) : snake.x
            snake.y = snake.y > (containerHeight - square.offsetHeight) ? 0 : snake.y
            snake.y = snake.y < 0 ? (containerHeight - square.offsetHeight) : snake.y

            getSquare.forEach((item) => {
                if(item.offsetLeft == snake.x && item.offsetTop == snake.y){
                    item.classList.add('snake')
                }
            })
        })
    },
    move: function(x, y) {
        var array = []
        var lastItem = this.toado.length - 1
        var squareActive = document.querySelectorAll('span.snake')

        
        squareActive.forEach((item) => {
            if(item.offsetLeft == this.toado[0].x && item.offsetTop == this.toado[0].y){
                item.classList.remove('snake')
            }
        })

        eat()
        
        for(let i = this.toado.length - 1; i>0; i--){
            array[i-1] = this.toado[i]
        }
        
        array.push({x:this.toado[lastItem].x + x,y:this.toado[lastItem].y + y})
        this.setToado(array)
    }
}

var food = {
    toado: [{x: 0, y:0}],
    getToado: function() {return this.toado},
    setToado: function(toado) {this.toado = toado},
    draw: function() {
        var getSquare = document.querySelectorAll('span')
    
        this.toado.map((food) => {
            getSquare.forEach((item) => {
                if(item.offsetLeft == food.x && item.offsetTop == food.y){
                    item.classList.add('food')
                }
            })
        })
    }
}

var move = {
    x:0,
    y:0,
    getX: function() {return x},
    setX: function(x) {this.x = x},
    getY: function() {return y},
    setY: function(y) {this.y = y}
}

var key = {
    keyUp: false,
    keyDown: false,
    keyRight: false,
    keyLeft: false,
    setKeyUP: function(isKey) {return this.keyUp = isKey},
    setKeyDown: function(isKey) {return this.keyDown = isKey},
    setKeyRight: function(isKey) {return this.keyRight = isKey},
    setKeyLeft: function(isKey) {return this.keyLeft = isKey},
    resetKey: function() {
        this.keyUp = false
        this.keyDown = false
        this.keyLeft = false
        this.keyRight = false
    }
}

function drawCells() {
    var i = 0
    
    while(i<cells*cells) {
        var square = document.createElement('span')
            
        square.style.width = (containerWidth / cells)+'px'
        square.style.height = (containerHeight / cells)+'px'
    
        container.appendChild(square)
        i++
    }
}

function eat() {
    var squareActive = document.querySelector('.food')

    snakeBody.toado.map((item) => {
        if(item.x == food.toado[0].x && item.y == food.toado[0].y) {
            snakeBody.toado.push({x:food.toado[0].x+move.x,y:food.toado[0].y+move.y})
            squareActive.classList.remove('food')
            
            var randomX = Math.floor(Math.random() * cells)
            var randomY = Math.floor(Math.random() * cells)

            score++
            scoreTag.innerHTML = score
            gameOverScore.innerHTML = score

            food.setToado([{x:randomX*25, y:randomY*25}])
            food.draw()
        }
    })
}

function end(start) {
    var squareActive = document.querySelectorAll('.snake')
    var lastItem = snakeBody.toado.length - 1

    squareActive.forEach((item) => {
        if(item.offsetLeft == snakeBody.toado[lastItem].x && item.offsetTop == snakeBody.toado[lastItem].y){
            clearInterval(start)
            gameOver.style.display = 'flex'
        }
    })
}

window.onkeydown = function(e) {
    if(key.keyDown && e.keyCode == 38) {
        return
    } else if(key.keyUp && e.keyCode == 40) {
        return
    } else if(key.keyRight && e.keyCode == 37) {
        return
    } else if(key.keyLeft && e.keyCode == 39) {
        return
    }
    else {
        if(e.keyCode == 40) {
            key.resetKey()
            key.setKeyDown(true)
            move.setX(0)
            move.setY(25)
        }
        if(e.keyCode == 38) {
            key.resetKey()
            key.setKeyUP(true)
            move.setX(0)
            move.setY(-25)
        }
        if(e.keyCode == 37) {
            key.resetKey()
            key.setKeyLeft(true)
            move.setX(-25)
            move.setY(0)
        }
        if(e.keyCode == 39) {
            key.resetKey()
            key.setKeyRight(true)
            move.setX(25)
            move.setY(0)
        }
    }
}

restart.onclick = function() {
    location.reload()
}

function start() {
    var randomX = Math.floor(Math.random() * cells)
    var randomY = Math.floor(Math.random() * cells)

    drawCells()

    snakeBody.draw()

    food.setToado([{x:randomX*25, y:randomY*25}])

    food.draw()
    
    var start = setInterval(() => {
        snakeBody.move(move.x, move.y)
        // end()
        end(start)
        snakeBody.draw()
    }, 100);
}

start()