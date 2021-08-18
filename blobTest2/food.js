class food
{
  constructor(pos)
  {
    this.position = pos.copy();
    this.eaten = false;
  }

  display()
  {
    fill(0,255,0)
    circle(this.position.x,this.position.y,5);
    fill(255);
    if(this.eaten && int(time%(PI))==0)
    {
      this.position.x = random(bounds,width-bounds);
      this.position.y = random(bounds,height-bounds);
      this.eaten = false;
    }
  }
  isEaten()
  {
    this.position.x = 10000;
    this.eaten = true;
  }

}
