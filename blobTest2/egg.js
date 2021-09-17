class egg
{
  constructor(pos,dna.parse())
  {
    this.dna = dna;
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
    this.mutate();
    agents.push(new Agent(5,1.0,0.05,this.dna));
    totalAgents++;
    agents[totalAgents-1].position.set(this.position);
    this.dead = true;
    //Create random number of particles to exist as sort of shards of egg breaking
    for(let i=0; i<this.shards; i++)
    {
      otherEntities.push(new particle(createVector(this.position.x,this.position.y)));
    }

  }

  mutate()
  {//Loop through dna, not to full length though due to color gene not mutating
    for(let i=0; i<this.dna.length-1; i++)
    {
      if(int(random(0,10))==1)
      {
        if(this.dna[i][1]>this.dna[i][2] && this.dna[i][1]<this.dna[i][3])
        {
          if(int(random(0,2)==1))
          {
            this.dna[i][1] += this.dna[i][4];
          }
          else
          {
            this.dna[i][1] -= this.dna[i][4];
          }
        }
      }
    }
  }


}
