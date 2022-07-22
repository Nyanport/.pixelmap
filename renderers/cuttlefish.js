//window.pixelmap = { "name": "COOLERRENDER" }; // Unofficial render test
const currentDate = new Date();
var version = 0.1;
console.log("Pixelmapper for P5.js (codename Cuttlefish) v" + version.toString() + " renderer OFFICIAL\n\u00A9 The Pixelmap Authors " + currentDate.getFullYear()); // Making my life easier so I never have to update the year.
var pxname = "Official Pixelmapper for P5.js (codename Cuttlefish) v" + version.toString() + " by The Pixelmap Authors";
var pmp5 = {
	"logs": false,
	"render": function(pm, pos, sketch) {
		var renderPixel = function(pixel, pixelsize, pos, sketch) {
			if(window.pixelmap.p5.logs) console.log("Rendered pixel at x: " + pos.x + (pixel.x*pixelsize) + ", y: " + pos.y + (pixel.y*pixelsize));
			//console.log(sketch);
			sketch.noStroke();
			sketch.fill(pixel.r, pixel.g, pixel.b, pixel.a);
			sketch.rect(pos.x + (pixel.x*pixelsize), pos.y + (pixel.y*pixelsize), pixelsize, pixelsize);
		};
		for(let pixel of pm.pixels) {
			renderPixel(pixel, pm.pixelsize, pos, sketch);
		}
		if(window.pixelmap.p5.logs) console.log("Finished render of \"" + ((typeof pm.name === 'undefined') ? ("Unnamed Pixelmap") : (pm.name)) + "\" at x: " + pos.x + ", y: " + pos.y);
	},
	"renderPixel": function(pixel, pixelsize, pos, sketch) {
			if(window.pixelmap.p5.logs) console.log("Rendered pixel at x: " + pos.x + (pixel.x*pixelsize) + ", y: " + pos.y + (pixel.y*pixelsize));
			//console.log(sketch);
			sketch.noStroke();
			sketch.fill(pixel.r, pixel.g, pixel.b, pixel.a);
			sketch.rect(pos.x + (pixel.x*pixelsize), pos.y + (pixel.y*pixelsize), pixelsize, pixelsize);
	},
	"loadPixelmap": function(url, _callback) {
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		      var pm = JSON.parse(this.responseText);
		      _callback(pm);
		      window.savePixelmap(pm);
		    }
		  };
		  xhttp.open("GET", url, true);
		  xhttp.send();
	},
	"genPixelmap": function(_name ,_pxsize, image, _callback) {
		var pm = { 
			"name": _name,
			"pixelsize": _pxsize,
			"pixels": []
		};
		for(let x = 0; x < image.width; x++) {
			for(let y = 0; y < image.height; y++) {
				var c = image.get(x, y);
				if(window.pixelmap.p5.logs) console.log("Transferred pixel at x: " + x + ", y: " + y);
				
				pm.pixels.push({ "r": red(c), "g": green(c), "b": blue(c), "a": alpha(c), "x": x, "y": y });
		  }
		}
		_callback(pm);
	}
};
window.savePixelmap = function(pm) {
	var pmID = Math.floor(Math.random() * 1000).toString();
	if(window.localStorage.hasOwnProperty(pmID)) {
		this();
		return;
	}
	if(window.pixelmap.p5.logs) console.log("Saving as Pixelmap #" + pmID);
	window.localStorage.setItem(pmID, JSON.stringify(pm));
};
function unofficialFound() {
	var renderID = Math.floor(Math.random() * 1000).toString();
	if(window.localStorage.hasOwnProperty(renderID)) {
		this();
		return;
	}
	console.warn("WARNING: Unofficial renderer found using same variable name as official.\nIf you are the developer of this renderer please use a different variable name.\nThis render will now be sent to localstorage as render #" + renderID);
	window.localStorage.setItem(renderID, JSON.stringify(window.pixelmap));
	window.pixelmap = {};
	window.pixelmap.p5 = pmp5;
}
if (typeof window.pixelmap === 'undefined') {
	// This case create a new one
	window.pixelmap = {};
	window.pixelmap.p5 = pmp5;
} else if(window.pixelmap.name !== pxname) {
	// This case warn the user
	unofficialFound();
}
//window.pixelmap.p5 = pmp5;
