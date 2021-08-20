class particle
{
  constructor(pos)
  {
    this.position = pos;
    this.velocity = createVector(random(-1,1),random(-1,1));
    this.color = color(255,255,255,127);

    this.age=0;
    this.lifespan = PI/16;
    this.dead = false;
  }

  update()
  {
    //As particle gets older, fade it from existance
    this.age+=(PI/720);
    this.color = color(255,255,255,map(this.age,0,this.lifespan,127,0));
    //Kill it once it fades to nothing, then remove from screen
    if(this.age>=this.lifespan)
    {
      this.dead = true;
    }

    this.display();
    this.position.add(this.velocity);

  }

  display()
  {
    noStroke();
    fill(this.color);
    circle(this.position.x,this.position.y,6);
    stroke(1);
  }


}
