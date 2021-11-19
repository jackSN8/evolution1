let population = [];
let popSize = 100;
let target = 'raptor looks healthy';
let popFitness = new Array(popSize);
let wordSize;


function setup()
{
  createCanvas(800,500);
  wordSize = target.length;
  for(let i=0; i<popSize; i++)
  {
    population.push(new DNA(wordSize));
  }
  // test1 = [];
  // test1.push(new DNA(wordSize));
  // test1.push(new DNA(wordSize));
  // test1[0].genes = stringToArray(target);
  // test1[1].genes = stringToArray("raptor isn unhealthy");
  // console.log(test1[1].genes);
  // test1 = reproduction(test1);
  // console.log(test1[0].genes);
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
  ///Then make them do the repduction
  //Chance of them being a parent is the fitness, so create mating pool
  //with the fitness being the amount of times in pool
  matingPool = makePool(population)
  //Reproduction algorithim
  population = reproduction(matingPool);
  text(arrayToString(population[1].genes),width/4,height/2);
  text(arrayToString(population[2].genes),width/4,height/2-100);
  text(arrayToString(population[3].genes),width/4,height/2-200);
  text(arrayToString(population[4].genes),width/4,height/2+100);

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
function reproduction(inputPool)
{
  let children = [];
  for(let i=0; i<inputPool.length; i++)
  {
    let sexSeedM = int(random(inputPool.length));
    let sexSeedF = int(random(inputPool.length));
    children.push(new DNA(wordSize));
    for(let j=0; j<wordSize; j++)
    {
      let randomKey = int(random(0,2));
      if(randomKey==0)
      {
        children[i].genes[j] = inputPool[sexSeedM].genes[j];
      }
      else if(randomKey==1)
      {
        children[i].genes[j] = inputPool[sexSeedF].genes[j];
      }
      else
      {
        console.log("Error, key out of bounds");
      }
    }
  }
  return children;
}

///Function that takes in a number from 0-63 and returns a char
///at that point in the list below (all capitals, all non capitals, 0-9, space)
function makeID(inpNum)
{
  let characters = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let output = characters.charAt(inpNum);
  return output;
}


///Function to convert char array to string
function arrayToString(input)
{
  let output = "";
  for(let i=0; i<input.length; i++)
  {
    output += input[i];
  }
  return output;
}
///Function to convert string into char array
function stringToArray(input)
{
  let output = [];
  for(let i=0; i<input.length; i++)
  {
    output[i] = input[i];
  }
  return output;
}
