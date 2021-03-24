let length = 5;


function setup()
{
  createCanvas(800,500);
}

function draw()
{
  let text_eg = '';
  background(27);
  noFill();
  stroke(0);
  textSize(32);
  //text("Raptor looks healthy",150,250);
  for(let i=0; i<length; i++)
  {
    text_eg += makeID(int(random()*62));
  }
  text(text_eg,150,250);
}


function makeID(inpNum)
{
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let output = characters.charAt(inpNum);
  return output;
}
