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


//Update the html elements after each move:
// function updateCanvas() {
//   document.querySelectorAll('.box').forEach(function(element, i) {
//     console.log(element);
//     element.innerText = canvas[i];
//   });
// }


function moveCanvas(dir) {
  canvas.forEach(function (x, i) {
    if (dir === "up" && x !== 0) {
      moveUp(i, x);
    } else if (dir === "down" && x !== 0) {
      //moveDown(i,x);
    } else if (dir === "left" && x !== 0 ) {
      moveLeft(i,x);
    } else if (dir == "right" && x !== 0) {
      //moveRight(i,x);
    }
    //don't check the upper row and don't move numbers if there are none:
    //updateCanvas();
  });
}

function moveUp(i, x) {
  if (canvas[i] > 0 || i>3) {
    //Get index of upper element:
    let ui = i-4;
    //Get the number in the upper element:
    let up = canvas[ui];
    if (up == 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(ui, x);
      moveUp(ui, x)
    } else if (up == x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(ui, x*2);
    }
  }
}

function moveLeft(i, x) {
  if (canvas[i] > 0 || i%4 != 0) {
    //Get index of upper element:
    let li = i-1;
    //Get the number in the upper element:
    let left = canvas[li];
    console.log('left', left)
    if (left == 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(li, x);
      moveLeft(li, x)
    } else if (left == x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(li, x*2);
    }
  }
}

function moveRight(i, x) {
  if (canvas[i] > 0 || i%4 != 0) {
    //Get index of upper element:
    let li = i-1;
    //Get the number in the upper element:
    let left = canvas[li];
    console.log('left', left)
    if (left == 0) {
      //Make the original number 0:
      updateNumber(i, 0);
      updateNumber(li, x);
      moveLeft(li, x)
    } else if (left == x) {
      //Make the original number 0:
      updateNumber(i, 0);
      //The new number is x*2:
      updateNumber(li, x*2);
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
       console.log('left')
       moveCanvas("left");
    }
    else if (e.keyCode == '39') {
       // right arrow
       //console.log('right')
       moveCanvas("right");
    }

}