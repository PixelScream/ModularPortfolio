/*
function LightboxHandler(imgs) {
  console.log(imgs)
  for(i = 0; i < imgs.length; i++) {
    imgs[i].styles.maxHeight = (window.innerHeight * 0.8) +"px";
  }

  var scrolls = 0;
  var canScroll = true;
  var destination = 0;
  var closeEnough = 10;
  function MouseWheelHandler(e) {
    var e = window.event || e;
    if( destination + closeEnough > parseInt(lightBox.style.marginTop) &&
        destination - closeEnough < parseInt(lightBox.style.marginTop)) {

    	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  //  	scrolls += delta;
    	if(delta > 0 && scrolls > 0) {
    	  scrolls -= 1;
    	}
    	else if(delta < 0 && scrolls < imgs.length) {
    	  scrolls += 1;
    	}

    	console.log(scrolls);
    	destination = -(scrolls * 400);
    }


    TweenLite.to(lightBox, 0.5, {css:{marginTop: destination + "px"}});
      //lightBox.style.marginTop = (-(scrolls * 10) + "px");
      e.preventDefault();
    	return false;

  }
  var lightBox = document.getElementById('lightbox');
  document.addEventListener("mousewheel", MouseWheelHandler, false);
}

*/