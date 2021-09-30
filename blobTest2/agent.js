// var _ = require('lodash');


class Agent
{
  constructor(size,maxs,maxf,dna)
  {
    //Positions of the agent for physics engine, should not be directly affeceted ever really
    this.position = createVector(random(bounds,width-bounds),random(bounds,height-bounds));
    this.velocity = createVector(random(-0.5,0.5),random(-0.5,0.5));
    this.acceleration = createVector(0,0);

    ////Agent DNA


    this.dna = dna;
    /////DNA structure
    //the value stored in the DNA is pared with the variable name that
    //said value needs to be in in an array in the DNA array
    //Ie this.DNA is a 2d array, each 1d array stored inside stores some value(s) for a certain
    //paremeter like size, color etc, + the name of that paremeter

    this.maxSpeed = findDictPos('maxS',dna,1)*timeDilation;//Normal movement speed.
    //Other speeds such as the minimum cutoff speed are
    //ratios of this maxSpeed, so it affects everything

    this.maxForce = findDictPos('maxF',dna,1)*timeDilation;//Max speed to changes to velocity with
    //Flaw in that it allows much sharper turns at slower speeds
    //which makes sense but this can do 180 in 0 seconds when still

    this.id = int(random(0,2500));
    this.mass = findDictPos('mass',dna,1);  
    this.width = findDictPos('size',dna,1);
    this.height = findDictPos('size',dna,1)*2.5;
    this.maxFood = findDictPos('size',dna,1);
    this.color = findDictPos('color',dna,1);
    //Stores info about search cone
    this.searchConeAngle = findDictPos('searchConeAngle',dna,1)*findDictPos('size',dna,1)*0.2;
    this.searchConeRadius = findDictPos('searchConeRadius',dna,1)*findDictPos('size',dna,1)*0.2;
    

    this.energyConsumption = 1/1440;//Amount of energy confsumed per frame
    this.calculateEnergyConsumption();
    // console.log(this.color);
    /////Other variables non gene specific
    this.fullness = 0.5;//How much food the agent has eaten
    //For now 0 is nothing, 1 is survival rations, and 2 is reproduction rations
    this.dead = false;
    this.theta = this.velocity.heading()-PI/2;//heading, not sure why -PI/2 rad since
    //I seem to have to re-add it elsewhere
    this.hasTarget = false;
    this.turning = false;
    //dumb variable to store if the agent has recently been turning
    //used to add overcorrection (or under correction) to turns
    this.t = random(0,1000);


    // ////Depricated variables
    // this.wanderThetaX = 0;//Stores where on the imaginary circle the agent is heading to
    // this.wanderThetaY = 0;
    // this.wanderMaxRad = PI/32;//Stores how much on the imaginary circle to change by at one time
    // this.wanderMultiplier = 5;//Stores how large the imaginary circle is (radius?)


    this.wanderSmoothing = 100;//The higher the number the smoother and less
    //random seeming the wandering will be


  }
  update()
  {
    //this.avoidWalls(0,0,width,height);
    this.t ++;
    this.display();
    //Keep all the movement code that is below at the bottom
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    ///If it is dark, and the creature is hungry, it freezes to death
    if(illumination<0.5 && this.fullness<=0)
    {
      this.die();
    }
    ///Creature progressively gets more hungry
    this.fullness -= this.energyConsumption;//At this rate, 1 food lasts a creature 1 day
    //If creature has loads of food, it asexualy reproduces
    if(this.fullness>=3)
    {
      this.giveBirth();
    }


  }

  calculateEnergyConsumption()
  {
    this.energyConsumption *=this.width*0.2;
    this.energyConsumption *= this.maxSpeed;
    this.energyConsumption += abs(this.searchConeAngle)*1/1440;
    this.energyConsumption += 1/1440;
    //this.energyConsumption *= timeDilation/3;
  }

  display()
  {
    if(this.velocity.mag()>this.maxSpeed/25)
    {
      this.theta = this.velocity.heading()-PI/2;
    }
    fill(this.color[0],this.color[1],this.color[2]);

    //Agent visualisation code - currently draws it as triangle
    //facing the direction of movement
    push();
    translate(this.position.x,this.position.y);
    rotate(this.theta);
    beginShape();
    vertex(this.width/2,0);//right
    vertex(-this.width/2,0);//left
    vertex(0,this.height);//top
    endShape();
    ///No eyes for now!
    //eyes
    fill(0);
    circle(this.width/5,this.height*(3/5),this.width/20);
    circle(-this.width/5,this.height*(3/5),this.width/20);
    pop();

    fill(255);
  }


  findEnergyConsumption()
  {
    
  }
  //////////////AI 

  ///They need to eat eachother
  eatOthers(obArray)
  {
    ///Uses search for code, but only on significantly smaller creatures
    //create a search cone in front of the agent
      push();
      translate(this.position.x,this.position.y);
      rotate(this.theta);
// <<<<<<< HEAD
      // //Code to visualize search cone
      // fill(255,255,255,30);
      // arc(0, 0, this.searchConeRadius, this.searchConeRadius,PI/2-this.searchConeAngle/2, (PI/2)+this.searchConeAngle/2, PIE);
      // let searchLine = createVector(0,this.searchConeRadius);
      // line(0,0,searchLine.x,searchLine.y);
      //Then, find positions of all objects in array
      pop();
      let pots = [];
      let wids = [];
      for(let i=0; i<obArray.length; i++)
      {
        pots.push(obArray[i].position);
        wids.push(obArray[i].width);
        //Find vector from target to agent
        let vecRel = p5.Vector.sub(pots[i],(this.position));
        // //Tempory code to visualise that vector
        // push();
        // translate(this.position.x,this.position.y);
        // line(0,0,vecRel.x,vecRel.y);
        // pop();

        //Find angle of target relative to current heading of agent
        let tgtHeading = vecRel.heading();
        let headingDif = this.velocity.heading()-tgtHeading;
        //Find distance of target relative to current pos of agent
        let posDif = p5.Vector.dist(pots[i],this.position);
        let widthDif = abs(this.width)/wids[i];
        //Check if target is in range and is small enough
        if(abs(headingDif)<this.searchConeAngle/2 && posDif<this.searchConeRadius/2 && widthDif>1.5)
        {        
          this.hasTarget = true;
          this.seek(pots[i]);          
        }
        else
        {
          this.hasTarget = false;///Holy fuck this is bad code, need to merge this varable w the avoid walls one tba
        }
      }
  }



  ///Function to direct agent towards a target object
  seek(target)
  {
    let tempTarget = target;
    let desired = vectorAdd(p5.Vector.mult(this.position,-1),tempTarget);
    desired.setMag(this.maxSpeed);
    this.steer(desired);
  }
  ///Once a desired velocity has been calculated, function to steer agent towards that
  steer(desired)
  {
    let steering = desired.sub(this.velocity);
    steering.setMag(this.maxForce);
    //steering.mult(timeDilation);
    this.applyForce(steering);
  }


  // // /////////Depricated wanda function, prbly sucks
  // // //wander using perlin noise to aim agent - currently not active
  // // wander()
  // // {
  // //   //How jerky the perlin noise is is defined here by what you divide t by
  // //   let tempT = this.t;
  // //   //Create a circle in front of the agent, then aim at perlin noise defined location along circle
  // //   //let direction = p5.Vector.normalize(this.velocity);
  // //   let direction = this.velocity.copy();
  // //    direction.normalize();
  // //    direction.mult(20);//Abritary for now, tbd
  // //    let circleOrigin = p5.Vector.add(this.position,direction);//Create circle in front of agent
  // //   this.wanderThetaX = noise(tempT); //Then steer to perlin noise defined position
  // //   this.wanderThetaY = noise(tempT); //Then steer to perlin noise defined position
  // //   this.wanderThetaX = map(this.wanderThetaX,0,1,0,PI);
  // //   this.wanderThetaY = map(this.wanderThetaY,0,1,-PI/2,PI/2);
  // //   //this.wanderTheta += random(-this.wanderMaxRad,this.wanderMaxRad);
  // //   let circlePos = createVector(cos(this.wanderThetaX),sin(this.wanderThetaY)); //creates circle here as unit circle
  // //   //circlePos.mult(this.wanderMultiplier);
  // //   let target = p5.Vector.add(circlePos,circleOrigin);
  // //   let target = p5.Vector.add(this.position,direction);
  // //   this.seek(target);
  // // }

  wander()
  {
    ///Wanders to a perlin noise defined point on the edge of the agents search searchConeAngle
    //How smooth perlin noise is defined by what you divide t by
    let tempT = this.t/this.wanderSmoothing;
    ///It will need to not wander when anything else is happening --tba
    ///now find the position on the search cone to aim for
    let tempPerlinT = noise(tempT);
    ///Map perlin noise onto angle of searchCone
    let searchConeAngle = map(tempPerlinT,0,1,-this.searchConeAngle/2,this.searchConeAngle/2);

    //Now create a vector pointing to that point
    let targetWanderPoint = createVector(1,0);
    targetWanderPoint.setHeading(this.theta+searchConeAngle+PI/2)
    targetWanderPoint.setMag(this.searchConeRadius);

    //Now translate that vector
    targetWanderPoint = p5.Vector.add(this.position,targetWanderPoint);
    //DEBUG: line(this.position.x,this.position.y,targetWanderPoint.x,targetWanderPoint.y);
    ////Now aim for that point
    strokeWeight(3);
    point(targetWanderPoint.x,targetWanderPoint.y);
    this.seek(targetWanderPoint);
    strokeWeight(1);


  }




  //Search for a certain physical object. Takes in array of object type -
  //object MUST have attribute 'object'.position
  searchFor(obArray)
  {
      //create a search cone in front of the agent
      push();
      translate(this.position.x,this.position.y);
      rotate(this.theta);
// <<<<<<< HEAD
      // //Code to visualize search cone
      // fill(255,255,255,30);
      // arc(0, 0, this.searchConeRadius, this.searchConeRadius,PI/2-this.searchConeAngle/2, (PI/2)+this.searchConeAngle/2, PIE);
      // let searchLine = createVector(0,this.searchConeRadius);
      // line(0,0,searchLine.x,searchLine.y);
      //Then, find positions of all objects in array
      pop();
      let pots = [];
      for(let i=0; i<obArray.length; i++)
      {
        pots.push(obArray[i].position);
        //Find vector from target to agent
        let vecRel = p5.Vector.sub(pots[i],(this.position));
        // //Tempory code to visualise that vector
        // push();
        // translate(this.position.x,this.position.y);
        // line(0,0,vecRel.x,vecRel.y);
        // pop();

        //Find angle of target relative to current heading of agent
        let tgtHeading = vecRel.heading();
        let headingDif = this.velocity.heading()-tgtHeading;
        //Find distance of target relative to current pos of agent
        let posDif = p5.Vector.dist(pots[i],this.position);
        if(abs(headingDif)<this.searchConeAngle/2 && posDif<this.searchConeRadius/2)
        {
          this.hasTarget = true;
          this.seek(pots[i]);
        }
        else
        {
          this.hasTarget = false;///Holy fuck this is bad code, need to merge this varable w the avoid walls one tba
        }
      }
  }

  //Eat food -- agent always eats food when it runs into it,
  //Maybe changed down the line
  //Prbly want to add animation tba
  eatPlants()
  {
    let foodDistances = [];
    for(let i=0; i<foods.length; i++)
    {
      foodDistances.push(p5.Vector.sub(this.position,foods[i].position).mag());
      if(foodDistances[i]<this.width)
      {
        foods[i].isEaten();
        this.fullness ++;
      }
    }
    
  }

  eatAgents()
  {
    let agentDistances = [];
    let wids = [];
    for(let i=0; i<agents.length; i++)
    {
      agentDistances.push(p5.Vector.sub(this.position,agents[i].position).mag());
      wids.push(agents[i].width);
      let widthRatio = this.width/wids[i]
      if(agentDistances[i]<this.width && agentDistances[i]>0 && widthRatio>1.5)
      {
        agents[i].die();
        this.fullness ++;
      }
    }
  }

  //Kills the agent according to any death scenario
  die()
  {
    //Incredibly dodgy right now - just moves agent offscreen and makes it unable to moves
    //Prbly want to add animation as well
    //If performance is problem tbd, actually delete agent
    this.position = createVector(10000,10000);
    this.velocity = createVector(0,0);
    this.maxForce = 0;
    this.maxSpeed = 0;
    this.dead = true;
  }

  //Releases egg
  giveBirth()//Genes tba , currently asexual function, but should work sexually later too
  {
    this.fullness--;
    otherEntities.push(new egg(createVector(this.position.x,this.position.y),(deepClone(this.dna))));
  }

  //stop the agent
  stop()
  {
    if(this.velocity.mag()>this.maxSpeed/25)
    {
      let steering = p5.Vector.mult(this.velocity,-1);
      steering.setMag(this.maxForce);
      this.applyForce(steering);
    }
    else if(this.velocity.mag()>0 && this.velocity.mag()<this.maxSpeed/25)
    {
      this.velocity.setMag(0);
    }
  }
  ///Go to target and then stop
  //tba change distances to some ratio of maxspeed
  arrive(target)
  {
    //Get target
    let tempTarget = target;
    let desired = p5.Vector.sub(tempTarget,this.position);
    //Slow down when the agent arrives
    let speed;
    if(desired.mag()<this.maxSpeed*15 && desired.mag()>this.maxSpeed*5)
    {
      speed = map(desired.mag(),0,100,0,this.maxSpeed);
      desired.setMag(speed);
      this.steer(desired);
    }
    else if(desired.mag()<this.maxSpeed*5)
    {
      this.stop();
    }
    else if(desired.mag()>this.maxSpeed*15)
    {
      speed = this.maxSpeed;
      desired.setMag(speed);
      this.steer(desired);
    }
  }

  /// F=MA function
  applyForce(force)
  {
    this.acceleration.add(force.mult(1/this.mass));
  }

  //Don't leave the canvas!
  avoidWalls(xBoundL,xBoundH,yBoundL,yBoundH)
  {
    ///Function to avoid box laid out by the 4 bounds
    let expectedPos = p5.Vector.add(this.position,p5.Vector.mult(this.velocity,5));
    if(expectedPos.x<xBoundL)
    {
      let desired = createVector(this.maxSpeed,this.velocity.y);
      this.steer(desired);
      this.turning = true;
    }
    if(expectedPos.x>xBoundH)
    {
      let desired = createVector(-this.maxSpeed,this.velocity.y);
      this.steer(desired);
      this.turning = true;
    }
    if(expectedPos.y<yBoundL)
    {
      let desired = createVector(this.velocity.x,this.maxSpeed);
      this.steer(desired);
      this.turning = true;
    }
    if(expectedPos.y>yBoundH)
    {
      let desired = createVector(this.velocity.y,-this.maxSpeed);
      this.steer(desired);
      this.turning = true;
    }
    if(this.turning == true)
    {
      this.turning = false;
      let desired = this.velocity.copy();
      desired.setMag(this.maxSpeed);
      this.steer(desired);
    }

  }
  //
  // //Avoid an array of other agents
  // avoidOthers(incArray)
  // {
  //   let badPeople = [...incArray];//bAD people is agents to avoid
  //   //Need to remove yourself from the list so you dont try to avoid yourself
  //   for(let i=0; i<badPeople.length; i++)
  //   {
  //     if(badPeople[i].id == this.id)
  //     {
  //       badPeople.splice(i,1);
  //     }
  //   }
  //   for(let i=0; i<badPeople.length; i++)
  //   {
  //     this.avoidPosition(badPeople[i].position)
  //   }
  // }




  //Avoid a group of other agnets 2.0 - takes in array of agents and desired seperation distance
  avoidOthers(agentArray,seperation)
  {
    let totalNearby = 0;
    let finalDesired = createVector(0,0);//Vector to store the end calculated desired vector
    //let expectedPos = p5.Vector.add(this.position,this.velocity);
    for(let i=0; i<agentArray.length; i++)
    {
      let other = agentArray[i];
      //find distance to other agents
      let distance = p5.Vector.dist(other.position,this.position);
      if(distance > 0 && (distance <seperation))//check that you are near, and you are not the same agent
      {
        //create vector pointing away from nearby agent
        let opposite = p5.Vector.sub(this.position,other.position);
        opposite.normalize();
        totalNearby ++;
        finalDesired.add(opposite);
      }
    }
    if(totalNearby>0)
    {
      finalDesired.setMag(this.maxSpeed);
      this.steer(finalDesired);
    }
  }

  ///Function to make agent avoid going to one specific spot
  avoidPosition(badSpot)
  {
    ///Find where the agent will be in a few frames (ie vision range TBA)
    let expectedPos = p5.Vector.add(this.position,p5.Vector.mult(this.velocity,5));
    //Find distance from expected position and point you want to avoid
    let expectedDistance = p5.Vector.sub(expectedPos,badSpot).mag();
    if(expectedDistance < 50)//If closer than abritary 50 pixels, then turn
    {
      //Creates vector directly behind agent to seek - this is turning around part
      let turnPoint = p5.Vector.sub(this.position,this.velocity);
      //let randomVariation = createVector(random(-20,20),random(-20,20));
      //turnPoint.add(randomVariation);
      this.seek(turnPoint);
    }
  }


}
