import R from "ramda"

let totalAgents = 20;
let agents = [];
let targ1;

let totalFood = 15;
let foods = [];
let otherEntities = [];
let time = 0;
let illumination;
let bounds = 70;
let aliveCreatures = totalAgents;
let timeDilation = 1;//Factor to speed up everything by, all functions of time are modified by this



function setup()
{
  frameRate(60);
  createCanvas(500,400);
  angleMode(RADIANS);
  targ1 = createVector(200,200);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(5,1.0,0.05,formGenericDna()));
  }
  for(let i=0; i<totalFood; i++)
  {
    foods.push(new food(createVector(random(bounds,width-bounds),random(bounds,height-bounds))));
  }
  //agents[10].color = (0,255,0);
  agents[1].color = color(0,255,255);
}

function draw()
{
  targ1 = createVector(mouseX,mouseY);
  background(27);
  circle(targ1.x,targ1.y,30);
  time +=(PI/720)*timeDilation;//Time for a single day-night-day cycle is 1440 frames or 24 seconds
  illumination = cos(time)+1;

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
  fill(20*illumination,20*illumination,95*illumination,60);
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

//Forms an initial DNA for the unevolved agents. DNA is designed to tolerate having new info so there
// may be new evolved charactiristics, not in this function
function formGenericDna()
{
  let dna = [];
  dna.push(['maxS',random(0.6,1.4),0.7,1.4,0.3]);
  dna.push(['maxF',random(0.03,0.07),0.03,0.07,0.03]);
  dna.push(['size',random(3,7),3,7,3]);
  dna.push(['mass',random(0.7,1.3),0.7,1.3,0.1]);
  dna.push(['searchConeAngle',random(PI/8,PI/3),PI/8,PI/3,PI/16]);
  dna.push(['searchConeRadius',random(40,150),40,150,10]);
  dna.push(['color',color(random(0,255),random(0,255),random(0,255))]);
  return dna;
}

//Finds a value against a key in a 2d array
function findDictPos(key,array,num)
{
  let found = false;
  for(let i=0; i<array.length; i++)
  {
    if(!found && array[i][0]==key)
    {
      found = true;
      return array[i][num];
    }
  }
  console.log("error");
  return("No Value in Array corresponds to key.");
}
