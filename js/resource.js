function resourceExists(url){

    var http = new XMLHttpRequest();

    http.open('HEAD', url, false);
    http.send();

    var code = http.status;
    console.info(code);
    return code / 100 == 2;
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }