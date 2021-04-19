let a;
let b;

function setup()
{
  createCanvas(800,500);
  angleMode(RADIANS);
  b = createVector(400,200);
}

function draw()
{
  background(27);
  circle(b.x,b.y,100);
}
