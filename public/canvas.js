(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{131:function(t,i,s){"use strict";s.r(i);const a={props:["color","width","height","imageURL","text"],data:function(){return{mode:"draw",canvas:document.getElementById("canvas")}},computed:{mainSize(){return this.dimension?Math.min(...this.dimension.split(",").map(t=>Number(t.trim()))):100},imageWidth(){return this.width?this.width<=200?this.width:200:100},imageHeight(){return this.height?this.height<=200?this.height:200:100},canvasWidth(){return Math.min(2*this.imageWidth,300)},canvasHeight(){return Math.min(2*this.imageHeight,300)},offsetLeft(){return Math.round((300-this.imageWidth)/2)},offsetTop(){return Math.round((300-this.imageHeight)/2)}},template:'\n      <figure style="width:300px;height:300px;">\n        <canvas id="canvas"\n                :width="canvasWidth"\n                :height="canvasHeight">\n        </canvas>\n      </figure>\n      ',methods:{init(){this.canvas.style=`\n              position: absolute;\n              top: ${this.offsetTop}px;\n              left:${this.offsetLeft}px;\n          `,this.createStaticPoints(),this.canvas.points=[],this.staticPoints.forEach(t=>this.canvas.points.push(new h(this.canvas,this.ctx,t)))},loop(){this.mode&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this[this.mode]()),requestAnimationFrame(this.loop.bind(this))},draw(){"draw"===this.mode&&(this.play=this.canvas.points.filter(t=>t.move()).length,this.mode=this.play?"draw":null)},break(){"break"===this.mode&&("break"===this.mode&&(this.play=this.canvas.points.filter(t=>t.break()).length),this.play||(this.init(),this.mode="draw"))},createStaticPoints(){this.staticPoints=[];getComputedStyle(document.documentElement).getPropertyValue("--primary");this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);let t=document.body.appendChild(document.createElement("img"));t.style.display="none",t.src="./images/js-icon.svg";let i=this.width||80,s=this.height||80;this.ctx.drawImage(t,0,0,i,s);let a=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let t=0;t<a.length;t+=4)(a[t]||a[t+1]||a[t+2])&&this.staticPoints.push({x:Math.round(t%(4*this.canvas.width)/4),y:Math.round(t/(4*this.canvas.width))})},clickHandler(){this.canvas.points.length?this.mode="break":(this.init(),this.mode="draw"),this.loop()}},mounted:function(){this.canvas=document.getElementById("canvas"),this.canvas.style="\n          position: absolute;\n          bottom: 10px;\n          right:20px;\n      ",canvas.width=250,canvas.height=200,this.canvas.onclick=this.clickHandler,this.canvas.maxDistance=Math.min(this.canvas.width,this.canvas.height),this.canvas.points=[],this.staticPoints=[],this.ctx=this.canvas.getContext("2d"),this.staticText=this.text||"",this.init(),this.loop()}};class h{constructor(t,i,s){this.canvas=t,this.ctx=i,this.target=s,this.color=this.color?4===this.color.length?this.color.slice(1).split("").map(t=>parseInt(t,16)*parseInt(t,16)):7===this.color.length?[parseInt(color.slice(1,3),16),parseInt(color.slice(3,5),16),parseInt(color.slice(5,7),16)]:this.colors[Math.round(Math.random()*(this.colors.length-1))]:this.colors[Math.round(Math.random()*(this.colors.length-1))],this.color[3]=255,Object.defineProperty(this,"distance",{get(){return Math.round(Math.sqrt(Math.pow(this.target.x-this.x,2)+Math.pow(this.target.y-this.y,2)))},set(t){this.color[3]=Math.round((this.maxDistance-t)/this.maxDistance*255);let i=Math.PI/2*Math.random();[this.x,this.y]=[this.target.x+Math.round(t*Math.sin(i)),this.target.y+Math.round(t*Math.cos(i))]}}),this.distance=this.maxDistance,this.draw()}move(){return this.distance?(this.distance=Math.max(0,Math.round(this.distance-this.velocity*Math.random())),this.color[3]=Math.round((this.maxDistance-this.distance)/this.maxDistance*255),this.draw(),Boolean(this.distance)):this.draw()}break(){let t=Math.PI/2*Math.random(),i=Math.round(this.velocity*Math.random());return[this.x,this.y]=[this.x+Math.round(i*Math.sin(t)),this.y+Math.round(i*Math.cos(t))],this.color[3]=Math.round((this.maxDistance-this.distance)/this.maxDistance*255),this.draw(),Math.max(this.maxDistance-this.distance,0)}draw(){let t=this.ctx.getImageData(this.x,this.y,1,1),i=t.data;for(var s=0;s<4;s++)i[s]=this.color[s];this.ctx.putImageData(t,this.x,this.y)}}h.prototype.colors=[[255,0,255,255],[130,255,130,255],[255,90,0,255],[0,150,200,255],[255,255,170,255]],h.prototype.velocity=4,Object.defineProperty(h.prototype,"maxDistance",{get(){return Math.round(Math.min(.5*this.canvas.width,.5*this.canvas.height))}}),i.default=a}}]);