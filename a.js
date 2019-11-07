function Node(x,y,a,start=false,end=false,inPath=false){
	this.start=start;
	this.end=end;
	this.path=inPath;
	this.x=x;
	this.y=y;
	this.s=100;
	this.g=0;
	this.h=0;
	this.f=0;
	this.display=function(id){
		var d=document.createElement("div");
		d.id=this.x+","+this.y;
		d.onclick=function(){
			var array=this.id.split(",");
			change(parseInt(array[0]),parseInt(array[1]));
		};
		d.style.top=this.y*this.s+"px";
		d.style.left=this.x*this.s+"px";
		d.style.width=(this.s-2)+"px";
		d.style.height=(this.s-2)+"px";
		d.innerText="f = "+this.f+",\ng = "+this.g+",\nh = "+this.h+"\n("+this.x+", "+this.y+")";
		if(this.start){
			d.className="start";
		} else if(this.end){
			d.className="end";
		} else if(this.path){
			d.className="path";
		} else {
			d.className="node";
		}
		document.getElementById(id).appendChild(d);
	};
	this.getValueG=function(sx,sy){
		var dx=Math.abs(this.x-sx);
		var dy=Math.abs(this.y-sy);
		if(dx>dy){
			this.g=dy*14+(dx-dy)*10;
		} else if(dx<dy){
			this.g=dx*14+(dy-dx)*10;
		} else {
			this.g=dy*14;
		}
	};
	this.getValueH=function(ex,ey){
		var dx=Math.abs(this.x-ex);
		var dy=Math.abs(this.y-ey);
		if(dx>dy){
			this.h=dy*14+(dx-dy)*10;
		} else if(dx<dy){
			this.h=dx*14+(dy-dx)*10;
		} else {
			this.h=dy*14;
		}
	};
	this.getValueF=function(){
		this.f=this.g+this.h;
	};
}
function A(_s,_sx,_sy,_ex,_ey,_id){
	this.id=_id;
	this.s=_s;
	this.startx=_sx;
	this.starty=_sy;
	this.endx=_ex;
	this.endy=_ey;
	this.grid=[];
	this.path=[];
	this.newGrid=function(){
		var path=[];
		for(var i=0;i<this.s;i++){
			this.grid.push([]);
			for(var j=0;j<this.s;j++){
				this.grid[i].push(new Node(j,i));
			}
		}
		this.grid[this.starty][this.startx].start=true;
		this.grid[this.endy][this.endx].end=true;
	};
	this.find=function(){
		for(var i=0;i<this.s;i++){
			for(var j=0;j<this.s;j++){
				this.grid[i][j].path=false;
			}
		}
		if((this.startx !== null || this.starty !== null) || (this.endx !== null || this.endy !== null)){
			var currentNode=this.grid[this.starty][this.startx];

			var opened=[this.grid[this.starty][this.startx]];

			for(var i=0;i<this.s;i++){
				for(var j=0;j<this.s;j++){
					this.grid[i][j].getValueG(this.startx,this.starty);
					this.grid[i][j].getValueH(this.endx,this.endy);
					this.grid[i][j].getValueF();
				}
			}

			while(currentNode!==this.grid[this.endy][this.endx]){
				var y=currentNode.y;
				var x=currentNode.x;
				var min=0;
				var available=true;
				for(var i=0;i<3;i++){
					for(var j=0;j<3;j++){
						if(this.grid[y+i-1]!==null && this.grid[y+i-1]!==undefined){
							if(this.grid[y+i-1][x+j-1]!==null && this.grid[y+i-1][x+j-1]!==undefined){
								if(this.grid[y+i-1][x+j-1].f===this.grid[this.starty][this.startx].f && !opened.includes(this.grid[y+i-1][x+j-1])){
									if(this.grid[y+i-1][x+j-1].h<min.h || min===0){
										min=this.grid[y+i-1][x+j-1];
										opened.push(this.grid[y+i-1][x+j-1]);
										this.path.push(this.grid[y+i-1][x+j-1]);
										available=false;
									}
								}
							}
						}
					}
				}
				min.path=true;
				currentNode=min;
			}
		}
	};
	this.display=function(){
		var c=document.createElement("div");
		c.id=this.id;
		document.body.appendChild(c);
		for(var i=0;i<this.grid.length;i++){
			for(var j=0;j<this.grid[i].length;j++){
				this.grid[i][j].display(this.id);
			}
		}
	};
	this.remove=function(){
		document.body.removeChild(document.getElementById(this.id));
	};
}

var a=new A(20,5,6,2,7,"c");

function change(x,y) {
	if(document.getElementById(x+","+y).className==="start" || document.getElementById(x+","+y).className==="end"){
		document.getElementById(x+","+y).className="node";
	} else if(document.getElementsByClassName("start")[0]!==undefined){
		document.getElementById(x+","+y).className="end";
	} else if(document.getElementsByClassName("end")[0]!==undefined){
		document.getElementById(x+","+y).className="start";
	}
	var s=document.getElementsByClassName("start")[0].id.split(",");
	var e=document.getElementsByClassName("end")[0].id.split(",");
	a.startx=parseInt(s[0]);
	a.starty=parseInt(s[1]);
	a.endx=parseInt(e[0]);
	a.endy=parseInt(e[1]);
	for(var i=0;i<a.s;i++){
		for(var j=0;j<a.s;j++){
			a.grid[i][j].end=false;
			a.grid[i][j].start=false;
		}
	}
	a.grid[parseInt(e[1])][parseInt(e[0])].end=true;
	a.grid[parseInt(s[1])][parseInt(s[0])].start=true;
	a.find();
	a.remove();
	a.display();
}

a.newGrid();
a.find();
a.display();
