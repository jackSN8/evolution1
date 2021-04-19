let a;
let b;

function setup()
{
  console.log("New run");
  createCanvas(800,500);
  a = new agent(createVector(400,250),50,color(100,150,255));
  b = createVector(random(100,700),100);
  angleMode(RADIANS);
}

function draw()
{
  background(27);
  textSize(8);
  a.update();
  circle(b.x,b.y,50);
}
