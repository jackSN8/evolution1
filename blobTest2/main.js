

let totalAgents = 30;
let agents = [];
let targ1;

let totalFood = 50;
let foods = [];
let otherEntities = [];
let totalOtherStuff = 10;
let time = 0;
let illumination;
let bounds = 70;
let aliveCreatures = totalAgents;
let timeDilation = 1;//Factor to speed up everything by, all functions of time are modified by this

//creating a grid to store temperatures around the Map
let tempGrid = [];

function setup()
{
  frameRate(60);
  createCanvas(800,800);
  angleMode(RADIANS);
  targ1 = createVector(200,200);
  for(let i=0; i<totalAgents; i++)
  {
    agents.push(new Agent(5,1.0,0.05,formGenericDna()));
  }
  for(let i=0; i<totalFood; i++)
  {
    let r= int(random(0,10));
    if(r<7)
    {
      foods.push(new food(createVector(random(bounds,width-bounds),random(bounds,height-bounds))));
    }
    else if(r<10&&r>6)
    {
      foods.push(new largeFood(createVector(random(bounds,width-bounds),random(bounds,height-bounds))));
    }  
    // else
    // {
    //   foods.push(new lavaPool(createVector(random(bounds,width-bounds),random(bounds,height-bounds))));
    // }  
  }
  for(let i=0; i<totalOtherStuff; i++)
  {
    otherEntities.push(new lavaPool(createVector(random(bounds,width-bounds),random(bounds,height-bounds))));
  }
  //agents[10].color = (0,255,0);
  agents[1].color = color(0,255,255);
  for(let i=0; i<width; i+=10)
  {
    tempGrid[i]=[]
    tempGrid[i].push(new Array(height));
    for(let j=0; j<height; j+=10)
    {
      tempGrid[i][j] = noise(i/10,j/10);
    }
  }
}

function draw()
{
  targ1 = createVector(mouseX,mouseY);
  background(27);
  circle(targ1.x,targ1.y,30);
  time +=(PI/720)*timeDilation;//Time for a single day-night-day cycle is 1440 frames or 24 seconds
  illumination = cos(time)+1;
  for(let i=0; i<width; i+=10)
  {
    for(let j=0; j<height; j+=10)
    {
      noStroke();
      fill(0,0,255,tempGrid[i][j]*255*illumination);
      rect(i,j,10,10);
    }
  }
  for(let i=0; i<agents.length; i++)
  {
    agents[i].update();
    agents[i].avoidWalls(bounds,width-bounds,bounds,height-bounds);
    agents[i].avoidOthers(agents,10);
    //agents[i].searchFor(agents);
    agents[i].searchFor(foods);
    agents[i].eatAgents(agents);
    agents[i].eatPlants();
    agents[i].eatOthers(agents);
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
  for(let i=0; i<totalOtherStuff; i++)
  {
    otherEntities[i].display();
  }
  for(let i=0; i<otherEntities.length; i++)
  {
    otherEntities[i].update();
    if(otherEntities[i].dead)
    {
      otherEntities.splice(i,1);
    }
  }
  //drawBlob();
  

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

function drawBlob()
{
  fill(20*illumination,20*illumination,95*illumination,60);
  noStroke();
  beginShape();
  vertex(width/2,30);
  vertex(width/2,80);
  endShape();
  //Drawing main canvas, now going to be a perlin circle (cell type object)
  //Perlin noise is 2d function of time and angle
  //circle(width/2,height/2,(width-bounds)/1.2);
  const fixedRadius = (width-bounds)/1.2;
  push();
  translate(width/2,height/2);
  beginShape();
  for(let i=0; i<TWO_PI; i+=PI/180)
  {
    let theta = i;
    if(theta>PI)
    {
      theta=TWO_PI-i;
    }

    let tempRadius = fixedRadius*noise(theta/2,time/8);
    let pos = polarToCartesian(tempRadius,i);
    vertex(pos.x,pos.y);
  }

  endShape(CLOSE);
  pop();

  stroke(127);
}

function polarToCartesian(radius,theta)
{
  let xPos = radius*cos(theta);
  let yPos = radius*sin(theta);
  return createVector(xPos,yPos);
}



//Forms an initial DNA for the unevolved agents. DNA is designed to tolerate having new info so there
// may be new evolved charactiristics, not in this function
function formGenericDna()
{
  let dna = [];
  let color = [random(0,255),random(0,255),random(0,255)];
  dna.push(['maxS',random(0.6,1.4),0.7,1.4,0.3]);
  dna.push(['maxF',random(0.05,0.09),0.03,0.07,0.03]);
  dna.push(['size',random(3,7),3,7,3]);
  dna.push(['mass',random(0.7,1.3),0.7,1.3,0.1]);
  dna.push(['searchConeAngle',random(PI/8,PI/3),PI/8,PI/3,PI/16]);
  dna.push(['searchConeRadius',random(40,150),40,150,10]);
  dna.push(['color',color]);///Color must be last due to mutate function excluding it
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

function deepClone(obj, format) {
  var refs = arguments.length <= 2 || arguments[2] === undefined ? new Map() : arguments[2];

  var cloned = refs.get(obj);
  if (cloned) return cloned;
  if (Array.isArray(obj)) {
    var _clone = [];
    refs.set(obj, _clone);
    for (var i = 0; i < obj.length; i++) {
      _clone[i] = deepClone(obj[i], format, refs);
    }
    return _clone;
  }
  if (obj instanceof Date) return new Date(obj.valueOf());
  if (!(obj instanceof Object)) return obj;
  var clone = {};
  refs.set(obj, clone);
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = format ? format(keys[i]) : keys[i];
    clone[key] = deepClone(obj[keys[i]], format, refs);
  }
  return clone;
}