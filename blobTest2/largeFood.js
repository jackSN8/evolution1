class largeFood extends food
{
  constructor(pos)
  {
    super(pos);
    this.rot = random(-1,1);
    this.rotRate = random(-PI/120,PI/120);
  }
  display()
  {
    this.rot += this.rotRate;
    fill(255,40,0);
    push();
    translate(this.position.x,this.position.y);
    rotate(this.rot);
    beginShape();
    vertex(-10,-10);
    vertex(10,-10);
    vertex(0,10);
    endShape();
    pop();
    fill(255);
    if(this.eaten && int(time%(PI))==0)
    {
      this.position.x = random(bounds,width-bounds);
      this.position.y = random(bounds,height-bounds);
      this.eaten = false;
    }
  }


  
}