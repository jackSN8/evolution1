/////Agent is an autonermerus being that can seek things, have ai, eat hot chips
/////twerk
class agent
{
  constructor(tPosition,tSize,tColor)
  {
    this.size = tSize;
    this.color = tColor;
    this.position = tPosition;
    this.velocity = createVector(1,0); //Normal speed of the agent
    this.turnRate = 2; //Turnrate of the agent
    this.accuracy = 4; //Heading accuracy of the agent
  }

  update()
  {
    this.position = p5.Vector.add(this.position,this.velocity);
    this.display();
    this.seek(b);
  }
  display()
  {
    fill(this.color);
    circle(this.position.x,this.position.y,this.size);
  }

  ///Function that takes in a target position, and rotates the agent towards target
  ///To move to it
  seek(target)
  {
    this.targetDif = p5.Vector.sub(this.position,target).mult(-1);
    line(this.position.x,this.position.y,this.position.x+this.targetDif.x,this.position.y+this.targetDif.y);
    //this.headingDif = this.targetDif.heading()-this.heading;

  }
  ///Function to avoid the edges of the canvas


}
