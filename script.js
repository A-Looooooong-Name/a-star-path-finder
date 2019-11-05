var currentColor="#000000";

var bg=document.createElement("div");
bg.id="bg";
document.body.appendChild(bg);

for(var i=0;i<20;i++){
	for(var j=0;j<20;j++){
		var b = document.createElement("button");
		b.id=i+""+j;
		b.onclick=function(){this.style.backgroundColor=currentColor;};
		b.className="pixel";
		b.style="background-color:#00000000;position:absolute;top:"+(i*25)+"px;left:"+(j*25)+"px";
		document.getElementById("bg").appendChild(b);
	}
}