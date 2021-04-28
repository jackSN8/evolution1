let totalAgents = 1;
let agents = [];
let targ1;

function setup()
{
  createCanvas(800,500);
  angleMode(RADIANS);
  targ1 = createVector(200,200);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(10));
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
    agents[i].arrive(targ1);
    //agents[i].avoidOthers(agents);
  }
}
