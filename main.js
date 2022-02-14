RwY="";
LwY="";
RwX="";
LwX="";
Speed=0;
Volume=0;
Lws="";
Rws="";
s1t="false";
s2t="false";
function preload() {
    song1=loadSound("HPT.mp3");
    song2=loadSound("POCT.mp3");

}
function setup() {
    canvas=createCanvas(500,350)
    video = createCapture(VIDEO);
    canvas.position(400,250);
    video.size(500,350);
    video.hide()
    poseNat=ml5.poseNet(video,modelLoaded);
    poseNat.on('pose',gotResults);
}
function draw() {
    image(video,0,0,500,350);
    fill("red");
    stroke("red");
    circle(RwX,RwY,10);
    circle(LwX,LwY,10);
    if (Lws>0.2 && s1t=="false") {
        play1()
    }
    if (Rws>0.2  && s2t=="false") {
        play2()
    }
    
    //music.setVolume(Volume)
}
function modelLoaded() {
    console.log("dots on your face have been loaded");
}
function gotResults(results) {
    if (results.length>0) {
        console.log(results)
        RwY=results[0].pose.rightWrist.y;
        RwX=results[0].pose.rightWrist.x;
        LwY=results[0].pose.leftWrist.y;
        LwX=results[0].pose.leftWrist.x;
        Lws=results[0].pose.keypoints[9].score;
        Rws=results[0].pose.keypoints[10].score;
    }
}
function play1(){
	song1.play();
    song2.stop();
    s1t="true";
    s2t="false";
}
function play2(){
	song2.play();
    song1.stop();
    s1t="false";
    s2t="true";
}