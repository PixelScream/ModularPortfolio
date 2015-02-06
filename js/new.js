var content;
var contentWrapper = document.getElementById('content');
var renders = [];
function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}


function PrintPage(){
  return content.art.map(getPageItem)
    .reduce(function(sequence, boardPromise) {
      // Use reduce to chain the promises together,
      // adding content to the page for each chapter
      return sequence.then(function() {
        // Wait for everything in the sequence so far,
        // then wait for this chapter to arrive.
        return boardPromise;
      }).then(function(newBoard) {
        contentWrapper.innerHTML += newBoard;
      });
    }, Promise.resolve());
}
/*//////////////

///// Main

//////////////*/
get('website.content').then(function(response) {
  console.log("Success!");
  content = JSON.parse(response);

}).catch( function(error) {
  console.error("Failed!", error);

}).then(function() {
  return PrintPage();

}).then(function() {
  return getPageInfo();

}).then(function(newBoard) {
  contentWrapper.innerHTML += newBoard;

}).then(function() {
  LoadProNav();

}).then(function() {
  document.getElementById('preload').style.display = 'none';
  //FadeOut(document.getElementById('preload'));
  //TweenLite.To(document.getElementById('preload'), 1, {css:{opacity: "0"}});
}).then(function() {
  LoadLightBox();
});

function getPageItem(r) {
  return new Promise(function(resolve, reject) {
    var img = new Image()
    img.src = r.url;
    renders.push(img);
    img.onload = function(){
      var pageContent = '<div class="render-holder">'
                + '<a href="' + r.url + '" target="_blank" class="render" >'
                + '<img src="' + img.src + '" class="render-img" >'
                + '</a>'
                + "<h1>" + r.title + "</h1>"
                + '<p>' + r.description + '</p>'
                + '</div>';
        resolve( pageContent);
    }

    if(img.error)
      reject(Error(img.error));
  });
}

function getImg(url) {
  return new Promise(function(resolve, reject) {
    var img = new Image()
    img.src = url;
    renders.push(img);
    if(img.complete){
      resolve(img);
    }
  });
}

function getPageInfo() {
  var pageContent = '<div class="render-holder">'
                + '<img class="dp" src="' + content.info.picture + '" />'
                + '<h1>Info</h1> <div id="social-holder">';

  for(i=0; i< content.info.medilinks.length; i++) {
    pageContent += '<a href="' + content.info.medilinks[i].url + '" target="_blank"  >'
                + '<i class="fa fa-' + content.info.medilinks[i].site + '"></i>'
                + '</a>';
  }
  pageContent += '</div> </div>';
  return pageContent;
}

function LoadProNav() {
  var newStyle = "<style>";
  var proNav = document.getElementById("pronav");
  var contentChildren = document.getElementById("content").children;

  for (var i = 0; i < contentChildren.length; i++) {
    var tooltip = contentChildren[i].getElementsByTagName('h1')[0].textContent;
    var icon = "<i class=\"fa fa-menu-o pro-i " + i + "\" title=\"" + tooltip + "\"></i>";
    proNav.innerHTML += icon;
    newStyle += "\n." + i + ":after { content: \"" + tooltip + "\"\; \}";
  }
  newStyle += "</style>";
  document.getElementsByTagName('head')[0].innerHTML += newStyle;

  var proNavChildren = proNav.children;

  for (var i = 0; i < proNavChildren.length; i++) {
    var r = proNavChildren[i]
    proNavChildren[i].onclick = function () {
      var v = this.className;
      v = parseInt(v.charAt(v.length - 1));
      var newY = contentChildren[v].offsetTop;
      ScrollX(newY);
      for(b = 0; b < proNavChildren.length; b++) {
        proNavChildren[b].classList.remove('current');
      }
      this.classList.add('current');
    }
  }

}

function LoadLightBox(){

}

function ScrollX (x) {
  TweenLite.to(window, 2, {scrollTo:{y:(x - 100)}, ease:Power2.easeOut});
}



function FadeIn (el) {
  el.style.display = "";
  TweenLite.to(el, 1, {css:{opacity:1}, ease:Power2.easeOut});
}

function FadeOut (el) {
  TweenLite.to(el, 1, {css:{opacity:0}, ease:Power2.easeOut, onComplete:el.style.display = "none"});
}
