let canvas = createCanvas()
let moves = [];

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
  console.log(canvas)
  let x = getRandomInt(0,3);
  let y = getRandomInt(0,3);
  let nrs = [2,4]
  let n = nrs[getRandomInt(0,1)];

  if (canvas[y][x] == 0) {
    console.log('x: ', x, ' y: ', y, ' n: ', canvas[x][y])
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
  if (y === moves[0] && x === moves[1]) {
    return true;
  } else {
    return false;
  }
}


function moveCanvas(dir) {
  //todo: check if there are available moves in each direction and only run commands when there are
  //let moves = canvas.map(x=> checkFrees(x))
  moves = [true];
  if (!moves.includes(true)) {
    //terminate game if there are zero available moves
    console.log('you lost the game')
  }

  if (dir === "up") {
    for (i = 1; i<4; i++) {
      canvas[i].forEach(function (x, j) {
        canvas.map(x => console.log(x))
        moveRow(i,j,(i-1));
      })
      moves = [];
      console.log('')
    }
  } else if (dir === "down") {
    for (i = 2; i>=0; i--) {
      canvas[i].forEach(function (x, j) {
        canvas.map(x => console.log(x))
        moveDown(i,j);
      })
      console.log('')
  }
  } else if (dir === "left") { 
    for (i = 0; i<4; i++) {
      let col = canvas.map(x => x[i])
      col.forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        moveLeft(j,i);
      })
      console.log('')
    }
  } else if (dir == "right") {
    for (i = 3; i>=0; i--) {
      let col = canvas.map(x => x[i])
      console.log('row:', col)
      col.forEach(function (x, j) {
        //canvas.map(x => console.log(x))
        moveRight(j,i);
      })
      console.log('')
    }
  }
  randomNew();
}


function moveRow(y,x,z) {
  //Get the number in the upper element:
  let nr = canvas[y][x];
  if (nr !== 0 && z>= 0 && z < 4) {
    //Get number of the next item:
    let mv = canvas[z][x];
    console.log('move', z, ' nr: ', nr, 'y: ', y, ' x: ', x);
    if (mv === 0) {
      //Make the original number 0:
      updateCanvas(y,x,0);
      updateCanvas(z,x,nr);
      //Continue moving up if not in the upper row:

      if (z>= 0 && z < 4) {
          moveRow(z,x,nr)
      }
    } else if (mv === nr) {
      if (!checkMoves(z,x)) {
        console.log('AAAAAAAAAAAAAAAA', moves)
        updateCanvas(y,x,0);
        updateCanvas(z,x,(nr*2));
        moves = [z,x];
      }
      }
  }
}




  function moveUp(y,x) {
    //Get the number in the upper element:
    let nr = canvas[y][x];
    if (nr !== 0) {
      let up = canvas[(y-1)][x];
      console.log('up', up, ' nr: ', nr, 'y: ', y, ' x: ', x);
      if (up === 0) {
        //Make the original number 0:
        updateCanvas(y,x,0);
        updateCanvas((y-1),x,nr);
        //Continue moving up if not in the upper row:

        if ((y-2)>=0) {
          //check if the number is 0 so there will be no dublicate moves:
          //if (canvas[(y-2)][x] === 0) {
            moveUp((y-1),x,nr)
          //}
        }
      } else if (up === nr) {
        if (!checkMoves((y-1),x)) {
          console.log(moves)
          updateCanvas(y,x,0);
          updateCanvas((y-1),x,(nr*2));
          moves = [(y-1),x];
        }
        }
    }
  }

  function moveDown(y,x) {
    let nr = canvas[y][x];
    //Get the number in the upper element:
    if (nr !== 0) {
      let down = canvas[(y+1)][x];
      console.log('down', down, ' nr: ', nr, 'y: ', y, ' x: ', x);
      if (down === 0) {
        //Make the original number 0:
        updateCanvas(y,x,0);
        updateCanvas((y+1),x,nr);
        if ((y+2)<=3) {
          //if (canvas[(y+2)][x] === 0) {
            moveDown((y+1),x,nr)
          //}
        }
      } else if (down === nr) {
        updateCanvas(y,x,0);
        updateCanvas((y+1),x,(nr*2));
      }
    }
  }

  function moveLeft(y,x) {
    let nr = canvas[y][x];
    //Get the number in the upper element:
    if (nr !== 0) {
      let left = canvas[y][x-1];
      console.log('left', left, ' nr: ', nr, 'y: ', y, ' x: ', x);
      if (left === 0) {
        //Make the original number 0:
        updateCanvas(y,x,0);
        updateCanvas(y,(x-1),nr);
        canvas.map(x => console.log(x))
        if ((x-2)>=0) {
          //if (canvas[y][(x-2)] === 0) {
            moveLeft(y,(x-1),nr)
          //}
        }
      } else if (left === nr) {
        updateCanvas(y,x,0);
        updateCanvas(y,(x-1),(nr*2));
      }
    }
  }


  function moveRight(y,x) {
    let nr = canvas[y][x];
    //Get the number in the upper element:
    if (nr !== 0) {
      let right = canvas[y][x+1];
      //console.log('right', right, ' nr: ', nr, 'y: ', y, ' x: ', x);
      if (right === 0) {
        //Make the original number 0:
        updateCanvas(y,x,0);
        updateCanvas(y,(x+1),nr);
        //canvas.map(x => console.log(x))
        if ((x+2)<=3) {
          //if (canvas[y][(x+2)] === 0) {
            moveRight(y,(x+1),nr)
          //}
        }
      } else if (right === nr) {
        updateCanvas(y,x,0);
        updateCanvas(y,(x+1),(nr*2));
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