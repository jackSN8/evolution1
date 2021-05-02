class Agent
{
  constructor(ms)
  {
    //Positions of the agent
    this.position = createVector(random(100,700),random(100,400));
    this.velocity = createVector(random(-3,3),random(-3,3));
    this.acceleration = createVector(0,0);

    //Paremeters of the agent
    this.id = int(random(0,2500));
    this.mass = 1;


    this.maxSpeed = ms;
    //Normal movement speed.
    //Other speeds such as the minimum cutoff speed are
    //ratios of this maxSpeed, so it affects everything

    this.maxForce = 0.3;
    //Max speed to changes to velocity with
    //Flaw in that it allows much sharper turns at slower speeds
    //which makes sense but this can do 180 in 0 seconds when still


    this.width = 20;
    this.height = 50;
    this.theta = this.velocity.heading()-PI/2;

    this.turning = false;
    //dumb variable to store if the agent has recently been turning
    //used to add overcorrection (or under correction) to turns
  }
  update()
  {
    //this.avoidWalls(0,0,width,height);

    this.display();
    //Keep all the movement code that is below at the bottom
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  display()
  {
    if(this.velocity.mag()>this.maxSpeed/25)
    {
      this.theta = this.velocity.heading()-PI/2;
    }
    fill(255,0,0);

    //Agent visualisation code - currently draws it as triangle
    //facing the direction of movement
    push();
    translate(this.position.x,this.position.y);
    rotate(this.theta);
    beginShape();
    vertex(this.width/2,0);//right
    vertex(-this.width/2,0);//left
    vertex(0,this.height);//top
    endShape();
    //eyes
    fill(0);
    circle(this.width/5,this.height*(3/5),4);
    circle(-this.width/5,this.height*(3/5),4);
    pop();

    fill(255);
  }


  ///Function to direct agent towards a target object
  seek(target)
  {
    let tempTarget = target;
    let desired = vectorAdd(p5.Vector.mult(this.position,-1),tempTarget);
    desired.setMag(this.maxSpeed);
    this.steer(desired);
  }
  ///Once a desired velocity has been calculated, function to steer agent towards that
  steer(desired)
  {
    let steering = desired.sub(this.velocity);
    steering.setMag(this.maxForce);
    this.applyForce(steering);
  }

  //stop the agent
  stop()
  {
    if(this.velocity.mag()>this.maxSpeed/25)
    {
      let steering = p5.Vector.mult(this.velocity,-1);
      steering.setMag(this.maxForce);
      this.applyForce(steering);
    }
    else if(this.velocity.mag()>0 && this.velocity.mag()<this.maxSpeed/25)
    {
      this.velocity.setMag(0);
    }
  }

  arrive(target)
  {
    //Get target
    let tempTarget = target;
    let desired = p5.Vector.sub(tempTarget,this.position);
    //Slow down when the agent arrives
    let speed;
    if(desired.mag()<150 && desired.mag()>40)
    {
      speed = map(desired.mag(),0,100,0,this.maxSpeed);
      desired.setMag(speed);
      this.steer(desired);
    }
    else if(desired.mag()<40)
    {
      this.stop();
      // speed=0;
      // desired = tempTarget.;
      // desired.setMag(speed);
      // this.steer(desired);
    }
    else if(desired.mag()>150)
    {
      speed = this.maxSpeed;
      desired.setMag(speed);
      this.steer(desired);
    }
  }

  /// F=MA function
  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

  //Don't leave the canvas!
  avoidWalls(xBoundL,yBoundL,xBoundH,yBoundH)
  {
    ///Function to avoid box laid out by the 4 bounds
    let expectedPos = p5.Vector.add(this.position,p5.Vector.mult(this.velocity,5));
    if(expectedPos.x<xBoundL)
    {
      let desired = createVector(this.maxSpeed,this.velocity.y);
      this.steer(desired);
      this.turning = true;
    }
    if(expectedPos.x>xBoundH)
    {
      let desired = createVector(-this.maxSpeed,this.velocity.y);
      this.steer(desired);
      this.turning = true;
    }
    if(expectedPos.y<yBoundL)
    {
      let desired = createVector(this.velocity.x,this.maxSpeed);
      this.steer(desired);
      this.turning = true;
    }
    if(expectedPos.y>yBoundH)
    {
      let desired = createVector(this.velocity.y,-this.maxSpeed);
      this.steer(desired);
      this.turning = true;
    }
    if(this.turning == true)
    {
      this.turning = false;
      let desired = this.velocity.copy();
      desired.setMag(this.maxSpeed);
      this.steer(desired);
    }

  }
  //
  // //Avoid an array of other agents
  // avoidOthers(incArray)
  // {
  //   let badPeople = [...incArray];//bAD people is agents to avoid
  //   //Need to remove yourself from the list so you dont try to avoid yourself
  //   for(let i=0; i<badPeople.length; i++)
  //   {
  //     if(badPeople[i].id == this.id)
  //     {
  //       badPeople.splice(i,1);
  //     }
  //   }
  //   for(let i=0; i<badPeople.length; i++)
  //   {
  //     this.avoidPosition(badPeople[i].position)
  //   }
  // }

  ///Function to make agent avoid going to one specific spot
  avoidPosition(badSpot)
  {
    ///Find where the agent will be in a few frames (ie vision range TBA)
    let expectedPos = p5.Vector.add(this.position,p5.Vector.mult(this.velocity,5));
    //Find distance from expected position and point you want to avoid
    let expectedDistance = p5.Vector.sub(expectedPos,badSpot).mag();
    if(expectedDistance < 50)//If closer than abritary 50 pixels, then turn
    {
      //Creates vector directly behind agent to seek - this is turning around part
      let turnPoint = p5.Vector.sub(this.position,this.velocity);
      //let randomVariation = createVector(random(-20,20),random(-20,20));
      //turnPoint.add(randomVariation);
      this.seek(turnPoint);
    }
  }


}
