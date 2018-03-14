siteString = "abantrubunotexitewndamchipndorbandqr";

function randomString() {
  var start = Math.floor(Math.random()*(siteString.length - 3));
  return siteString.slice(start, start+3)
}


function fetchWebsite() {
  return fetch('http://'+randomString()+'.com/')
  // return fetch('http://facebook.com/')
    .then(response => response.text());
}

document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')


  fetchWebsite().then(text => {
    // cleanText = text.replace(/[^\x00-\x7F]/g, "");
    cleanText = text;
    var hexColors = [];
    for (i=0; i < cleanText.length - 3; i += 3) {
        if (parseInt(cleanText.slice(i, i+3), 16)) {
          const threeDigits = (cleanText.slice(i, i+3));
          var hexStr = '';
          ///each digit --> 2 digit hex code --> 3 codes --> multiply value by two
          for (var j=0; j<3; j++) {
            var hexCodec = (threeDigits.charCodeAt(j) * 2).toString(16);
            while (hexCodec.length < 2) {hexCodec = "0" + hexCodec}
            hexStr += hexCodec;
          }
          hexColors.push(hexStr);
        }

      }

      var pixelHeight = window.innerHeight;
      var pixelWidth = window.innerWidth;
      canvas.height = pixelHeight;
      canvas.width = pixelWidth;
      var dimension = Math.floor(Math.sqrt(hexColors.length));
      var unitHeight = pixelHeight / dimension;
      var unitWidth = pixelWidth / dimension;

      for (i=0; i<dimension; i++) {
        for (j=0; j<dimension; j++) {
          ctx.fillStyle = "#"+hexColors[i*dimension + j];
          ctx.fillRect(unitWidth*i, unitHeight*j, unitWidth, unitHeight)

        }
      }
    })

});
