var scrollTopOffset = 100;
var content;

var lbImages;

var xmlhttp = new XMLHttpRequest();
var url = "website.content";

//var blankGif = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAADklEQVR42mNQVFT8D8IACeECxXMu4JUAAAAASUVORK5CYII=" class="render-img">';


xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var myArr = JSON.parse(xmlhttp.responseText);
      content = myArr;
      LoadContent();
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

function LoadContent() {

  var pageContent = "";
  var lbImages = "";

  var renders = [];

  // Renders
  for(i = 0; i < content.art.length; i++) {
    pageContent += '<div class="render-holder">'
                + '<a href="' + content.art[i].url + '" target="_blank" class="render" >'
                + '<img src="img/placeholder.png" class="render-img" >'
                + '</a>'
                + "<h1>" + content.art[i].title + "</h1>"
                + '<p>' + content.art[i].description + '</p>'
                + '</div>';
    renders[i] = new Image();
    renders[i].src = content.art[i].url;

    lbImages += '<img src="' + content.art[i].url + '" />';
  }
    renders.onload = function () {
    console.log(renders);
  }

  //document.getElementById('lightbox').innerHTML += lbImages;

  // Social Media
  pageContent += '<div class="render-holder">'
              + '<h1>Info</h1> <div id="social-holder">';
  for(i=0; i< content.info.length; i++) {
    pageContent += '<a href="' + content.info[i].url + '" target="_blank"  >'
                + '<i class="fa fa-' + content.info[i].site + '"></i>'
                + '</a>';
  }
  pageContent += '</div> </div>';

  var contentDiv = document.getElementById("content");
  contentDiv.innerHTML = pageContent;
  document.getElementById('preload').classList.add('hide');

  //LightboxHandler( document.getElementById('lightbox').children);

  LoadProNav();
}


  /*

    Produral nav

  */
function LoadProNav() {
  var newStyle = "<style>";
  var contentChildren = document.getElementById("content").children;
  var proNav = document.getElementById("pronav");
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
      console.log(this);
      var v = this.className
      v = v.charAt(v.length - 1);
      v = parseInt(v);
      var newY = contentChildren[v].offsetTop;
      TweenLite.to(window, 2, {scrollTo:{y:(newY - scrollTopOffset)}, ease:Power2.easeOut});
      for(b = 0; b < proNavChildren.length; b++) {
        proNavChildren[b].classList.remove('current');
      }
      this.classList.add('current');
    }
  }

}


