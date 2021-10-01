class lavaPool
{
  constructor(pos)
  {
    this.position = pos;
  }

  update()
  {
    this.display();
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
