

let totalAgents = 40;
let agents = [];
let targ1;

function setup()
{
  createCanvas(800,500);
  angleMode(RADIANS);
  targ1 = createVector(200,200);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(5,0.5,0.1));
  }
}

function draw()
{
  targ1 = createVector(mouseX,mouseY);
  background(27);
  circle(targ1.x,targ1.y,30);
  for(let i=0; i<totalAgents; i++)
  {
    agents[i].update();
    agents[i].avoidWalls(100,100,700,400);
    agents[i].avoidOthers(agents,10);
  }
  fill(190,190,190,127);
  stroke(127);
  rect(100,100,width-200,height-200);

}
