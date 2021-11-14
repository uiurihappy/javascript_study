const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'; // LS: Local Storage

let toDos = []; // 할 일 목록을 array로 만들자

// function filterFn(toDo){
//     // return todo.id !== li.id 해야하는데, todo.id는 number고 li.id는 string임 ==> li.id를 number로 변경해야.
//     return todo.id !== parseInt(li.id);
// }

function deleteToDo(event){
    // console.dir(event.target);
    // console.log(event.target.parentNode); 
    // event target인 button의 id를 알기 위해서 (어떤 버튼인지 알아야 삭제하니까) parentNode 썼음 
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); // HTML만 지운거임 

    //const cleanToDos = toDos.filter(filterFn); // cleanToDos는 toDos에서 filterFN이 true인 애들만 담는 변수 
    // filter 메소드는 말 그대로 '거르는' 역할. 여기서는 filterFN 함수를 실행 시 true인 아이템들만 가지고 새로운 array를 만든다.
    // 즉, filter 메소드는 array의 모든 아이템에 함수를 실행하고 실행결과가 true인 아이템들만 가지고 새로운 array를 만든다. 
    // filterFn을 밖에 따로 정의하지 않고, 아래와 같이 fileter 안에 이름 없이 사용했음 

    const cleanToDos = toDos.filter(function(toDo){
        // return todo.id !== li.id 해야하는데, todo.id는 number고 li.id는 string임 ==> li.id를 number로 변경해야.
        return toDo.id !== parseInt(li.id);
    });
    
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){ // 저장한다. 
    // localStorage.setItem(TODOS_LS, toDos);  // <== (X)!!
    // - 현상: 위와 같이 하면 key:toDos, value: [object Object], [object Object]... 이런식으로 저장됨 
    // - 원인: localStorage에는 오직 String만 저장 가능. 
    // - 해결: 그러므로, object가 string이 되도록 만들어야. ==> JSON.stringify 사용할 것임.
    //   (JSON.stringify는 js object를 string으로 바꿔준다.)
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  
    // - [참고] 형식: localStorage.setItem(key, value)
}

function paintToDo(userInputText){ // 유저가 입력한 투두리스트를 화면에 출력한다. 
    //console.log(text);
    // li, delBtn, span 생성 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    // 만들어진 li, delBtn, span을 toDoList에 추가한다.
    toDoList.appendChild(li); 
    li.appendChild(delBtn);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    // 추가된 li의 id값 지정, 추가된 span의 innerText 지정 
    li.id=newId;
    span.innerText = userInputText;  

    // toDo obj 를  toDos에 데이터 집어넣음 
    const toDoObj = {
        text: userInputText, 
        id: newId
    };
    toDos.push(toDoObj);
    
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; // input에 값 입력 후 엔터치면 입력한 값 사라지게
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){ //이미 local storage에 만들어진 todo가 있으면 해줘야 할 처리
        //console.log(loadedToDos); // loadedToDOs를 불러올 수 있음을 확인. 하지만 데이터형이 string임 
        // ==> JSON 사용해서 string을 object로 변경. 
        const parsedToDos = JSON.parse(loadedToDos);
        //console.log(parsedToDos); //object로 잘 변경되었음을 확인. ==> 얘네를 화면에 보여줘야 
        parsedToDos.forEach(function(toDo){  //array의 forEach : array에 담겨있는 객체 각각에 대해 한 번씩 함수를 실행시켜줌. 
            //console.log(toDo.text); //loadedToDo의 text들 콘솔에 찍어서 잘 나오는지 확인
            paintToDo(toDo.text); // 기존에 생성되어 있던 todo들을 그려줌 
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();