let totalAgents = 5;
let agents = [];

function setup()
{
  createCanvas(800,500);
  angleMode(RADIANS);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(3));
  }
}

function draw()
{
  background(27);
  for(let i=0; i<totalAgents; i++)
  {
    agents[i].update();
    agents[i].avoidOthers(agents);
  }
}
