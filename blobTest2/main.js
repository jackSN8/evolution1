

let totalAgents = 40;
let agents = [];
let targ1;

let totalFood = 30;
let foods = [];
let otherEntities = [];
let time = 0;
let illumination;
let bounds = 150;
let aliveCreatures = totalAgents;

function setup()
{
  frameRate(60);
  createCanvas(1000,800);
  angleMode(RADIANS);
  targ1 = createVector(200,200);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(5,1.0,0.05));
  }
  for(let i=0; i<totalFood; i++)
  {
    foods.push(new food(createVector(random(bounds,width-bounds),random(bounds,height-bounds))));
  }
  //agents[10].color = (0,255,0);
}

function draw()
{
  targ1 = createVector(mouseX,mouseY);
  background(27);
  circle(targ1.x,targ1.y,30);
  time +=(PI/720);//Time for a single day-night-day cycle is 1440 frames or 24 seconds
  illumination = cos(time)+1;
  agents[1].color = color(0,255,255);
  for(let i=0; i<agents.length; i++)
  {
    agents[i].update();
    agents[i].avoidWalls(bounds,width-bounds,bounds,height-bounds);
    agents[i].avoidOthers(agents,10);
    //agents[i].searchFor(agents);
    agents[i].searchFor(foods);
    agents[i].eat();
    // agents[i].seek(createVector(mouseX,mouseY));
    if(!agents[i].hasTarget && !agents[i].turning)
    {
        //agents[i].wander();
    }
    if(agents[i].dead)
    {
      agents.splice(i,1);
      totalAgents--;
    }
  }
  for(let i=0; i<totalFood; i++)
  {
    foods[i].display();
  }
  for(let i=0; i<otherEntities.length; i++)
  {
    otherEntities[i].update();
    if(otherEntities[i].dead)
    {
      otherEntities.splice(i,1);
    }
  }
  fill(20*illumination,20*illumination,95*illumination,127);
  noStroke();
  rect(bounds,bounds,width-bounds*2,height-bounds*2);
  stroke(127);

  ////Write to screen how many alive creatures there are
  //Count alive agents
  aliveCreatures = 0;
  for(let i=0; i<totalAgents; i++)
  {
    if(!agents[i].dead)
    {
      aliveCreatures ++;
    }
  }
  text(aliveCreatures,width-70,20);
  text(time%PI,width-70,50);
  ///Draw graph against time showing how many creatures are alive




}
