const body = document.querySelector("body");
const IMG_NUMBER = 5;

function paintImage(imgNumber){
     const image = new Image(); 
     image.src = `images/${imgNumber+1}.jpg`;
     image.classList.add("bgImage");
     //body.appendChild(image); 
     body.prepend(image);
}

function genRandom(){ // generate random
    const number = Math.floor(Math.random()*IMG_NUMBER); // 0 ~ (IMG_NUMBER-1) 랜덤 정수 
    return number;

} 

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
