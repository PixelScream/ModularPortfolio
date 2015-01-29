var content;

var xmlhttp = new XMLHttpRequest();
var url = "website.content";

xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var myArr = JSON.parse(xmlhttp.responseText);
      content = myArr;
      myFunction();
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction() {
  console.log(content);
  console.log(content.art.length);

  var pageContent = "";
  for(i = 0; i < content.art.length; i++) {
    console.log(content.art[i]['render']);
    pageContent += '<div class="render-holder">'
    pageContent += "<h1>" + content.art[i]['title'] + "</h1>";
    pageContent += '<img src="' + content.art[i]['url'] + '">';
    pageContent += '<p>' + content.art[i]['description'] + '</p>';
    pageContent += '</div>'
  }

  document.getElementById("greeting").innerHTML += pageContent;
}

