const weather = document.querySelector(".js-weather");
const API_KEY = "af480241754c46d08bcbef34bfd0c47d";
const COORDS = "coords";

function getWeather(lat,lng){ //latitude, longitutde
    // API 호출 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ 
        //console.log(response.json());
        return response.json();
    }).then(function(json){
        //console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        // weather 변수에 뿌려라 
        weather.innerText=`${temperature}°C @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); 
    // localStorage에는 오직 String만 저장 가능 ==> JSON.stringify로 ojbect를 string으로 변환해서 저장
}

function handleGeoSuccess(position){
    // console.log(position); 위치정보 받아지는지 확인
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //latitude: latitude 라고 적는 것과 동일
        longitude //longitude: longitude 라고 적는 것과 동일
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Cannot access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){ // coords: coordinate. 좌표. 
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){ 
        askForCoords();
    }else{
        //getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();