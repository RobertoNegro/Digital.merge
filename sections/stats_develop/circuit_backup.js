let canvas = $('#id_canvas').get(0);
let ctx = canvas.getContext('2d');

const circuitColor = "#FFBF00";
const cellSize = 50;

let heads = [];
let matrix = [];

// random [0, 1)
function random() {
  return Math.random();
}

// min AND max inclusive
function randomInt(min, max) {
  return Math.floor(random() * (1 + max - min)) + min;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function show() {
  resizeCanvas();
  $(window).on("resize", resizeCanvas);

	for(let i = 0; i < 25; i++) {
  	addNewHead();
	  while(heads[0])
  		moveHead(heads[0]);
  }
}

function addNewHead() {
  const height = canvas.height;
  const width = canvas.width;
  const padding = 50.0;

  let added = false;


  while (!added) {
    const row = randomInt(0, height / padding - 2);
    const col = randomInt(0, width / padding - 2);

    if (!matrix[row])
      matrix[row] = [];

    if (!matrix[row][col]) {
      matrix[row][col] = true;

      let lineDirection = randomInt(1, 8);
      let circuitType = randomInt(1, 2);

      heads.push({
        col: col,
        row: row,
        lineDirection: lineDirection
      });

      console.log("[CANVAS] Added new head! (" + heads.length + " heads)");
      added = true;

      drawTerminalNode(col, row, circuitType);
    }
  }
}

function moveHead(head) {
  // head => { col: 0-..., row: 0-..., lineDirection: 1-8 }

  let possibleDirections = [];
  for (let i = 1; i <= 8; i++) {
    if (isNextMoveEmpty(head, i))
      possibleDirections.push(i);
  }

  // no more moves
  if (possibleDirections.length === 0) {
    drawTerminalNode(head.col, head.row, randomInt(1, 2));

    let indexHead = heads.indexOf(head);
    if (indexHead >= 0)
      heads.splice(indexHead, 1);

    return;
  }

  let indexDirection = possibleDirections.indexOf(head.lineDirection);
  if (indexDirection >= 0)
    possibleDirections.splice(indexDirection, 1);

	// change direction
  if (possibleDirections.length > 0 && (!isNextMoveEmpty(head) || random() < .2)) { 
    let newDirection;
    do {
      let indexPos = randomInt(0, possibleDirections.length - 1);
      newDirection = possibleDirections[indexPos];
      possibleDirections.splice(indexPos, 1);
    } while (!isNextMoveEmpty(head, newDirection) && possibleDirections.length > 0);

    if (!isNextMoveEmpty(head, newDirection)) {
      console.error('Something went wrong finding a new direction..');
      return;
    }

    head.lineDirection = newDirection;
  }

  drawLine(head.col, head.row, head.lineDirection);

  if (head.lineDirection == 4 || head.lineDirection == 5 || head.lineDirection == 6)
    head.row++;
  if (head.lineDirection == 1 || head.lineDirection == 2 || head.lineDirection == 8)
    head.row--;
  if (head.lineDirection == 2 || head.lineDirection == 3 || head.lineDirection == 4)
    head.col++;
  if (head.lineDirection == 6 || head.lineDirection == 7 || head.lineDirection == 8)
    head.col--;

  if(!matrix[head.row])
  	matrix[head.row] = [];

  matrix[head.row][head.col] = true;

  drawLine(head.col, head.row, head.lineDirection, true);
}

function isNextMoveEmpty(head, newDirection) {
  if (!newDirection)
    newDirection = head.lineDirection;

  let row = head.row;
  let col = head.col;

  if (newDirection === 4 || newDirection === 5 || newDirection === 6)
    row++;
  if (newDirection === 1 || newDirection === 2 || newDirection === 8)
    row--;
  if (newDirection === 2 || newDirection === 3 || newDirection === 4)
    col++;
  if (newDirection === 6 || newDirection === 7 || newDirection === 8)
    col--;

  if(col < 0 || row < 0 || col*cellSize + cellSize > canvas.width || row*cellSize + cellSize > canvas.height)
  	return false;

  let destinationIsEmpty = !(matrix[row] && matrix[row][col]);
  let diagonalIsEmpty = true;

  if(newDirection === 2) 
  	diagonalIsEmpty = !(matrix[head.row] && matrix[head.row][head.col + 1] && matrix[head.row - 1] && matrix[head.row - 1][head.col]);
  if(newDirection === 4) 
  	diagonalIsEmpty = !(matrix[head.row] && matrix[head.row][head.col + 1] && matrix[head.row + 1] && matrix[head.row + 1][head.col]);
  if(newDirection === 6) 
  	diagonalIsEmpty = !(matrix[head.row] && matrix[head.row][head.col - 1] && matrix[head.row + 1] && matrix[head.row + 1][head.col]);
  if(newDirection === 8) 
  	diagonalIsEmpty = !(matrix[head.row] && matrix[head.row][head.col - 1] && matrix[head.row - 1] && matrix[head.row - 1][head.col]);

  return destinationIsEmpty && diagonalIsEmpty;
}

function drawLine(col, row, lineDirection, inverse) {
  let x = col * cellSize;
  let y = row * cellSize;

  ctx.beginPath();

  ctx.strokeStyle = circuitColor;
  ctx.lineWidth = cellSize / 10;
	ctx.lineCap="round";

  ctx.moveTo(x + cellSize / 2, y + cellSize / 2);

  let dir = lineDirection;

  if(inverse) {
  	dir = dir + 4;
  	if(dir > 8)
  		dir = dir % 8;
  }

  switch (dir) {
    case 1: // up 
      ctx.lineTo(x + cellSize / 2, y);
      break;
    case 2: // up-right
      ctx.lineTo(x + cellSize, y);
      break;
    case 3: // right
      ctx.lineTo(x + cellSize, y + cellSize / 2);
      break;
    case 4: // down-right
      ctx.lineTo(x + cellSize, y + cellSize);
      break;
    case 5: // down
      ctx.lineTo(x + cellSize / 2, y + cellSize);
      break;
    case 6: // down-left
      ctx.lineTo(x, y + cellSize);
      break;
    case 7: // left
      ctx.lineTo(x, y + cellSize / 2);
      break;
    case 8: // up-left								
      ctx.lineTo(x, y);
      break;
    default:
      console.error('Invalid lineDirection: ' + lineDirection);
      break;
  } 

  ctx.stroke();
}

function drawTerminalNode(col, row, circuitType) {
  let x = col * cellSize;
  let y = row * cellSize;

  // Draw cap
  ctx.fillStyle = circuitColor;
  switch (circuitType) {
    case 1:
      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 4, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case 2:
      ctx.fillRect(x + cellSize / 4, y + cellSize / 4, cellSize / 2, cellSize / 2);
      break;
    default:
      console.error('Invalid circuitType: ' + circuitType);
      break;
  }
}
