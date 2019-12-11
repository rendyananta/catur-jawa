let canvasElement = document.getElementById('board');
let canvasContext = canvasElement.getContext('2d');

let config = {
    canvas: {
        width: 1440,
        height: 1440
    },
    board: {
        columns: 40,
        rows: 40
    }
};

let boardWidth = config.board.columns * getBoxWidth();
let boardHeight = config.board.rows * getBoxHeight();
let boardX = (config.canvas.width - boardWidth) * 0.5;
let boardY = (config.canvas.height - boardHeight) * 0.5;

let grids = [];
let gridsState = [...new Array(config.board.rows)].map(() => Array(config.board.columns).fill({
    content: null,
    user_id: null
}));

let turn = 'X';
let user = null;
let match = null;
let playerX = null;
let playerO = null;
let matchId = canvasElement.getAttribute('data-match-id');

function getMatch(matchId) {
    axios.get(`/api/game/${matchId}`)
        .then(res => {
            match = res.data.data;

            if (match.state !== undefined && match.state !== null && match.state !== '') {
                gridsState = match.state;
            }

            playerX = match.inviter_id;
            playerO = match.invitee_id;

            console.log(playerX);
            console.log(playerO);

            registerMouseEvent();
            createBoard();

            receiveGridUpdate(match)
        })
}

function getUser() {
    axios.get(`/api/user`)
        .then(res => {
            user = res.data.data;
        })
}

function sendMovement(payload) {
    axios.patch('/api/game/' + match.id + '/move', {
        from: payload.grid,
        states: gridsState
    }).then(res => {
        console.log(res.data)
    });
}

function sendGridUpdate(x, y, gridState) {
    const payload = {
        grid: {
            x: x,
            y: y,
            state: gridState
        }
    };

    console.log('payload', payload);

    sendMovement(payload);
    Echo.private(`match.${match.id}`)
        .whisper('turn', payload)
}

function isPlayerX() {
    return match.inviter_id === user.id
}

function isPlayerO() {
    return !isPlayerX();
}

function receiveGridUpdate(match) {
    Echo.private(`match.${match.id}`)
        .listenForWhisper('turn', e => {
            gridsState[e.grid.x][e.grid.y] = e.grid.state;
            drawSquare(e.grid.state);

            if (isPlayerX() && turn === 'O') {
                drawPlayerO(grids[e.grid.x][e.grid.y]);
                turn = 'X'
            } else if (isPlayerO() && turn === 'X') {
                drawPlayerX(grids[e.grid.x][e.grid.y]);
                turn = 'O'
            }
        })
}

function getBoxWidth() {
    return config.canvas.height * 0.9 / config.board.columns
}

function getBoxHeight() {
    return config.canvas.width * 0.9 / config.board.rows
}

function getMousePosition(event) {
    let rect = canvasElement.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}

function getGridFromMouse(x, y) {
    return grids.flat(2).find(i => x >= i.x && x <= i.xMax && y >= i.y && y <= i.yMax);
}

function getGridIndex(gridItem) {
    let x = null;
    let y = null;
    for (let i = 0; i < config.board.columns; i++) {
        for (let j = 0; j < config.board.rows; j++) {
            if (grids[i][j] === gridItem) {
                x = i;
                y = j;
                break;
            }
        }
    }

    return {
        x: x,
        y: y
    };
}

function registerMouseEvent() {
    canvasElement.addEventListener('mousedown', function (event) {
        let mouse = getMousePosition(event);

        if (mouse.x >= getBoxWidth() && mouse.x <= (config.canvas.width - getBoxWidth()) && mouse.y >= getBoxHeight() && mouse.y <= (config.canvas.height - getBoxHeight())) {
            let grid = getGridFromMouse(mouse.x, mouse.y);
            let gridIndex = getGridIndex(grid);

            // If it has been filled, so end it
            if (gridsState[gridIndex.x][gridIndex.y].content !== undefined && gridsState[gridIndex.x][gridIndex.y].content !== null) {
                return;
            }

            if (isPlayerX() && turn === 'X') {
                gridsState[gridIndex.x][gridIndex.y] = {
                    content: 'X',
                    user: playerX
                };
                drawSquare(grid, 'X');
                turn = 'O';
                sendGridUpdate(gridIndex.x, gridIndex.y, gridsState[gridIndex.x][gridIndex.y])
            } else if (isPlayerO() && turn === 'O') {
                gridsState[gridIndex.x][gridIndex.y] = {
                    content: 'O',
                    user: playerO
                };
                drawSquare(grid, 'O');
                turn = 'X';
                sendGridUpdate(gridIndex.x, gridIndex.y, gridsState[gridIndex.x][gridIndex.y])
            } else {
                console.log('not your turn')
            }
        }

    });
}

function drawSquare(options, step) {
    if (step !== undefined) {
        if (step === 'X') {
            drawPlayerX(options)
        } else if (step === 'O') {
            drawPlayerO(options)
        }
    }

    canvasContext.lineWidth = 1;
    canvasContext.beginPath();
    canvasContext.moveTo(options.xMax, options.y);
    canvasContext.lineTo(options.xMax, options.yMax);
    canvasContext.lineTo(options.x, options.yMax);
    canvasContext.stroke()
}

function drawPlayerX(options) {
    const smallRect = expandRect(options, -5);

    canvasContext.lineWidth = 2;

    canvasContext.beginPath();
    canvasContext.moveTo(smallRect.x, smallRect.y);
    canvasContext.lineTo(smallRect.xMax, smallRect.yMax);
    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.moveTo(smallRect.x, smallRect.yMax);
    canvasContext.lineTo(smallRect.xMax, smallRect.y);
    canvasContext.stroke();
}

function drawPlayerO(options) {
    const smallRect = expandRect(options, -5);
    const radius = Math.min(smallRect.width, smallRect.height);

    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.arc(smallRect.x + smallRect.width * 0.5, smallRect.y + smallRect.height * 0.5, radius * 0.5, 0, Math.PI * 2);
    canvasContext.stroke();
}

function createRect(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        xMax: x + width,
        yMax: y + height
    }
}

function expandRect(rect, dx, dy) {
    if (dy === undefined) {
        dy = dx
    }

    return createRect(
        rect.x - dx * 0.5,
        rect.y - dy * 0.5,
        rect.width + dx,
        rect.height + dy,
    );
}

function calculateBoxRect(outerBox, x, y) {
    return createRect(
        outerBox.x + getBoxWidth() * x,
        outerBox.y + getBoxHeight() * y,
        getBoxWidth(),
        getBoxHeight()
    )
}

function createGrids(outerBox, columns, rows) {
    for (let i = 0; i < columns; i++) {
        grids[i] = [];
        for (let j = 0; j < rows; j++) {
            grids[i][j] = calculateBoxRect(outerBox, i, j);

            drawSquare(grids[i][j]);
        }
    }
}

function createBoard() {
    // Set the board size
    canvasElement.setAttribute('width', config.canvas.width);
    canvasElement.setAttribute('height', config.canvas.height);

    // Setup board
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, config.canvas.width, config.canvas.height);

    let outerBox = createRect(boardX, boardY, boardWidth, boardHeight);

    // Create board grids
    createGrids(outerBox, config.board.columns, config.board.rows);

    canvasContext.strokeStyle = 'black';
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();

    canvasContext.moveTo(outerBox.x, outerBox.y);
    canvasContext.lineTo(outerBox.xMax, outerBox.y);
    canvasContext.lineTo(outerBox.xMax, outerBox.yMax);
    canvasContext.lineTo(outerBox.x, outerBox.yMax);
    canvasContext.closePath();
    canvasContext.stroke();
}

// Starts the game
getUser();
getMatch(matchId);
