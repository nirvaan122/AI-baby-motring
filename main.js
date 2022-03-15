objects=[]
img="";
status="";
function preload(){
img=loadImage("boss_baby_main.webp")
}
function setup(){
canvas=createCanvas(600,400)
canvas.center()
}
function modelLoaded(){
    console.log("cocossd is loaded")
    status=true
    objectd.detect(img,gotResult)
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
document.getElementById("status").innerHTML="status:detecting objects";
object_name=document.getElementById("object_name").value;
}
function gotResult(error,results){
    if (error) {
     console.log(error)
    } else {
       console.log(results) 
       objects=results
    }
}
function draw(){
    image(img,0,0,600,400)
    if (status!="") {
        objectDetector.detect(video,gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status:objects detected";
            fill("black")
            strokeWeight(1)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("black");
            strokeWeight(5)
            rect(objects[i].x,objects[i].y-100,objects[i].width-700,objects[i].height-40)
            
        if(objects[i].label==object_name){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML=object_name+"found";
        }
        else{
            document.getElementById("object_status").innerHTML=object_name+"not found";  
        }
        }   
        }
    
    
}