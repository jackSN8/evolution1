class entity
{
  constructor(pos,vel,mass)
  {
    this.position = pos;
    this.velocity = vel;
    this.acceleration = createVector(0,0);


    this.mass = mass;
  }

  update()
  {
    this.display();
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }
  
  display()
  {

  }

  /// F=MA function
  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

}
