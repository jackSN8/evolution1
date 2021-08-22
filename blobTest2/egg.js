class egg
{
  constructor(pos)
  {
    this.position = pos;
    this.age = 0;
    this.color = color(255,0,0);
    this.dead = false
    this.shards = int(random(3,15));
  }

  update()
  {
    this.display();
    this.age+=(PI/720)*timeDilation;
    //Once old enough - 1 full day in this case, creature hatches
    if(this.age>=PI && !this.dead)
    {
      this.hatch();
    }
  }
  display()
  {
    fill(this.color);
    circle(this.position.x,this.position.y,8);
  }

  hatch()
  {
    agents.push(new Agent(5,1.0,0.05));
    totalAgents++;
    agents[totalAgents-1].position.set(this.position);
    this.dead = true;
    //Create random number of particles to exist as sort of shards of egg breaking
    for(let i=0; i<this.shards; i++)
    {
      otherEntities.push(new particle(createVector(this.position.x,this.position.y)));
    }

  }


}
