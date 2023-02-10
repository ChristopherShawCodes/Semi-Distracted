
const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
const player = {
    speed:5,
    score: 0
}

let keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}


startScreen.addEventListener('click', start)
document.addEventListener('keydown', pressOn)
document.addEventListener('keyup', pressOff)

function moveLines() {
    let line = document.querySelectorAll('.line')
    line.forEach(function(item){
        if(item.y > 750) {
            item.y -= 1200
        }
        item.y += player.speed - 1
        item.style.top = item.y + "px"
    })

    let line2 = document.querySelectorAll('.line2')
    line2.forEach(function(item){
        if(item.y > 750) {
            item.y -= 1200
        }
        item.y += player.speed - 1
        item.style.top = item.y + "px"
    })

    let line3 = document.querySelectorAll('.line3')
    line3.forEach(function(item){
        if(item.y > 750) {
            item.y -= 1200
        }
        item.y += player.speed - 1
        item.style.top = item.y + "px"
    })

}

function isCollide(a,b) {
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()

    return !(
        (aRect.bottom < bRect.top) || 
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
        )
}


function moveEnemy(car) {
    let ele = document.querySelectorAll('.enemy')
    ele.forEach(function(item){
        if(isCollide(car,item)){
            console.log("Game Over")
            endGame()
        }
        if(item.y > 750) {
            item.y = -600
            item.style.left = Math.floor(Math.random() * 650) + "px"
        }
        item.y += player.speed - 2
        item.style.top = item.y + "px"
    })
}

function playGame() {
    let car = document.querySelector(".car")
    let road = gameArea.getBoundingClientRect()
    
    moveLines()
    moveEnemy(car)

    if (player.start){
        if(keys.ArrowUp && player.y > road.top){player.y -= player.speed}
        if(keys.ArrowDown && player.y < road.bottom - 130){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 10){player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width - 60 )){player.x += player.speed}

        car.style.left = player.x + 'px'
        car.style.top = player.y + 'px'

        window.requestAnimationFrame(playGame)
        player.score ++ 
        score.innerText = "Score: " + player.score
    }
}

function pressOn(e) {
    e.preventDefault()
    keys[e.key] = true
    console.log(keys)
}

function pressOff(e) {
    e.preventDefault()
    keys[e.key] = false
    console.log(keys)
}

function start() {
    startScreen.classList.add("hide")
    score.classList.remove("hidden")
    gameArea.classList.remove("hide")
    gameArea.innerHTML = ""
    player.start = true
    player.score = 0

    // Line Creation
    for(let x = 0; x < 10; x++){
        let div = document.createElement("div")
        div.classList.add("line")
        div.y = x * 150
        div.style.top = (x * 150) + "px"
        gameArea.appendChild(div)
    }

    for(let x = 0; x < 10; x++){
        let div2 = document.createElement("div")
        div2.classList.add("line2")
        div2.y = x * 150
        div2.style.top = (x * 150) + "px"
        gameArea.appendChild(div2)
    }

    for(let x = 0; x < 10; x++){
        let div3 = document.createElement("div")
        div3.classList.add("line3")
        div3.y = x * 150
        div3.style.top = (x * 150) + "px"
        gameArea.appendChild(div3)
    }

    window.requestAnimationFrame(playGame)
    let car = document.createElement("div")
    car.setAttribute("class","car")
    gameArea.appendChild(car)
    player.x = car.offsetLeft
    player.y = car.offsetTop

        // Car Creation
        for(let x = 0; x < 3; x++){
            let enemy = document.createElement("div")
            enemy.classList.add("enemy")
            enemy.y = ((x+1) * 800)* -1
            enemy.style.top = enemy.y + "px"
            enemy.style.left = Math.floor(Math.random() * 750) + "px"
    
            gameArea.appendChild(enemy)
        }
}

function endGame(){
    player.start = false
    startScreen.innerHTML = "Game Over <br> Your score " + player.score + "<br><span class='span'>Press here to play again</span>"
    startScreen.classList.remove("hide")
    score.classList.add("hidden")
}