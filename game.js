const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let level = 1;
let gameOver = false;
let won = false;
let keys = {};

let player = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    speed: 4
};

let key = {
    x: 700,
    y: 60,
    width: 30,
    height: 25,
    collected: false
};

let door = {
    x: 730,
    y: 400,
    width: 45,
    height: 60
};

let traps = [];
let enemies = [];
let walls = [];

let message = "Find the key and escape!";

document.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;

    if (event.key.toLowerCase() === "r" && gameOver) {
        restartGame();
    }
});

document.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});

function touching(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function setupLevel() {
    player.x = 50;
    player.y = 50;

    key.collected = false;

    door.x = 730;
    door.y = 400;

    if (level === 1) {
        walls = [
            { x: 0, y: 0, width: 800, height: 20 },
            { x: 0, y: 480, width: 800, height: 20 },
            { x: 0, y: 0, width: 20, height: 500 },
            { x: 780, y: 0, width: 20, height: 500 },

            { x: 150, y: 0, width: 20, height: 80 },
            { x: 150, y: 170, width: 20, height: 330 },

            { x: 300, y: 100, width: 20, height: 300 },

            { x: 450, y: 0, width: 20, height: 180 },
            { x: 450, y: 250, width: 20, height: 250 },

            { x: 600, y: 100, width: 20, height: 300 }
        ];

        traps = [
            { x: 180, y: 120, width: 45, height: 45 },
            { x: 400, y: 250, width: 45, height: 45 },
            { x: 600, y: 120, width: 45, height: 45 }
        ];

        enemies = [
            {
                x: 300,
                y: 100,
                width: 30,
                height: 30,
                dx: 2,
                dy: 0
            },
            {
                x: 500,
                y: 350,
                width: 30,
                height: 30,
                dx: -2,
                dy: 0
            }
        ];

        key.x = 700;
        key.y = 60;

        message = "Level 1: Find the key!";
    }

    if (level === 2) {
        walls = [
            { x: 0, y: 0, width: 800, height: 20 },
            { x: 0, y: 480, width: 800, height: 20 },
            { x: 0, y: 0, width: 20, height: 500 },
            { x: 780, y: 0, width: 20, height: 500 },

            { x: 200, y: 0, width: 20, height: 250 },
            { x: 200, y: 350, width: 20, height: 150 },

            { x: 400, y: 100, width: 20, height: 400 },

            { x: 600, y: 0, width: 20, height: 250 },
            { x: 600, y: 350, width: 20, height: 150 }
        ];

        traps = [
            { x: 100, y: 150, width: 45, height: 45 },
            { x: 300, y: 300, width: 45, height: 45 },
            { x: 500, y: 100, width: 45, height: 45 },
            { x: 680, y: 300, width: 45, height: 45 }
        ];

        enemies = [
            {
                x: 100,
                y: 350,
                width: 30,
                height: 30,
                dx: 3,
                dy: 0
            },
            {
                x: 300,
                y: 100,
                width: 30,
                height: 30,
                dx: -3,
                dy: 0
            },
            {
                x: 650,
                y: 400,
                width: 30,
                height: 30,
                dx: 2,
                dy: 0
            }
        ];

        key.x = 700;
        key.y = 60;

        message = "Level 2: Watch out for more monsters!";
    }

    if (level === 3) {
        walls = [
            { x: 0, y: 0, width: 800, height: 20 },
            { x: 0, y: 480, width: 800, height: 20 },
            { x: 0, y: 0, width: 20, height: 500 },
            { x: 780, y: 0, width: 20, height: 500 },

            { x: 150, y: 0, width: 20, height: 300 },
            { x: 150, y: 400, width: 20, height: 100 },

            { x: 300, y: 100, width: 20, height: 400 },

            { x: 450, y: 0, width: 20, height: 300 },
            { x: 450, y: 400, width: 20, height: 100 },

            { x: 600, y: 100, width: 20, height: 400 }
        ];

        traps = [
            { x: 70, y: 250, width: 45, height: 45 },
            { x: 220, y: 350, width: 45, height: 45 },
            { x: 350, y: 150, width: 45, height: 45 },
            { x: 500, y: 350, width: 45, height: 45 },
            { x: 680, y: 150, width: 45, height: 45 }
        ];

        enemies = [
            {
                x: 100,
                y: 100,
                width: 30,
                height: 30,
                dx: 3,
                dy: 0
            },
            {
                x: 250,
                y: 400,
                width: 30,
                height: 30,
                dx: -3,
                dy: 0
            },
            {
                x: 500,
                y: 100,
                width: 30,
                height: 30,
                dx: 3,
                dy: 0
            },
            {
                x: 650,
                y: 350,
                width: 30,
                height: 30,
                dx: -3,
                dy: 0
            }
        ];

        key.x = 700;
        key.y = 60;

        message = "Level 3: Escape the final dungeon!";
    }
}

function movePlayer() {
    let oldX = player.x;
    let oldY = player.y;

    if (keys["w"] || keys["arrowup"]) {
        player.y -= player.speed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        player.y += player.speed;
    }

    if (keys["a"] || keys["arrowleft"]) {
        player.x -= player.speed;
    }

    if (keys["d"] || keys["arrowright"]) {
        player.x += player.speed;
    }

    for (let wall of walls) {
        if (touching(player, wall)) {
            player.x = oldX;
            player.y = oldY;
            break;
        }
    }
}

function updateEnemies() {
    for (let enemy of enemies) {
        enemy.x += enemy.dx;

        if (
            enemy.x < 25 ||
            enemy.x + enemy.width > canvas.width - 25
        ) {
            enemy.dx *= -1;
        }

        if (touching(player, enemy)) {
            gameOver = true;
            won = false;
            message = "A monster caught you!";
        }
    }
}

function update() {
    if (gameOver) {
        return;
    }

    movePlayer();
    updateEnemies();

    if (!key.collected && touching(player, key)) {
        key.collected = true;
        message = "You found the key! Reach the door!";
    }

    for (let trap of traps) {
        if (touching(player, trap)) {
            gameOver = true;
            won = false;
            message = "You stepped on a trap!";
        }
    }

    if (key.collected && touching(player, door)) {
        if (level < 3) {
            level++;
            setupLevel();
        } else {
            gameOver = true;
            won = true;
            message = "You escaped every dungeon!";
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Walls
    ctx.fillStyle = "#777";

    for (let wall of walls) {
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );
    }

    // Traps
    for (let trap of traps) {
        ctx.fillStyle = "red";

        ctx.fillRect(
            trap.x,
            trap.y,
            trap.width,
            trap.height
        );

        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.moveTo(
            trap.x + 5,
            trap.y + trap.height - 5
        );
        ctx.lineTo(
            trap.x + trap.width / 2,
            trap.y + 5
        );
        ctx.lineTo(
            trap.x + trap.width - 5,
            trap.y + trap.height - 5
        );
        ctx.closePath();
        ctx.fill();
    }

    // Key
    if (!key.collected) {
        ctx.fillStyle = "gold";

        ctx.beginPath();
        ctx.arc(
            key.x + 8,
            key.y + 8,
            8,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillRect(
            key.x + 14,
            key.y + 5,
            15,
            6
        );

        ctx.fillRect(
            key.x + 24,
            key.y + 10,
            5,
            8
        );
    }

    // Door
    ctx.fillStyle = key.collected
        ? "limegreen"
        : "brown";

    ctx.fillRect(
        door.x,
        door.y,
        door.width,
        door.height
    );

    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(
        door.x + 12,
        door.y + 30,
        4,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Enemies
    for (let enemy of enemies) {
        ctx.fillStyle = "purple";

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

        ctx.fillStyle = "red";

        ctx.fillRect(
            enemy.x + 6,
            enemy.y + 7,
            6,
            6
        );

        ctx.fillRect(
            enemy.x + 18,
            enemy.y + 7,
            6,
            6
        );
    }

    // Player
    ctx.fillStyle = "cyan";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    // Text
    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText(message, 20, 30);

    ctx.font = "18px Arial";
    ctx.fillText(
        "Level: " + level + " / 3",
        650,
        30
    );

    ctx.fillText(
        "W/A/S/D or Arrow Keys: Move",
        20,
        55
    );

    // End screen
    if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = won
            ? "limegreen"
            : "red";

        ctx.font = "48px Arial";

        ctx.fillText(
            won ? "YOU ESCAPED!" : "GAME OVER",
            240,
            240
        );

        ctx.fillStyle = "white";
        ctx.font = "26px Arial";

        ctx.fillText(
            "Press R to restart",
            290,
            300
        );
    }
}

function restartGame() {
    level = 1;
    gameOver = false;
    won = false;

    setupLevel();
}

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

setupLevel();
gameLoop();