class DNA
{
  constructor(length)
  {
    this.genes = [];
    this.fitness;
    //Creates the words with totally random characters
    for(this.i=0; this.i<length; this.i++)
    {
      this.genes[this.i]=makeID(int(random()*27));//27 means only lower case
      //53 means all letters, capital and non capital + space. 63 adds digits 0-9
    }
  }


  update()
  {
    this.fitness = fitness(target);
  }

  ///Function to calculate the fitness of a single word (words are
  ///called DNAs which is a bit wierd.) Checks how many characters
  ///are the same as a target. Obviousely in the real world fitness
  ///is essentially a function of how much you reproduce, whereas in this
  ///case this determines how much the DNA gets to reproduce
  fitnessCalc(tTarget)
  {
    this.target = tTarget;
    this.fitness=0;
    for(this.i=0; this.i<this.genes.length; this.i++)
    {
      if(this.target[this.i]==this.genes[this.i])
      {
        this.fitness++;
      }
    }
    return this.fitness;
  }




}
