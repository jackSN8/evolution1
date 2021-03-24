let population = [];
let popSize = 100;
let target = 'raptor looks healthy';


function setup()
{
  createCanvas(800,500);
  for(let i=0; i<popSize; i++)
  {
    population.push(new DNA(20));
  }
}

function draw()
{
  background(27);
  noFill();
  stroke(0);
  textSize(32);
  ///Calculate the fitness of everything in the population
  let popFitness = [];
  for(let i=0; i<population.length; i++)
  {
    popFitness[i] = population[i].fitness(target);
  }
  ///Then Normalize the fitness so that the entire populations fitness fits
  let totalNum = sumArray(popFitness);
  //Normalize by dividing the current val by total
  for(let i=0; i<population.length; i++)
  {
    popFitness[i] /= totalNum;
  }
  ///Then make them do the sex

}


///Function that sums an array
function sumArray(input)
{
  let total =0;
  for(let i=0; i<input.lenth; i++)
  {
    total += input[i];
  }
  return total;
}

///Function that takes in a number from 0-63 and returns a char
///at that point in the list below (all capitals, all non capitals, 0-9, space)
function makeID(inpNum)
{
  let characters = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let output = characters.charAt(inpNum);
  return output;
}
