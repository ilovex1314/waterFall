window.onload=function(){
	waterfall("main","box");
	// var dataInt={
	// 	"data":[
	// 		{"src":"24.jpg"},
	// 		{"src":"25.jpg"},
	// 		{"src":"26.jpg"},
	// 		{"src":"27.jpg"},
	// 		{"src":"28.jpg"},
	// 		{"src":"29.jpg"},
	// 		{"src":"30.jpg"},
	// 		{"src":"31.jpg"},
	// 		{"src":"32.jpg"},
	// 		{"src":"33.jpg"},
	// 		{"src":"34.jpg"},
	// 		{"src":"35.jpg"},
	// 		{"src":"36.jpg"},
	// 		{"src":"37.jpg"},
	// 		{"src":"38.jpg"}
	// 	]
	// }
	window.onscroll=function(){
		if(cango()){
			// var oParent=document.getElementById("main");
			// for(var i=0; i<dataInt.data.length; i++){
			// 	var box=document.createElement("div");
			// 	box.className="box";
			// 	oParent.appendChild(box);
			// 	var pic=document.createElement("div");
			// 	pic.className="pic";
			// 	box.appendChild(pic);
			// 	var img=document.createElement("img");
			// 	img.src="./images/"+dataInt.data[i].src;
			// 	pic.appendChild(img);
			// }
			ajax('get','data.json',null,addData,function(){ alert("wrong")});
		}
	}

}
var addData =  function(data) {
    // responseText -> 字符串
    alert(data);
    data = JSON.parse(data); // 将字符串解析为json格式
    var wrapperEle = document.getElementById('wrapper');
    for (var i = 0; i < data.length; i++) {
        var boxEle = document.createElement('div');
        var imgEle = document.createElement('img');
        imgEle.src = data[i].src;
        boxEle.appendChild(imgEle);
        wrapperEle.appendChild(boxEle);
    };
    waterfall("main","box");
}
var waterfall=function(parent,kid){
	var boxh=[];
	var oParent=document.getElementById(parent);
	var oKid=document.getElementsByClassName(kid);
	var oKidw=oKid[0].offsetWidth;
	var col=Math.floor(document.documentElement.clientWidth/oKidw);
	console.log(col);
	oParent.style.cssText="width:"+oKidw*col+"px; margin:0 auto;";
	for(var i=0; i<oKid.length; i++){
		if(i<col){
			boxh[i]=oKid[i].offsetHeight;
		}else{
			var h=Math.min.apply(null,boxh);
			var hIndex=fund(boxh,h);
			oKid[i].style.position="absolute";
			oKid[i].style.top=h+"px";
			oKid[i].style.left=oKid[hIndex].offsetLeft+"px";
			boxh[hIndex]+=oKid[i].offsetHeight;
		}
	}
}
var fund=function(arr,h){
	for(var i in arr){
		if(arr[i]==h){
			return i;
		}
	}
}
var cango=function(){
	var box=document.getElementsByClassName("box");
	var lastimg=document.getElementsByClassName("box")[box.length-1];
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(lastimg.offsetTop<document.documentElement.clientHeight+scrollTop){
		return true;
	}else{
		return false;
	}
}