function radians(deg)
{
	return deg * Math.PI / 180
}

var myArtboard = document.activeArtboard;
var w = myArtboard.bounds.width;
var h = myArtboard.bounds.height;
var center = new Point(w/2, h/2);

var numArcs = 5 + (Math.random() * 15);
var radius = w * 0.3;
var weight = w * 0.05;
var ranBounds = w * 0.1;
var maxAlpha = 255;

for(var i = 0; i < numArcs; i++)
{
  var ranAlpha = Math.random() * maxAlpha;
  var ranStart = -360 + (Math.random() * 720);
  var ranStop  = -360 + (Math.random() * 720);
	var ranMiddle = (ranStart + ranStop) / 2 + (180).toRadians();

	var extraRadius = -ranBounds + (Math.random() * (2 * ranBounds));
	var vector = new Point(radius + extraRadius, 0);
	var arcStart = center + vector.rotate(ranStart);
	var arcMiddle = center + vector.rotate(ranMiddle);
	var arcEnd = center + vector.rotate(ranStop);
	
	var arc = new Path.Arc(arcStart, arcMiddle, arcEnd);
	arc.strokeWidth = weight;
	arc.fillColor = null;
}
