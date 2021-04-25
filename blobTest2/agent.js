class Agent
{
  constructor(position,velocity,ms)
  {
    //Positions of the agent
    this.position = createVector(random(width),random(height));
    this.velocity = velocity;
    this.acceleration = createVector(0,0);

    //Paremeters of the agent
    this.mass = 1;
    this.maxSpeed = ms;
    //Normal movement speed.
    //Could be improved upon by making the actual speed some fraction of this
    this.maxForce = 0.5;
    //Max speed to changes to velocity with
    //Flaw in that it allows much sharper turns at slower speeds
    //which makes sense but this can do 180 in 0 seconds when still
    this.width = 20;
    this.height = 50;
  }
  update()
  {

    this.display();
    //Keep all the movement code that is below at the bottom
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  display()
  {
    let theta = this.velocity.heading()-PI/2;
    fill(255,0,0);

    //Agent visualisation code - currently draws it as triangle
    //facing the direction of movement
    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.width/2,0);
    vertex(-this.width/2,0);
    vertex(0,this.height);
    endShape();
    pop();

    fill(255);
  }


  ///Function to direct agent towards a target object
  seek(target)
  {
    let tempTarget = target;
    let desired = vectorAdd(p5.Vector.mult(this.position,-1),tempTarget);
    desired.setMag(this.maxSpeed);
    let steering = desired.sub(this.velocity);
    steering.setMag(this.maxForce);
    this.applyForce(steering);
  }


  /// F=MA function
  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

  //Don't leave the canvas!
  // avoidWalls(xBoundL,yBoundL,xBoundH,yBoundH)
  // {
  //   //Takes in a box with x and y bounds ,
  //   //and if approaching edge, then creates target vector behind
  //   //triangle and goes in that direction/
  //   ///Find where the agent will be in a few frames (ie vision range TBA)
  //   let expectedPos = p5.Vector.add(this.position,this.velocity);
  //   expectedPos.mult(5);//5 frames ahead
  //   console.log(expectedPos.y);
  //   //Currently takes the current velocity vector, to be added
  //   //intelligent ability to predict where it is turning towards
  //   if(expectedPos.x < xBoundL || expectedPos.x > xBoundH)
  //   {
  //     this.seek(p5.Vector.mult(expectedPos,-1));
  //   }
  //   if(expectedPos.y < yBoundL || expectedPos.y > yBoundH)
  //   {
  //     this.seek(p5.Vector.mult(expectedPos,-1));
  //   }
  // }

  ///Function to make agent avoid going to one specific spot
  avoidPosition(badSpot)
  {
    ///Find where the agent will be in a few frames (ie vision range TBA)
    let expectedPos = p5.Vector.add(this.position,this.velocity);
    expectedPos.mult(5);//5 frames vision
    let expectedDistance = p5.Vector.sub(expectedPos,badSpot).mag();
    //Find distance from expected position and point you want to avoid
    if(expectedDistance < 20)//If closer than abritary 20 pixels, then turn
    {
      
    }

  }


}
