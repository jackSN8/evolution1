class vehicle
{
  PVector position;
  PVector velocity;
  PVector acceleration;
  PVector desire;
  PVector steering;
  float maxspeed;
  float maxforce;
  float d;
  
  
  vehicle(float x, float y)
  {
    position = new PVector(x,y);
    velocity = new PVector(random(-3,3),random(-3,3));
    acceleration = new PVector(0,0);
    maxspeed = random(5,9);
    maxforce = random(0.07,0.17);
    d = 15;
    
  }
  
  
  void display()
  {
    fill(50,50,100);
    float direction = velocity.heading() + PI/2;
    pushMatrix();
    translate(position.x,position.y);
    rotate(direction);
    beginShape();
    vertex(0, -d*2);
    vertex(-d, d*2);
    vertex(d, d*2);
    endShape(CLOSE);
    popMatrix();
  }
  
  void update()
  {
    position.add(velocity);
    velocity.add(acceleration);    
    //brain(); //function that steers the agent
    acceleration.mult(0);//BRUH REMEMBER DIS
    
  }
  
  void follow(path p)
  {
    //predicts location of the vehicle
    PVector predict = velocity.copy();//vector to store the predicted position of vehicle 
    predict.setMag(50);//how far the vehicle can predict itself to be in the future - 50 pixels here
    PVector predictpos = PVector.add(position, predict);
    //gets the line dimensions
    PVector a = p.start;
    PVector b = p.end;
    //gets the normal(perpindicular) point to the line
    PVector normalpoint = getnormalpoint(predictpos,a,b);
    //finds target point which is ahead of normal along path
    PVector dir = PVector.sub(b,a);//vector from a to b - direction of path
    dir.normalize();
    dir.mult(15);//whatever length you want it to be ahead along the path
    PVector target = PVector.add(normalpoint,dir);//vector from 0,0 to that target point
    //Finds distance from vehicle to path
    float distance = PVector.dist(predictpos,normalpoint);//gets distance between predicted positon of vehicle and closest point on path
    if (distance > p.radius)//if distance is above path radius - Seek DA path
    {
      seek(target);
    }    
  }
  
  PVector getnormalpoint(PVector p, PVector a, PVector b)
  {
    PVector ap = PVector.sub(p,a);//vector from a to p
    PVector ab = PVector.sub(b,a);//vector from a to b
    ab.normalize();//normalizes line 
    float c = ap.dot(ab);//projects vector AP onto a normalized AB with dot product - how many ABs it takes to make a project AP
    ab.mult(c);//multiplies line by that dot product so we have a line length of AP projected
    PVector normalPoint = PVector.add(a, ab);//adds that to the original start of line so the Vector originates at 0,0
    return normalPoint;
    
  }

  //method that applies steering force towards target
  void seek(PVector target)
  {
    PVector desired = PVector.sub(target,position);//vector that points from current position to target position
    if (desired.mag() == 0) return;//if desired vector is 0 length then dont do rest of code
    //scale desired to max speed   
    desired.normalize();//normalize desired
    desired.mult(maxspeed);
    //steering = desired minus velocity
    PVector steer = PVector.sub(desired,velocity);//genius equation - counteracts velocity/vector pointing from velocity to desired
    steer.limit(maxforce);//limits to make it obey laws of physics
    applyforce(steer);
  }
      
  void applyforce(PVector force)
  {
    acceleration.add(force);
  }
  
  
}
