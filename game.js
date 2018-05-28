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
  //let canvas = [[0,0,0,0],[0,0,2,0],[2,0,0,0],[0,0,0,0]];
  //let canvas = [[0,2,0,0],[0,2,0,0],[0,4,0,0],[0,0,0,0]];
  let canvas = [[0,2,2,0],[2,2,4,2],[2,4,2,2],[0,2,2,0]];
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

//check if single row has free items
// function checkFrees(list) {
//   let free = list.map(re => re.filter(x => (x === 0)));
//   //let free = list.filter(x => x === 0);
//   //let freeCanvas = list.map(r => r.filter((x,i) => {if (x === 0) { i }}));
//   if (free.length > 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

//Update single number to canvas:
function updateCanvas(y, x, number) {
  canvas[y][x] = number;
  //console.log(number, ' ', canvas[x][y])
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

//Bad random function that calls itself until a free place is found:
function randomNew() {
  //console.log(canvas)
  let x = getRandomInt(0,3);
  let y = getRandomInt(0,3);
  let nrs = [2,4]
  let n = nrs[getRandomInt(0,1)];

  if (canvas[y][x] == 0) {
    //console.log('x: ', x, ' y: ', y, ' n: ', canvas[x][y])
    updateCanvas(y,x,n)
  } else {
    randomNew()
  }
}

//Add new random number to list:
// function addNew() {
//   //Choose between 2 or 4 randomly:
//   let nrs = [2,4]
//   let number = nrs[getRandomInt(0,1)];
//   //Get free numbers from canvas:

//   //Get index of a free number:
//   //let rnd = getRandomInt(0,frees.length);
//   //let newIdx = frees[rnd];
//   console.log(newIdx)
//   updateNumber(newIdx, number);
// }

//get row: canvas.map(x => x[i])

// function getFrees() {
//   let frees = []
//   canvas.forEach(function (x,i) {
//     if (x === 0) {
//       frees.push(i);
//     } 
//   });
//   return frees;
// }

function checkMoves(y,x) {

  if (moves.length === 0) {
    //console.log("no moves")
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

}