let canvas = createCanvas()

//Initializing game:
function createCanvas()  {
  //array indexes are: 
  // [[0,1,2,3]
  //  [4,5,6,7]
  //  8,9,10,11
  //  12,13,14,15]
  let canvas = [[0,0,0,0],[0,0,2,0],[2,0,0,0],[0,0,0,1]];
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
        moveUp(i,j);
      })
      console.log('')
    }
  } else if (dir === "down") {
    for (i = 1; i<4; i++) {
      canvas[i].forEach(function (x, j) {
        canvas.map(x => console.log(x))
        moveUp(i,j);
      })
      console.log('')
  } else if (dir === "left") { 
    canvas.forEach(function (x, i) {
    //take row of items
    //iterate them from left to right:
      // get one column: moveLeft(canvas.map(x => x[i]))
    });
  } else if (dir == "right") {
    //take row of items
    //iterate them from right to left:
    // get one column: moveRight(canvas.map(x => x[i]))
    canvas.forEach(function (x, i) {
      moveRight(i,x);
    });
  }

  randomNew();
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
          moveUp((y-1),x,nr)
        }
      } else if (up === nr) {
        updateCanvas(y,x,0);
        updateCanvas((y-1),x,(nr*2));
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
          moveDown((y+1),x,nr)
        }
      } else if (down === nr) {
        updateCanvas(y,x,0);
        updateCanvas((y+1),x,(nr*2));
      }
    }



    // updateCanvas(y,x,n)
  }

  // function moveUp(i, x) {
//   if (x > 0 && i>3) {
//     //Get index of upper element:
//     let ui = i-4;
//     //Get the number in the upper element:
//     let up = canvas[ui];
//     if (up === 0) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       updateNumber(ui, x);
//       moveUp(ui, x)
//     } else if (up === x) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       //The new number is x*2:
//       updateNumber(ui, x*2);
//     }
//   }
// }


  // if (addNew() === null) {
  //   console.log("YOU LOST THE GAME")
  // }
  // // canvas.forEach(function (x, i) {
  //   if (dir === "up" && x !== 0) {
  //     moveUp(i, x);
  //   } else if (dir === "down" && x !== 0) {
  //     moveDown(i,x);
  //   } else if (dir === "left" && x !== 0 ) {
  //     moveLeft(i,x);
  //   } else if (dir == "right" && x !== 0) {
  //     moveRight(i,x);
  //   }
  //   //don't check the upper row and don't move numbers if there are none:
  //   //updateCanvas();
  // });


// function moveUp(i, x) {
//   if (x > 0 && i>3) {
//     //Get index of upper element:
//     let ui = i-4;
//     //Get the number in the upper element:
//     let up = canvas[ui];
//     if (up === 0) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       updateNumber(ui, x);
//       moveUp(ui, x)
//     } else if (up === x) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       //The new number is x*2:
//       updateNumber(ui, x*2);
//     }
//   }
// }

// function moveDown(i, x) {
//   if (x > 0 && i < 12) {
//     //Get index of upper element:
//     let di = i+4;
//     let down = canvas[di];
//     if (down === 0) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       updateNumber(di, x);
//       moveDown(di, x)
//     } else if (down === x) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       //The new number is x*2:
//       updateNumber(di, x*2);
//     }
//   }
// }


// function moveLeft(i, x) {
//   if (x > 0 && (i%4 !== 0)) {
//     //Get index of upper element:
//     let li = i-1;
//     //Get the number in the upper element:
//     console.log(canvas)
//     let left = canvas[li];
//     console.log('left', left)
//     if (left === 0) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       updateNumber(li, x);
      
//       //Don't move left if index is left of the row:
//       if (li%4 !== 0) {
//         moveLeft(li, x)
//       }

//     } else if (left === x) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       //The new number is x*2:
//       updateNumber(li, x*2);
//     }
//   }   else {
//     console.log('HEWWO UWU ', i);
//   }
// }

// function moveRight(i, x) {
//   if ((x > 0) && (i%4 !== 3) && (i<15)) {
//     //Get index of upper element:
//     let ri = i+1;
//     //Get the number in the upper element:
//     let right = canvas[ri];
//     console.log('right', right, ' ri ', ri)
//     if (right === 0) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       updateNumber(ri, x);
//       if (ri%4 !== 3) {
//         moveRight(ri, x)
//       }
//     } else if (right === x) {
//       //Make the original number 0:
//       updateNumber(i, 0);
//       //The new number is x*2:
//       updateNumber(ri, x*2);
//     }
//   } else {
//     console.log('HEWWO UWU ', i);
//   }
// }

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