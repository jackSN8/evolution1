let a;
let b;

function setup()
{
  createCanvas(800,500);
  a = new agent(createVector(400,250),50,color(100,150,255));
  b = createVector(500,100);
  angleMode(DEGREES);
}

function draw()
{
  background(27);
  a.update();
  circle(b.x,b.y,50);
}
