// logic
// every time user clicks a button, all the items on board
// move to that direction

// each piece that lands on equal piece, combine based on 
// the direction of the button pressed

// every time a button is pressed, a new item spawns into a 
// random free space on the map

// game ends when a piece containing 2048 is reached

let canvas = createCanvas()

//Initializing game:
function createCanvas()  {
  //array indexes are: 
  // [0,1,2,3
  //  4,5,6,7
  //  8,9,10,11
  //  12,13,14,15]
  let canvas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  //var row = [0,0,0,0];
  //create 4x4 canvas: 
  //var canvas = [row, row, row, row];
  //get two random tiles with twos for the start: 
  let first = getRandomInt(0,15);
  canvas[first] = 2;
  let second = getRandomInt(0,15);

  while (first === second) {
    second = getRandomInt(0,15);
  }
  canvas[second] = 2;

  canvas.forEach((x,i) => {
    document.querySelector('.box:nth-child('+(i+1)+')').innerText=x
  });

  console.log('canvas: ' + canvas);
  return canvas;

  document.querySelector['a:nth-child(2)']
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Add new item to canvas;
function updateNumber(index, number) {
  //console.log(index, number)
  updateCanvas(index, number);
  let i2 = index+1;
  //canvas[index] = number;
  document.querySelector('.box:nth-child('+i2+')').innerText=number
}

//Check if the numbers are equal:
function checkEqual(fst, snd) {
  if (fst === snd) {
    return true;
  } else {
    return false;
  }
}

function updateCanvas(index, number) {
  canvas[index] = number;
}


//Add new random number to list:
function addNew() {
  //Choose between 2 or 4 randomly:
  let nrs = [2,4]
  let number = nrs[getRandomInt(0,1)];
  //Get free numbers from canvas:
  let frees = getFrees();
  if (frees.length === 0) {
    return null;
  }
  //Get index of a free number:
  console.log(frees);
  let rnd = getRandomInt(0,frees.length);
  let newIdx = frees[rnd];
  console.log(newIdx)
  updateNumber(newIdx, number);
}

function getFrees() {
  let frees = []
  canvas.forEach(function (x,i) {
    if (x === 0) {
      frees.push(i);
    } 
  });
  return frees;
}

//Update the html elements after each move:
function updateCanvas2() {
  document.querySelectorAll('.box').forEach(function(element, i) {
    console.log(element);
    element.innerText = canvas[i];
  });
}

function moveCanvas(dir) {

  if (dir === "up") {
    canvas.forEach(function (x, i) { 
      moveUp(i, x);
    });
  } else if (dir === "down") {
    canvas.forEach(function (x, i) { 
      moveDown(i,x);
    });
  } else if (dir === "left") { 
    canvas.forEach(function (x, i) {
      moveLeft(i,x);
    });
  } else if (dir == "right") {
    canvas.forEach(function (x, i) {
      moveRight(i,x);
    });
  }
  addNew();
  // canvas.forEach(function (x, i) {
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
}

function moveUp(i, x) {
  if (x > 0 && i>3) {
    //Get index of upper element:
    let ui = i-4;
    //Get the number in the upper element:
    let up = canvas[ui];
    if (up === 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(ui, x);
      moveUp(ui, x)
    } else if (up === x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(ui, x*2);
    }
  }
}

function moveDown(i, x) {
  if (x > 0 && i < 12) {
    //Get index of upper element:
    let di = i+4;
    let down = canvas[di];
    if (down === 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(di, x);
      moveDown(di, x)
    } else if (down === x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(di, x*2);
    }
  }
}


function moveLeft(i, x) {
  if (x > 0 && (i%4 !== 0)) {
    //Get index of upper element:
    let li = i-1;
    //Get the number in the upper element:
    console.log(canvas)
    let left = canvas[li];
    console.log('left', left)
    if (left === 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(li, x);
      
      //Don't move left if index is left of the row:
      if (li%4 !== 0) {
        moveLeft(li, x)
      }

    } else if (left === x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(li, x*2);
    }
  }   else {
    console.log('HEWWO UWU ', i);
  }
}

function moveRight(i, x) {
  if ((x > 0) && (i%4 !== 3) && (i<15)) {
    //Get index of upper element:
    let ri = i+1;
    //Get the number in the upper element:
    let right = canvas[ri];
    console.log('right', right, ' ri ', ri)
    if (right === 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(ri, x);
      if (ri%4 !== 3) {
        moveRight(ri, x)
      }
    } else if (right === x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(ri, x*2);
    }
  } else {
    console.log('HEWWO UWU ', i);
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