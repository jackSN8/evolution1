let age;
let b;

function setup()
{
  createCanvas(800,500);
  angleMode(RADIANS);
  b = createVector(400,200);
  age= new Agent(createVector(300,200),createVector(random(-1,1),random(-1,1)),2);
}

function draw()
{
  background(27);
  circle(b.x,b.y,50);
  age.update();
}
