class lavaPool
{
  constructor(pos)
  {
    this.position = pos;
    this.fixedRadius = random(15,25);
    this.eaten = false;
    this.randomSeed = random(0,10000);
    this.rot = random(-1,1);
    this.rotRate = random(-PI/120,PI/120);
  }

  update()
  {
    this.display();
    if(this.eaten && int(time%(PI))==0)
    {
      this.position.x = random(bounds,width-bounds);
      this.position.y = random(bounds,height-bounds);
      this.eaten = false;
    }
  }
  
  display()
  {
    this.drawBlob();
  }

  /// F=MA function
  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

  drawBlob()
  {
    this.rot += this.rotRate;
    fill(255,140,0);
    noStroke();
    let tempTime = time + this.randomSeed;
    //Drawing main canvas, now going to be a perlin circle (cell type object)
    //Perlin noise is 2d function of time and angle
    //circle(width/2,height/2,(width-bounds)/1.2);
    push();
    translate(this.position.x,this.position.y);
    rotate(this.rot);
    beginShape();
    for(let i=0; i<TWO_PI; i+=PI/180)
    {
      let theta = i;
      if(theta>PI)
      {
        theta=TWO_PI-i;
      }
      let tempRadius = this.fixedRadius*noise(theta/2,tempTime/1);
      let pos = polarToCartesian(tempRadius,i);
      vertex(pos.x,pos.y);
    }
    endShape(CLOSE);
    pop();
    stroke(127);
  }
  
  isEaten()
  {
    this.position.x = random(bounds,width-bounds);
    this.position.y = random(bounds,height-bounds);
  }

}
