var files;

window.onload = function() {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

      var filesInput = document.getElementById("files");

      filesInput.addEventListener("change", function(event) {

        files = event.target.files; //FileList object
        var output = document.getElementById("result");

        for (var i = 0; i < files.length; i++) {

          var file = files[i];

          //Only pics
          if (!file.type.match('image'))
            continue;

          var picReader = new FileReader();

          picReader.addEventListener("load", function(event) {

              if (document.getElementById("preview").checked == true) {
                var picFile = event.target;
                var div = document.createElement("div");
                div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";
                output.insertBefore(div, null);
              }
            
          });
          //Read the image
          picReader.readAsDataURL(file);
        }
      });


      



    } else {
      console.log("Your browser does not support File API");
    }
  }

function submitForm() {
    window.alert(files);
    for (var i = 0; i < files.length; i++) {
        var img = new Image();
        img.crossOrigin='anonymous';
        img.src=files[i];
        resizeImg(img,0.50);
        resizeImg(img,2);
    }
}

function resizeImg(img,scaleFactor){
    var c=document.createElement('canvas');
    var ctx=c.getContext('2d');
    var iw=img.width;
    var ih=img.height;
    c.width=iw*scaleFactor;
    c.height=ih*scaleFactor;
    ctx.drawImage(img,0,0,iw*scaleFactor,ih*scaleFactor);
    var scaledImg=new Image();
    scaledImg.onload=function(){
        // scaledImg is a scaled imageObject for upload/download
        // For testing, just append it to the DOM
        document.body.appendChild(scaledImg);
    }
    scaledImg.src=c.toDataURL();
}
