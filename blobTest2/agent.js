class Agent
{
  constructor(position,velocity,ms)
  {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = createVector(0,0);
    this.mass = 1;
    this.maxSpeed = 5;
  }
  update()
  {
    this.display();
    this.seek(b);
    //Keep all the movement code that is below at the bottom
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  display()
  {
    fill(255,0,0);
    circle(this.position.x,this.position.y,35);
    fill(255);
  }


  ///Function to direct agent towards a target object
  seek(target)
  {
    let tempTarget = target;
    let desired = vectorAdd(this.position,tempT);
    console.log(b.x);
    //desired.mult(this.maxSpeed/desired.mag());
    //let steering = desired.sub(this.velocity);
  }


  /// F=MA function
  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

}