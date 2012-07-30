var myArtboard = document.activeArtboard;
var w = myArtboard.bounds.width;
var h = myArtboard.bounds.height;

var group = new Group();

var strokeThickness = 10; //round(random(3, 50));
var spacingX = 50; //round(random(50, 100));
var spacingY = 30; //round(random(30, 100));
var verSpacing = 50;

var xPos = 0;
var yPos = -150;
    
while(yPos < h)
{
  var myPath = new Path();
	myPath.add(new Point(xPos, yPos));
  myPath.add(new Point(xPos, yPos + strokeThickness));
  myPath.add(new Point(xPos + spacingX, yPos + spacingY + strokeThickness));
  myPath.add(new Point(xPos + (spacingX * 2), yPos + strokeThickness));
  myPath.add(new Point(xPos + (spacingX * 2), yPos));
  myPath.add(new Point(xPos + spacingX, yPos + spacingY));
  myPath.add(new Point(xPos, yPos));
	myPath.fillColor = new RGBColor(0, 0, 0);
	
	group.appendChild(myPath);
  
  xPos += spacingX*2;
  
  if(xPos > w)
  {
    xPos = 0;
    yPos += verSpacing;//strokeThickness*2;
  }
}

// create mask
var myCircle = new Path.Circle(new Point(w/2, h/2), w/2);
myCircle.fillColor = new RGBColor(0, 0, 0);
group.appendChild(myCircle);
group.clipped = true;
myCircle.clipMask = true;
    
//canvasMask.ellipseMode(CORNER);
//canvasMask.ellipse(0, 0, w, h);
//canvasMask.triangle(w/2, 0, w, h, 0, h);

function decide(percentage)
{
	percentage = typeof percentage !== 'undefined' ? a : 0.5;
	var ran = Math.random();
	return ran > percentage ? true : false;
}
