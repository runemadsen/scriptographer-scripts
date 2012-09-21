/* Main Setup
-------------------------------------------------------------------- */

var myArtboard = document.activeArtboard;
var w = myArtboard.bounds.width;
var h = myArtboard.bounds.height;
var center = new Point(w/2, h/2);

/* Grid Setup
-------------------------------------------------------------------- */

var grid = new Group();

var baseline = 10;
var pageMargin = 60;//w/50 + (Math.random() * (w/10));

var numColumns = 12;

var gridWidth = w - (pageMargin*2);
var columnWidth = gridWidth / numColumns;

var columnMarginRatio = 0.1;
var columnMargin = columnWidth * columnMarginRatio;

/* Generative Grid
-------------------------------------------------------------------- */

function drawGrid()
{
	// draw the baseline
	var yPos = pageMargin + baseline;
	while(yPos < h - pageMargin)
	{
		var path = new Path.Line(new Point(pageMargin, yPos), new Point(w-pageMargin, yPos));
		path.strokeWidth = 2;
		path.strokeColor = '#AED2F4';
		grid.appendChild(path);
		yPos += baseline;
	}
	
	// draw page margin
	var rectangle = new Rectangle(new Point(pageMargin, pageMargin), new Point(pageMargin + gridWidth, h - pageMargin));
	var pageBounds = new Path.Rectangle(rectangle);
	pageBounds.strokeWidth = 2;
	pageBounds.strokeColor = '#AED2F4';
	pageBounds.fillColor = null;
	grid.appendChild(pageBounds);
	
	// draw the columns
	var xPos = pageMargin;
	for(var i = 0; i < numColumns; i++)
	{
		var leftLine = new Path.Line(new Point(xPos, pageMargin), new Point(xPos, h - pageMargin));
		leftLine.strokeWidth = 2;
		leftLine.strokeColor = '#AED2F4';
		
		var leftMargin = new Path.Line(new Point(xPos + columnMargin, pageMargin), new Point(xPos + columnMargin, h - pageMargin));
		leftMargin.strokeWidth = 2;
		leftMargin.strokeColor = '#AED2F4';
		
		var rightMargin = new Path.Line(new Point(xPos + (columnWidth - columnMargin), pageMargin), new Point(xPos + (columnWidth - columnMargin), h - pageMargin));
		rightMargin.strokeWidth = 2;
		rightMargin.strokeColor = '#AED2F4';
		
		grid.appendChild(leftLine);
		grid.appendChild(leftMargin);
		grid.appendChild(rightMargin);
		xPos += columnWidth;
	}
}

//drawGrid();

/* Generative Circles
-------------------------------------------------------------------- */

var weight = w * 0.05;
var radius = (gridWidth / 2) - columnWidth - (weight / 2);//w * 0.25;

function drawCircles()
{
	var circles = new Group();
	
	var numArcs = 5 + (Math.random() * 15);
	var ranBounds = w * 0.2;

	for(var i = 0; i < numArcs; i++)
	{
		// only set alpha on some arcs
		var ranAlpha = 1;
		if(Math.random() > 0.8) ranAlpha = 0.5 + (Math.random() * 0.5);

	  var ranStart = -360 + (Math.random() * 720);
	  var ranStop  = -360 + (Math.random() * 720);
		var ranMiddle = (ranStart + ranStop) / 2 + (180).toRadians();

		var minusRadius = Math.random() * ranBounds;
		var vector = new Point(radius - minusRadius, 0);
		var arcStart = center + vector.rotate(ranStart);
		var arcMiddle = center + vector.rotate(ranMiddle);
		var arcEnd = center + vector.rotate(ranStop);

		var arc = new Path.Arc(arcStart, arcMiddle, arcEnd);
		arc.strokeWidth = weight;
		arc.opacity = ranAlpha;
		arc.fillColor = null;
		circles.appendChild(arc);
	}
}

drawCircles();

/* Headings
-------------------------------------------------------------------- */

var heading = ["CENTER FOR", "THE RECENTLY", "POSSIBLE"];
var subHeading = "ITP RESIDENTS SHOW"
var headingSize = baseline * 6;

function drawHeadings()
{
	var position = new Point(pageMargin, pageMargin + headingSize);
	
	// draw heading
	for(var i = 0; i < heading.length; i++)
	{
		var headingItem = new PointText(position);
		headingItem.content = heading[i];
		headingItem.characterStyle.fontSize = headingSize;
		headingItem.characterStyle.font = app.fonts['Akkurat']['Light Italic'];
		headingItem.characterStyle.fillColor = "#1A1A1A";
		position.y += headingSize - (headingSize / 12);
	}
	
	// draw sub heading
	var subHeadingSize = baseline * 2.6;
	position.y -= subHeadingSize / 3;
	var subHeadingItem = new PointText(position);
	subHeadingItem.content = subHeading;
	subHeadingItem.characterStyle.fontSize = subHeadingSize;
	subHeadingItem.characterStyle.fillColor = "#1A1A1A";
	subHeadingItem.characterStyle.font = app.fonts['Akkurat']['Light'];
}

drawHeadings();


/* Location / Dates
-------------------------------------------------------------------- */

var location = ["Suite 216", "111 Front Street", "Brooklyn, NY 11201"];
var dates = ["September 28, 2012 - 6:00PM", "September 29, 2012 - 12:00PM", "September 30, 2012 - 12:00PM"]

function drawLocationDates()
{
	var fontSize = baseline * 1.8;
	var position = new Point(w - pageMargin - (4*columnWidth), pageMargin + (headingSize * 1.1));
	
	// draw locations
	for(var i = 0; i < location.length; i++)
	{
		var locationItem = new PointText(position);
		locationItem.content = location[i];
		locationItem.characterStyle.fontSize = fontSize;
		locationItem.characterStyle.font = app.fonts['Akkurat']['Light'];
		locationItem.characterStyle.fillColor = "#1A1A1A";
		position.y += fontSize + baseline;
	}
	
	position.y += baseline;
	
	// draw dates
	for(var i = 0; i < location.length; i++)
	{
		var dateItem = new PointText(position);
		dateItem.content = dates[i];
		dateItem.characterStyle.fontSize = fontSize;
		dateItem.characterStyle.font = app.fonts['Akkurat']['Light'];
		dateItem.characterStyle.fillColor = "#1A1A1A";
		position.y += fontSize + baseline;
	}

}

drawLocationDates();


/* Description
-------------------------------------------------------------------- */

var description = "A group of ten artists whose mission is to explore the imaginative use of communications technologies; how they might augment, improve, and bring delight and art into people's lives. These explorers of the Recently Possible are all recent graduates from, and current research residents at, the Interactive Telecommunications Program - a two year graduate program at the Tisch School of the Arts.";

function drawDescription()
{
	var fontSize = baseline * 1.8;
	var position = new Point(pageMargin, (h/2) + radius + (8*baseline));
	var size = new Size(columnWidth * 6, (h-pageMargin)-position.y); 
	var rectangle = new Rectangle(position, size); 

	var descriptionItem = new AreaText(rectangle); 
	descriptionItem.paragraphStyle.hyphenation = false;
	descriptionItem.content = description;
	descriptionItem.characterStyle.fontSize = fontSize;
	descriptionItem.characterStyle.font = app.fonts['Akkurat']['Light'];
	descriptionItem.characterStyle.fillColor = "#1A1A1A";

}

drawDescription();


/* Artists
-------------------------------------------------------------------- */

var artistsHeading = "Artists Include"
var artists = "Brett Murphy, Patricia Adler, Rune Madsen, Calli Higgins, Molly Schwartz, Greg Borenstein, Chika, Patrick Hebron, Mike Knuepfel, and Zeven Rodrriguez."

function drawArtists()
{
	var fontSize = baseline * 1.8;
	var position = new Point(pageMargin + (7*columnWidth), (h/2) + radius + (8*baseline) + (fontSize*0.8));
	var size = new Size(columnWidth * 5, (h-pageMargin)-position.y); 
	
	var artistsHeadingItem = new PointText(position); 
	artistsHeadingItem.paragraphStyle.hyphenation = false;
	artistsHeadingItem.content = artistsHeading;
	artistsHeadingItem.characterStyle.fontSize = fontSize;
	artistsHeadingItem.characterStyle.font = app.fonts['Akkurat']['Bold'];
	artistsHeadingItem.characterStyle.fillColor = "#1A1A1A";
	
	position.y += baseline * 2;
	
	var rectangle = new Rectangle(position, size); 

	var artistItem = new AreaText(rectangle); 
	artistItem.paragraphStyle.hyphenation = false;
	artistItem.content = artists;
	artistItem.characterStyle.fontSize = fontSize;
	artistItem.characterStyle.font = app.fonts['Akkurat']['Light'];
	artistItem.characterStyle.fillColor = "#1A1A1A";

}

drawArtists();

