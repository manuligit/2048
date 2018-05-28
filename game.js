let canvas = createCanvas()
let moves = [];
let score = 0;

//Initializing game:
function createCanvas()  {
  //array indexes are: 
  // [[0,1,2,3]
  //  [4,5,6,7]
  //  8,9,10,11
  //  12,13,14,15]
  //Canvas templates for testing:
  let canvas = [[0,0,0,0],[0,0,2,0],[2,0,0,0],[0,0,0,0]];
  //let canvas = [[0,2,0,0],[0,2,0,0],[0,4,0,0],[0,0,0,0]];
  //let canvas = [[0,2,2,0],[2,2,4,2],[2,4,2,2],[0,2,2,0]];
  //let canvas = [[0,0,0,0],[0,0,0,2],[0,0,0,2],[0,0,0,0]];
  //let canvas = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];


  for(y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      document.querySelector('.box:nth-child('+((x+4*y)+1)+')').innerText=canvas[y][x]
    }
  }
  return canvas;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Update single number to canvas:
function updateCanvas(y, x, number) {
  canvas[y][x] = number;
  document.querySelector('.box:nth-child('+((x+4*y)+1)+')').innerText=number
}

//Check if the numbers are equal:
function checkEqual(fst, snd) {
  if (fst === snd) {
    return true;
  } else {
    return false;
  }
}

//Transform canvas to simple array for checks:
function canvasToArray() {
  console.log(snib)
}

// Bad random function that calls itself until a free place is found 
// and loops forever when the canvas is full:
function randomNew() {
  //Check that there are free spaces in the field:
  if (checkZeroes()) {
    let x = getRandomInt(0,3);
    let y = getRandomInt(0,3);
    let nrs = [2,4];
    let n = nrs[getRandomInt(0,1)];

    if (canvas[y][x] == 0) {
      //console.log('x: ', x, ' y: ', y, ' n: ', canvas[x][y])
      updateCanvas(y,x,n);
    } else {
      randomNew();
    }
  }
}

//Check if canvas has free spaces left
function checkZeroes() {
  let zeroes = canvas.map(x => x.includes(0));
  return (zeroes.includes(true));
}

//Check if the canvas has moves left (equal neighbors)
function checkNeighbors() {
  //rows
  let check = false;
  for (i=0;i<3;i++) {
    for(j=0;j<3;j++) {
      //check the neighbors on left and down
      if ((canvas[j][i] === canvas[(j+1)][i]) || canvas[j][i] === canvas[j][(i+1)]) {
        check = true;
        //Stop looping if single match is found
        break;
      }
    }
  }
  console.log('check', check)
  return check;
}

//Check if move (combined two numbers) has already made during the same turn in a specific spot
function checkMoves(y,x) {
  if (moves.length === 0) {
    return false;
  }
  //check if numbers have been combined before in the spot during this turn:
  let used = moves.map(m => m[0] === y && m[1] === x)
  if (used.includes(true)) {
    //console.log('incl', moves.includes([y,x]))
    return true;
  } else {
    return false;
  }
}

function moveCanvas(dir) {
  //todo: check if there are available moves in each direction and only run commands when there are
  //Check direction so that the iterating starts from the correct edge:
  if (dir === "up") {
    for (i = 1; i<4; i++) {
      canvas[i].forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        //moveRow(i,j,(i-1));
        console.log(i,",",j)
        move(i,j,dir);
      })
    }
  } else if (dir === "down") {
    for (i = 2; i>=0; i--) {
      canvas[i].forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        console.log(i,",",j)
        move(i,j,dir);
      })
    }
  } else if (dir === "left") { 
    for (i = 0; i<4; i++) {
      let col = canvas.map(x => x[i])
      col.forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        //console.log(j,",",i)
        move(j,i,dir);
      })
      console.log('')
    }
  } else if (dir == "right") {
    for (i = 3; i>=0; i--) {
      let col = canvas.map(x => x[i])
      console.log('row:', col)
      col.forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        //console.log(j,",",i)
        move(j,i,dir);
      })
      console.log('')
    }
  }
  moves=[];
  randomNew();
}

function move(y,x,dir) {  
  //Get the number in the upper element:
  let nr = canvas[y][x];
  if (nr !== 0) {
    //Calculate all variables needed for movement
    let ny, nx, cond;
    if (dir === 'up') {
      ny = y-1;
      nx = x;
      ny2 = y-2;
      nx2 = x;
      cond = (ny>0)
    } else if (dir === 'down') {
      ny = y+1;
      nx = x;
      ny2 = y+2;
      nx2 = x;
      cond = (ny2<4)
    } else if (dir === 'left') {
      ny = y;
      nx = x-1;
      ny2 = y;
      nx2 = x-2;
      cond = (nx>0)
    } else if (dir === 'right') {
      ny = y;
      nx = x+1;
      ny2 = y;
      nx2 = x+2;
      cond = (nx<4)
    }

    let next = canvas[ny][nx];
    console.log(next)
    if (next === 0) {
      //Replace the original number with 0:
      updateCanvas(y,x,0);
      updateCanvas(ny,nx,nr);
      //Continue moving if not on the edge:
      if (cond) {
        //console.log(cond)
        //console.log('move ', y, ' ', x)
        //console.log(ny, ',', nx, ',', nr)
        move(ny,nx,dir)
      }
    } else if (next === nr) {
      //console.log('moves', moves)
      //console.log((y-1), ',',x)
      //console.log(checkMoves((y-1),x))
      if (checkMoves(ny,nx) === false) {
        //console.log('MOVES UP', moves)
        updateCanvas(y,x,0);
        updateCanvas(ny,nx,(nr*2));
        //Add combined number to moves:
        moves.push([ny,nx]);
        //Add number to score:
        score = score + (nr*2);
      }
    }
  }
}

//Reading keypresses:
document.onkeydown = checkKey;
function checkKey(e) {
  if (checkZeroes() || checkNeighbors()) { 
    e = e || window.event;
    if (e.keyCode == '38') {
      // up arrow
      console.log('up')
      moveCanvas("up");
      //updateCanvas();
    }
    else if (e.keyCode == '40') {
      // down arrow
      //console.log('down')
      moveCanvas("down");
    }
    else if (e.keyCode == '37') {
      // left arrow
      //console.log('left')
      moveCanvas("left");
    }
    else if (e.keyCode == '39') {
      // right arrow
      //console.log('right')
      moveCanvas("right");
    }
  } else {
    //check if there are elements that can be 
    document.querySelector('h1').innerText="You lost the game";
  }
}

//TODO:
// Scorekeeping
// Resetting game
// Proper random generating new numbers
// Checking for available moves (check if there are empty spaces or that 
// moves can be made to any direction)
// Animations for movement