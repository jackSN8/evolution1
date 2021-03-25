let population = [];
let popSize = 100;
let target = 'raptor looks healthy';
let popFitness = new Array(popSize);


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

  for(let i=0; i<population.length; i++)
  {
    popFitness[i] = population[i].fitnessCalc(target);
  }
  ///Then Normalize the fitness so that the entire populations fitness fits
  let totalNum = sumArray(popFitness);
  //Normalize by dividing the current val by total
  for(let i=0; i<population.length; i++)
  {
    popFitness[i] /= totalNum;
  }
    //console.log(popFitness[2]);
  ///Then make them do the sex
  //Chance of them being a parent is the fitness, so create mating pool
  matingPool = makePool(population)
  //with the fitness being the amount of times in pool


}


///Function that sums an array
function sumArray(input)
{
  let total =0;
  for(let i=0; i<input.length; i++)
  {
    total += input[i];
  }
  return total;
}

///Function to create a mating pool based off the fitness of the individuals
function makePool()
{
  let matingPool = [];
  for(let i=0; i<population.length;i++)
  {
    let fitnessNorm = popFitness[i]*100;
    for(let j=0; j<fitnessNorm; j++)
    {
      matingPool.push(population[i]);
    }
  }
  return matingPool;
}

///Function to actually reproduce the words to create children
///Genes are split among (us) parents
// ⣿⣿⣿⣿⣿⣿⣿⢿⠟⠛⠿⠻⠿⠿⠟⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⡿⠛⢙⣨⣥⣶⣶⣿⢿⣿⣿⣷⣦⣅⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⠟⢀⡴⠟⠋⢉⣀⣠⣤⣤⣤⣀⠉⠻⣿⣧⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⠀⠁⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣷⠀⢻⣿⣇⠝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡀⣼⡿⠟⠀⠙⣛⣬⠱⣿⣿⣿⣿⣿⣿
// ⣿⣿⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⢀⠄⠁⣠⣶⣾⣿⣿⣿⡆⣼⣿⣿⣿⣿⣿
// ⣿⣿⠀⣀⠙⣛⣛⣻⠛⠋⣉⣢⣤⣾⠃⣰⡄⠸⣿⣿⣿⣿⣿⣷⠘⣿⣿⣿⣿⣿
// ⣿⣿⣤⢹⣷⣶⣶⣶⣾⣿⣿⣿⣿⣿⡄⠸⣷⠀⢻⣿⣿⡿⠟⠛⠡⣿⣿⣿⣿⣿
// ⣿⣿⣿⠄⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄⠻⠇⢈⠁⠀⠀⠲⠠⠞⠿⣿⣿⣿⣿
// ⣿⣿⣿⣷⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⢤⠀⠀⢲⣿⣿⣿⣷⣤⡉⣻⣿⣿
// ⣿⣿⣿⣿⣧⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣳⡀⢻⣿⣿⣿⣿⣷⠐⣿⣿
// ⣿⣿⣿⣿⣿⣯⡈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⡇⡆⣿⣿⣿⣿⡟⣀⣿⣿
// ⣿⣿⣿⣿⣿⣿⣷⡀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⢃⡿⠿⠛⡋⣀⣾⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣷⣀⠹⣿⣿⣿⣿⣿⣿⣿⠿⠋⢁⣠⣿⡦⠐⠀⢈⡙⢿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⠋⢀⣿⣿⣿⣿⠟⢃⣤⣤⡀⠻⣿⣇⣠⣴⡿⠄⠹⣧⡸⣿
// ⣿⣿⣿⣿⣿⣿⡿⠃⢠⣾⣿⣿⡿⢋⣤⣿⣿⣿⣿⣄⠈⢿⡿⠋⣠⣤⣀⠈⣡⣿
// ⣿⣿⣿⠅⣀⣈⠁⣰⣿⣿⡿⠋⣤⣾⣿⣿⣿⣿⣿⣿⣷⣵⣂⣽⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣄⠘⢿⣿⣿⠟⠋⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣷⣤⣬⣅⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
function reproduction()
{
  for(let i=0; i<population.length; i++)
  {
    let sexSeedM = int(random(population.length));
    let sexSeedF = int(random(population.length));
  }
}

///Function that takes in a number from 0-63 and returns a char
///at that point in the list below (all capitals, all non capitals, 0-9, space)
function makeID(inpNum)
{
  let characters = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let output = characters.charAt(inpNum);
  return output;
}
