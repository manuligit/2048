var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//create a test canvas:
ctx.beginPath();
ctx.rect(20, 20, 100, 100);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(140, 20, 100, 100);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(260, 20, 100, 100);
ctx.fillStyle = "#FFF";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(380, 20, 100, 100);
ctx.fillStyle = "#FFF";
ctx.fill();
ctx.closePath();