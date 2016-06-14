// aframe-keyboard.js
// repo    : https://github.com/richardanaya/aframe-keyboard
// license : MIT
require("aframe-html");

(function (window, module, AFRAME, React, ReactDOM) {
	"use strict";
	AFRAME = AFRAME.aframeCore || AFRAME;

	AFRAME.registerComponent('keyboard', {
		init: function(){
			var keyboardHTML = document.createElement("a-plane")
			keyboardHTML.setAttribute("html-material","width:512;height:512");

			keyboardHTML.addEventListener("raycaster-intersected-webvrcontroller0button1pressed",function(e){
				var uv_x = e.detail.intersection.uv.x;
				var uv_y = 1-e.detail.intersection.uv.y;
				keyboardHTML.components["html-material"].triggerEventAt("click",uv_x*512,uv_y*512);
			});

			this.el.appendChild(keyboardHTML);
			setTimeout(function(){
				var component = keyboardHTML.components["html-material"];
				var h = React.createElement;
				var keys = ["`1234567890-=","qwertyuiop[]","asdfghjkl;'","zxcvbnm,./"]
				function render(){
					var keyComponents = []
					function createKey(k){
						return h("div",{className:"key",onClick:function(){console.log(k)}},k);
					}
					for(var i in keys){
						for(var l in keys[i]){
							keyComponents.push(createKey(keys[i][l]));
						}
						keyComponents.push(h("br",null,null));
					}
					ReactDOM.render(
						h("div",null,
							[
								h("style",null,".keyboard{background:black;color:white;border-radius:5px;padding:5px;}" +
									".key{width:21px;height:21px;border:solid 1px white;padding:3px;display:inline-block;margin:3px}"),
								h("div",{className:"keyboard"},keyComponents)
							]
						),
						component.getDocument().body
					);
					component.updateTexture();
				}
				render();
			},100)
		}
	});
})(
	typeof window !== "undefined" ? window : {},
	typeof module !== "undefined" ? module : {},
	typeof require !== "undefined" ? require("aframe") : (AFRAME || window.AFRAME),
	typeof require !== "undefined" ? require("react") : React,
	typeof require !== "undefined" ? require("react-dom") : ReactDOM
);
