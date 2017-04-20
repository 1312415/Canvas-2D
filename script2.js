var video = document.getElementById("video");
var canvas = document.getElementById("myCanvas2");
var context = canvas.getContext('2d');
var i;
function Gauss(){

}
var Blur = function (data, cw, ch, x) {
    var sum = 4*data[(cw+ch*400)*4+x] + 2*data[(cw+1+ch*400)*4+x] + 2*data[(cw+(ch+1)*400)*4+x] + 2*data[(cw-1+ch*400)*4+x] + 2*data[(cw+(ch-1)*400)*4+x] + data[(cw+1+(ch+1)*400)*4+x]+ data[(cw-1+(ch-1)*400)*4+x] + data[(cw+1+(ch-1)*400)*4+x] + data[(cw-1+(ch+1)*400)*4+x];
    return sum/16
};
video.addEventListener('play', function () {
    i = window.setInterval(function () {
        context.drawImage(video, 0, 0, 400, 230);

        var imageData = context.getImageData(0,0,400,230);
        var data = imageData.data;
        var datafix = new Array(368000);
        for(var i = 1; i < 229; i++) {
            for(var j = 1; j < 399; j++){
                datafix[(i*400+j)*4]= (Blur(data,j,i,0));
                datafix[(i*400+j)*4+1]= (Blur(data,j,i,1));
                datafix[(i*400+j)*4+2]= (Blur(data,j,i,2));
                datafix[(i*400+j)*4+3] = (data[(i*400+j)*4+3]);
            }
        }
        for(var i = 0;i<368000;i++){
            data[i] = datafix[i];
        }
        context.putImageData(imageData,0,0);
    }, 20);
}, false);
video.addEventListener('pause', function () {
    window.clearInterval(i);
}, false);
video.addEventListener('ended', function () {
    window.clearInterval(i);
}, false);
