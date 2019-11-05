function rgba2hex(orig) {
	var a, isPercent,
	rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
	alpha = (rgb && rgb[4] || "").trim(),
	hex = rgb ? 
		(rgb[1] | 1 << 8).toString(16).slice(1) +
		(rgb[2] | 1 << 8).toString(16).slice(1) +
		(rgb[3] | 1 << 8).toString(16).slice(1) : orig;
	if (alpha !== "") {
		a = alpha;
	} else {
		a = 1;
	}
	var hexAlpha = Math.round(a*255).toString(16);
	hexAlpha = (hexAlpha.length!=2? "0"+hexAlpha : hexAlpha);
	return "#"+hex + hexAlpha;
}
function downloadFile(type="png") {// we create a canvas element
	var canvas = document.createElement('canvas');
	var height=20;
	var width=20;

	canvas.height=height;
	canvas.width=width;
	// getting the context will allow to manipulate the image
	var context = canvas.getContext("2d");

	// We create a new imageData.
	var imageData=context.createImageData(width, height);
	// The property data will contain an array of int8
	var data=imageData.data;
	console.clear();
	for (var i=0; i<height*width; i++) {
		var a = document.getElementsByClassName("pixel")[i];
		var s=a.style.backgroundColor;
		var as=rgba2hex(s);
		var ss=as.split("");
		var r=ss[1]+ss[2];
		var g=ss[3]+ss[4];
		var b=ss[5]+ss[6];
		var a=ss[7]+ss[8];
		data[i*4+0]=parseInt(r, 16) | 0; // Red
		data[i*4+1]=parseInt(g, 16) | 0; // Green
		data[i*4+2]=parseInt(b, 16) | 0; // Blue
		data[i*4+3]=parseInt(a, 16) | 0; // alpha (transparency)
		console.log(r+"; "+g+"; "+b+"; "+a+"; "+as);
	}
	context.putImageData(imageData, 0, 0);
	// Create an invisible A element
	const l = document.createElement("a");
	l.download="my."+type;
	l.href=canvas.toDataURL();
	l.click();
}