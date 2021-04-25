function vectorAdd(inp1,inp2)
{
  let outX = inp1.x + inp2.x;
  let outY = inp1.y + inp2.y;
  return createVector(outX,outY);
}