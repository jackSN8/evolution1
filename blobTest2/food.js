class food
{
  constructor(pos)
  {
    this.position = pos.copy();
  }

  display()
  {
    fill(0,255,0)
    circle(this.position.x,this.position.y,5);
    fill(255);
  }

  eaten()
  {
    this.position.x = random(bounds,width-bounds);
    this.position.y = random(bounds,height-bounds);

  }
}
