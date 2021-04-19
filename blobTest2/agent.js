class agent
{
  constructor(position,velocity)
  {
    this.position = position;
    this.velocity = velocity;
  }
  update()
  {
    this.position.add(this.velocity);

  }


  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

}