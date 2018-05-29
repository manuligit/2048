let canvas = createCanvas()
let moves = [];
let score = 0;
let hiscore = 0;

//Initializing game:
function createCanvas()  {
  //array indexes are: 
  // [[0,1,2,3]
  //  [4,5,6,7]
  //  8,9,10,11
  //  12,13,14,15]]
  //Canvas templates for testing:
  let canvas = [[0,0,0,0],[0,0,2,0],[2,0,0,0],[0,0,0,0]];
  //let canvas = [[0,2,0,0],[0,2,0,0],[0,4,0,0],[0,0,0,0]];
  //let canvas = [[0,2,2,0],[2,2,4,2],[2,4,2,2],[0,2,2,0]];
  //let canvas = [[0,0,0,0],[0,0,0,2],[0,0,0,2],[0,0,0,0]];
  //let canvas = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];
  //let canvas = [[4,128,32,4],[64,32,16,2],[32,16,4,8],[2,4,2,4]];
  //let canvas = [[256,8,128,64],[16,128,64,8],[8,2,8,16],[2,8,4,2]]
  for(y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      document.querySelector('.box:nth-child('+((x+4*y)+1)+')').innerText=canvas[y][x]
    }
  }
  return canvas;
};

//Get all possible pairs on the field and check if they are equal
//If there are no more free spaces left:
function getPairs() {
  let paired = [];
  let pairs = [];
  for (i=0;i<4;i++) {
    for(j=0;j<4;j++) {
      //console.log(i,j)
      if (i+1<canvas.length) {
        pairs.push([canvas[j][i],canvas[j][i+1]]);
      }
      if (j+1<canvas.length) {
        pairs.push([canvas[j][i],canvas[j+1][i]]);
      }
    }
  }
  console.log('check')
  //check if there are any equal pairs
  paired = pairs.map(x => x[0] === x[1])
  //pairs.map(x => x[0] === x[1] ? console.log(x) : 0);
  //console.log(pairs);
  
  if (paired.includes(true)) {
    console.log('pairs!!')
    paired = [];
    pairs = [];
    //console.log(pairs);
    return true;

  } else {
    return false;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Update single number to canvas:
function updateCanvas(y, x, number) {
  canvas[y][x] = number;
  document.querySelector('.box:nth-child('+((x+4*y)+1)+')').innerText=number;
  document.querySelector('.score').innerText=score;
  document.querySelector('.hiscore').innerText=hiscore;
  //document.querySelector('.box:nth-child('+((x+4*y)+1)+')').classList.add("left");
  //document.querySelector('.box:nth-child('+((x+4*y)+1)+')').classList.remove("left");
  //update score
  //check win condition (if number===2048)
}

//Check if the numbers are equal:
function checkEqual(fst, snd) {
  if (fst === snd) {
    return true;
  } else {
    return false;
  }
}

//Gets a list of indices where the number is 0, and inserts a random number from 2 and 4 there:
function randomNew() {
  let indices = [];
  if (checkZeroes()) {
    for (i=0;i<4;i++) {
      for(j=0;j<4;j++) {
        if (canvas[j][i] === 0) {
          indices.push([j,i]);
        }
      }
    }
  }

  //console.log(indices)  
  let nrs = [2,4];
  let nr = nrs[getRandomInt(0,1)];
  let ij = indices.length-1;
  let ind = indices[getRandomInt(0,ij)];

  updateCanvas(ind[0],ind[1],nr);
}


// Bad random function that calls itself until a free place is found 
// and loops forever when the canvas is full:
function randomNew2() {
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

// Handle movements to every direction:
function moveCanvas(dir) {
  //todo: check if there are available moves in each direction and only run commands when there are
  //Check direction so that the iterating starts from the correct edge:
  canvasBefore = JSON.stringify(canvas);

  if (dir === "up") {
    for (i = 1; i<4; i++) {
      canvas[i].forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        //moveRow(i,j,(i-1));
        //console.log(i,",",j)
        move(i,j,dir);
      })
    }
  } else if (dir === "down") {
    for (i = 2; i>=0; i--) {
      canvas[i].forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        //console.log(i,",",j)
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
      //console.log('')
    }
  } else if (dir == "right") {
    for (i = 3; i>=0; i--) {
      let col = canvas.map(x => x[i])
      //console.log('row:', col)
      col.forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        //console.log(j,",",i)
        move(j,i,dir);
      })
      //console.log('')
    }
  }
  moves=[];
  
  //Only add new moves 
  if (canvasBefore !== JSON.stringify(canvas)) {
    randomNew();
  }
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
    //console.log(next)
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
        //update highscore if score now is bigger:
        if (score > hiscore) {
          hiscore = score;
        }
      }
    }
  }
}

//Read keypresses:
document.onkeydown = checkKey;
function checkKey(e) {
  if (checkZeroes() || getPairs()) { 
    e = e || window.event;
    if (e.keyCode == '38') {
      // up arrow
      //console.log('up')
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
    lose();
    //document.querySelector('h1').innerText="You lost the game";
  }
}

function lose() {
  //display score in overlay
  //display reset button in overlay
  document.querySelector('.overlay').style.display = "block";
}

function reset() {
  score = 0;
  //don't override high score
  canvas = createCanvas();
  document.querySelector('.overlay').style.display = "none";
}

//TODO:
// Scorekeeping
// Resetting game
// Animations for movement
// "Fan animations"/overlay on boxes when the game is finished
// "Victory animation"/overlay when game is won
// Movement animation on boxes when they are moved
// Testing/centering text in the boxes
// Slide box to the next position and slide "new box" from the edges
// Appearance of new random items