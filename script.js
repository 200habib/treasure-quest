const grid = document.querySelector("#gameGrid");
const gridSize = 12; 
let playerPosition = 0;
let treasurePosition;
let rocks = [];

function init() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        grid.appendChild(box);
    }

    let boxes = document.querySelectorAll(".box");

    let availablePositions = Array.from(Array(gridSize * gridSize).keys()).filter(i => i !== 0);
    availablePositions.sort(() => Math.random() - 0.5);
    rocks = availablePositions.slice(0, 15); 

    rocks.forEach(index => {
        let rock = document.createElement("img");
        rock.setAttribute("src", "/assets/rock.png");
        rock.classList.add("rock");
        boxes[index].appendChild(rock);
    });

    let player = document.createElement("img");
    player.setAttribute("src", "/assets/player.png");
    player.classList.add("player");
    boxes[playerPosition].appendChild(player);

    let emptyPositions = availablePositions.filter(i => !rocks.includes(i));
    treasurePosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    let treasure = document.createElement("img");
    treasure.setAttribute("src", "/assets/treasure.png");
    treasure.classList.add("treasure");
    boxes[treasurePosition].appendChild(treasure);
}

function movePlayer(direction) {
    let boxes = document.querySelectorAll(".box");
    let newPosition = playerPosition;

    if (direction === "left" && playerPosition % gridSize !== 0) newPosition--;
    if (direction === "right" && playerPosition % gridSize !== gridSize - 1) newPosition++;
    if (direction === "up" && playerPosition >= gridSize) newPosition -= gridSize;
    if (direction === "down" && playerPosition < gridSize * (gridSize - 1)) newPosition += gridSize;

    if (!rocks.includes(newPosition)) {
        let playerImg = boxes[playerPosition].querySelector(".player");
        if (playerImg) boxes[playerPosition].removeChild(playerImg);

        let newPlayer = document.createElement("img");
        newPlayer.setAttribute("src", "/assets/player.png");
        newPlayer.classList.add("player");
        boxes[newPosition].appendChild(newPlayer);

        playerPosition = newPosition;

        if (playerPosition === treasurePosition) {
            setTimeout(() => alert("🏆 You found the treasure! 🎉"), 300);
        }
    }
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") movePlayer("left");
    if (e.key === "ArrowRight") movePlayer("right");
    if (e.key === "ArrowUp") movePlayer("up");
    if (e.key === "ArrowDown") movePlayer("down");
});

init();
