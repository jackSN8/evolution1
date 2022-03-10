ArrayList<vehicle> vehicles;
float totalvecs = 10;
void setup()
{
  vehicles = new ArrayList<vehicle>();
  size(1500,1000);
}

void draw()
{
  background(255);
  for (vehicle v : vehicles)
  {
    v.display();
    v.update();
  }
}


void mouseReleased()
{
  vehicles.add(new vehicle(mouseX,mouseY));
}
