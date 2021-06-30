

let totalAgents = 40;
let agents = [];
let targ1;

let totalFood = 50;
let foods = [];

function setup()
{
  createCanvas(800,500);
  angleMode(RADIANS);
  targ1 = createVector(200,200);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(5,0.5,0.05));
  }
  for(let i=0; i<totalFood; i++)
  {
    foods.push(new food(createVector(random(100,width-100),random(100,height-100))));
  }
  //agents[10].color = (0,255,0);
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
    agents[i].searchFor(agents);
    agents[i].searchFor(foods);
    // agents[i].seek(createVector(mouseX,mouseY));
    if(!agents[i].hasTarget)
    {
        agents[i].wander();
    }
  }

  for(let i=0; i<totalFood; i++)
  {
    foods[i].display();
  }
  fill(190,190,190,127);
  stroke(127);
  rect(100,100,width-200,height-200);

}
