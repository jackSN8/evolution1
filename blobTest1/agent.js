/////Agent is an autonermerus being that can seek things, have ai, eat hot chips
/////twerk
class agent
{
  constructor(tPosition,tSize,tColor)
  {
    this.size = tSize;
    this.color = tColor;
    this.position = tPosition;
    this.velocity = createVector(0,-1); //Normal speed of the agent
    this.turnRate = PI/90; //Turnrate of the agent
    this.accuracy = PI/45; //Heading accuracy of the agent
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
    // this.targetDif = this.targetDif.normalize(0);
    // this.targetDif = p5.Vector.mult(this.targetDif,this.velocity.mag());
    // this.velocityDif = this.targetDif.sub(this.velocity);
    // console.log(this.velocity.x);
    // console.log(this.velocity.y);
    this.velHeading = vectorHeading(this.velocity);


    this.headingToTarget = vectorHeading(this.targetDif);
    text(this.velHeading,700,400);
    text(this.headingToTarget,700,350);
    this.headingDif = this.headingToTarget - this.velHeading;
    if(this.headingDif < -PI)
    {
      this.headingDif = TWO_PI+this.headingDif;
    }
    text(this.headingDif,700,300);
    if(this.headingDif > this.accuracy)
    {     
      let d = changeHeading(this.velocity,(this.velHeading));
      //console.log(d);
      
    }


  }
  ///Function to avoid the edges of the canvas


}
