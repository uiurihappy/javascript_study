const form = document.querySelector(".js-form"),  //querySelector: 첫번째 걸 가져옴. 
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser", // LS: Local Storage
      SHOWING_CS = "showing"; // show class name

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    // 원래는 input에 입력하고 엔터 치면 (값은 프로그래밍된 목적지로 보내지고) 자동으로 페이지가 refresh됨 
    // preventDefault하면 input에 값 넣고 엔터 쳐도 refresh되지 않음. 값도 input 창에 그대로 남아있음. 
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CS);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CS);
    greeting.classList.add(SHOWING_CS);
    greeting.innerText = `Hello, ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();