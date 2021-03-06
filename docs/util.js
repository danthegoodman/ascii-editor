//--------------------------------------------- UTIL FUNCTIONS ------------------------------------------------------//

var KeyEvent = KeyEvent;
if (typeof KeyEvent == "undefined") {
    KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}

function debug(data) {
	if (typeof data === 'string'){
	  console.log('\''+data+'\'');
	  return;
	}
	if (typeof data == 'number'){
	  console.log(data);
	  return;
	}
	var ok = false;
	for (var key in data) {
	  ok = true;
	  if (data.hasOwnProperty(key)) {
	    console.log(key+"="+data[key]);
	  }
	}
	if (!ok){
	  console.log(data);
	}
}

function getTextWidth(ctx, font){
	ctx.font = font;
	var textMetrics = ctx.measureText("+");
	var width = textMetrics.width;
	return width;
}

function getTextHeight(ctx, font, left, top, width, height) {

    // Draw the text in the specified area
    ctx.save();
    ctx.font = font;
    ctx.fillText('█',width/2,height/2);
    ctx.restore();

    // Get the pixel data from the canvas
    var data = ctx.getImageData(left, top, width, height).data,
        first = false, 
        last = false,
        r = height,
        c = 0;

    // Find the last line with a non-white pixel
    while(!last && r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                last = r;
                break;
            }
        }
    }
    
    var cellDescend = 0;
    if (last){
    	cellDescend = last - height/2;
    }
    
    // Find the first line with a non-white pixel
    while(r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                first = r;
                break;
            }
        }

        // If we've got it then return the height
        if(first != r) break;
    }
    
    // debug
    if (debug=="true"){
	    ctx.save();
	    ctx.font = font;
	    ctx.fillStyle = "#000000";
	    ctx.fillRect(0,0,width,height);
	    ctx.fillStyle = "#ffffff";
	    ctx.fillText('█',width/2,height/2);
	    ctx.strokeStyle = "#00ff00";
	    ctx.beginPath();
		ctx.moveTo(0,first);
		ctx.lineTo(width, first);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0,height/2);
		ctx.lineTo(width, height/2);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0,last);
		ctx.lineTo(width, last);
		ctx.stroke();
		ctx.restore();
	}
    
    
    if  (first != r){
    	return [last - first,cellDescend];
    }

    // We screwed something up...  What do you expect from free code?
    return [0,0];
}

function drawBorder(canvasContext, width, height){
	canvasContext.lineWidth = 5;
	canvasContext.strokeStyle = "#00FF00";
	canvasContext.beginPath();
	canvasContext.moveTo(0,0);
	canvasContext.lineTo(width,0);
	canvasContext.stroke();
	canvasContext.beginPath();
	canvasContext.moveTo(0,0);
	canvasContext.lineTo(0,height);
	canvasContext.stroke();
	canvasContext.beginPath();
	canvasContext.moveTo(0,height);
	canvasContext.lineTo(width,height);
	canvasContext.stroke();
	canvasContext.beginPath();
	canvasContext.moveTo(width,0);
	canvasContext.lineTo(width,height);
	canvasContext.stroke();
}

function paint(ctx,font,cellWidth){
	ctx.font = font;
	ctx.fillText('┌──┼──┐ █ ██', 0,cellHeight-cellDescend);
	ctx.fillText('├──┼──┤ █ ██', 0,cellHeight*2-cellDescend);
	ctx.fillText('└──┼──┘ █ ██', 0,cellHeight*3-cellDescend);
	ctx.fillText('+--+--+ █', 0,cellHeight*5-cellDescend);
	ctx.fillText('+--+--+ █ ██', 0,cellHeight*6-cellDescend);
	ctx.fillText('+--+--+ █ ██', 0,cellHeight*7-cellDescend);
}

function delegateProxy(target,delegateName){
	// proxy handler
	var proxyHandler = {
		get(target, propKey, receiver) {
			const realTarget = target[propKey]? target : target[delegateName]? target[delegateName] : undefined; 
			const prop = realTarget? realTarget[propKey] : undefined;
			if (typeof(prop) != "function"){
				return prop;
			}
			return function (...args) {
				let result = prop.apply(realTarget, args);
				// console.log(propKey + JSON.stringify(args) + ' -> ' + JSON.stringify(result));
				return result;
			};
        }
	};
	return new Proxy(target,proxyHandler);
}