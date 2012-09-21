/* These are the things to play around with. Right now they randomize, but 
you can set them to specific values if you want to.
________________________________________________________________ */

// if true it draws a circle, if false it draws a triangle
var drawACircle = decide();

// controls thickness of the line in pixels.
var strokeThickness = random(3, 50);

// controls the width of half a chevron tile. The bigger the less steep it is
var spacingX = random(50, 100);

// controls the height of half a chevron tile. The bigger the steeper it is
var spacingY = random(30, 100);

// controls the whitespace between them
var verSpacing = random(5, 100);

/* Helper Functions 
________________________________________________________________ */

function decide(percentage)
{
	percentage = typeof percentage !== 'undefined' ? a : 0.5;
	var ran = Math.random();
	return ran > percentage ? true : false;
}

function random(a, b)
{
	return Math.floor(Math.random() * b) + a;
}

/* Draw Baby, Draw!
________________________________________________________________ */

var myArtboard = document.activeArtboard;
var w = myArtboard.bounds.width;
var h = myArtboard.bounds.height;

var group = new Group();

var xPos = 0;
var yPos = -150;

// create pattern
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
    yPos += strokeThickness + verSpacing;
  }
}

// create mask
var mask;

if(drawACircle)
{
	mask = new Path.Circle(new Point(w/2, h/2), w/2);
}
else
{
	mask = new Path();
	mask.add(new Point(w/2, 0));
  mask.add(new Point(0, h));
  mask.add(new Point(w, h));
	mask.fillColor = new RGBColor(0, 0, 0);
}

mask.fillColor = new RGBColor(0, 0, 0);
group.appendChild(mask);
group.clipped = true;
mask.clipMask = true;