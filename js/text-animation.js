
var typingAnimationInstances = {};
var keyStates = {};

function logKeyPress(e){
    var keynum;

    if(window.event) { // IE                    
        keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
        keynum = e.which;
    }
    keyStates[keynum] = true;
}

function logKeyUp(e){
    var keynum;

    if(window.event) { // IE                    
        keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
        keynum = e.which;
    }
    keyStates[keynum] = false;
}

function startTypingAnimation(elementId, text, speed, callback) {
    document.body.removeEventListener("keydown",logKeyPress);
    document.body.removeEventListener("keyup",logKeyUp);
    document.body.addEventListener("keydown", logKeyPress);
    document.body.addEventListener("keyup", logKeyUp);
    var animationInstance = {};
    animationInstance['i'] = 0;
    animationInstance['txt'] = text;
    animationInstance['speed'] = speed;
    animationInstance['callback'] = callback;
    typingAnimationInstances[elementId] = animationInstance;
    document.getElementById(elementId).innerHTML = "";
    setTimeout(function() { typingAnimation(elementId); }, speed);
}

function appendTypingAnimation(elementId, text, speed, callback) {
    var animationInstance = {};
    var preText = document.getElementById(elementId).innerHTML;
    animationInstance['i'] = preText.length;
    animationInstance['txt'] = preText + text;
    animationInstance['speed'] = speed;
    animationInstance['callback'] = callback;
    typingAnimationInstances[elementId] = animationInstance;
    setTimeout(typingAnimation, speed, elementId);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function typingAnimation(elementId) {
    var X = 0;
    while ((X += 1) == 1 || keyStates[13] == true) {
        var anim = typingAnimationInstances[elementId];
        if (typingAnimationInstances[elementId].i < anim.txt.length) {
            var c = anim.txt.charAt(typingAnimationInstances[elementId].i);
            var elem = document.getElementById(elementId);
            elem.textContent += c;
            var text = elem.textContent || elem.innerText || "";
            document.getElementById(elementId).setAttribute('data-text',text);
            typingAnimationInstances[elementId].i++;
        } else {
            if (typeof(anim.callback) !== 'undefined')
                anim.callback();
            delete typingAnimationInstances[elementId];
            return;
        }
    }
    delay = (c == ' ' ? anim.speed / 4 : anim.speed);
    setTimeout(typingAnimation, delay, elementId);
}
