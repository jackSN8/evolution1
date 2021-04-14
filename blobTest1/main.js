let a;
let b;

function setup()
{
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


function polarToCartesian(mag,heading)
{
  let x = cos(heading)*mag;
  let y = sin(heading)*mag;
  return createVector(x,y);
}

function cartesianToPolar(input)
{
  let heading = atan(input.y/input.x);
  let mag = sqrt(input.x*input.y);
  return createVector(mag,heading);
}


function vectorHeading(input)
{
  let heading = atan(input.y/input.x);
  //If vector is in quadrant I heading is just arctan y
  //If vector is in quadrant II or III, heading is arctan y + PI
  if(input.x<0)
  {
    heading += PI;
  }
  //If vector is in quadrant IV, heading is 2PI + arctan y
  if(input.x>=0 && input.y<0)
  {
    heading += TWO_PI;
  }

  return heading;
}

///Function to rotate vector to specified heading
function changeHeading(inputVector,targetHeading)
{
  let mag = sqrt(inputVector.x^2+inputVector.y^2);
  //quadrant I
  let output;
  if(targetHeading <= (PI/2))
  {
    output = createVector(cos(targetHeading)*mag,sin(targetHeading)*mag);
  }
  //quadrant II
  else if(targetHeading > (PI/2) && targetHeading < PI)
  {
    output = createVector(cos(targetHeading*mag,-1*sin(targetHeading)*mag));
  }
  //quadrant III
  else if (targetHeading > PI && targetHeading < (4*PI/3))
  {
    output = createVector(-1*cos(targetHeading*mag,-1*sin(targetHeading)*mag));
  }
  //quadrant IV
  else if (targetHeading >(4*PI/3) && targetHeading < (2*PI))
  {
    output = createVector(-1*cos(targetHeading*mag),sin(targetHeading)*mag);
  }
  return output;
}
