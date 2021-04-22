class agent
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





    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  seek(target)
  {
    let desired = this.target.sub(this.position);
    desired.mult(this.maxSpeed/desired.mag);
    let steering = desired.sub(this.velocity);
  }



  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

}