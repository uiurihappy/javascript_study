
// 문서 객체 접근
var boy = document.getElementById('boy');  //OK 
//var boy = document.getElementsByTagName("figure")[0]; //OK
//var boy = document.getElementsByClassName('boy'); // Error. 
//getElementsByClassName 쓰면 script.js:42 Uncaught TypeError: boy.addEventListener is not a function 에러 발생 
//boy가 한 개가 아니라서 그런듯. 

// 옛날에 많이 사용되던 이벤트 모델 (on이 들어감)
// window.onkeydown = function(){};

// 요즘에 많이 쓰이는 이벤트 모델
window.addEventListener("keydown", function(e){
  // keydown써야함 (keypress는 화살표 탐지 불가)
  //console.log(e.type,'=',e.keyCode,'|',e.code,'|',e.key);
  switch(e.keyCode){
    case 38:
    case 32:
  		//console.log('jump');
      jump();
	  break;
    case 37:
  		//console.log('left move');
      moveLeft();
  	break;
    case 39:
  		//console.log('right move');
      moveRight();
  }
});


//boy.addEventListener('animationend',stand);

  // for (i = 0; i < boy.length; i++) {
  //   boy[i].addEventListener("animationend", stand);
  // }

  // if(boy){
  //}


boy.addEventListener('animationend', stand);

function stand() {
  console.log('finish animation');
  boy.classList.remove('jump');
}

function jump() {
  boy.classList.add('jump');
}

function getDistanceX() {
  return window.parseInt(boy.style.transform.replace('translateX(', ''), 10) || 0;
  // 1) boy.style.transform || 0;
  // 처음 boy.style.transform 하면 null ==> 거짓
  // ||: 앞의 값이 거짓이면 뒤의 값 반환 ==> 0을 초기값으로 줬다. 
  // 2) boy.style.transform.replace('translateX(','')
  // -30px 만 가져오려고 앞의 문자 잘랐음 
};

function moveLeft() {
  console.log(disX);
  var disX = getDistanceX() - 30;  // disX-=30; 과 같은 표현 
  boy.style.transform = 'translateX(' + disX + 'px) rotateY(180deg)';
}
function moveRight() {
  console.log(disX);
  var disX = getDistanceX() + 30;  // disX+=30; 과 같은 표현 
  boy.style.transform = 'translateX(' + disX + 'px) rotateY(0deg)';

}

  


// -----------------------------------------------------------------------------------------
// 키보드 이벤트 핸들링 (Keyboard Event Handling)
//
// - 이벤트 속성: keydown, keypress, keyup / input(HTML5)
// - 이벤트 객체 (Event Object)
//
// 이벤트 발생 순서
// keydown ➔ keypress ➔ keyup
//
// 키가 처음 눌려지면 keydown 이벤트가 발생합니다.
// (영문, 숫자, space, enter, 한글, tab, caps lock, shift, ctrl, alt(option), command, arrow, F1~12)
//
// keydown 이벤트 이후, keypress 이벤트가 발생합니다.
// (영문, 숫자, space, enter)
//
// 키를 놓으면 keyup 이벤트가 발생합니다.
// (tab, caps lock 발생 X)
//
// 인터랙션 테스트: https://codepen.io/yamoo9/full/vRmeQZ/
//
//
// 화살표 키 up을 누르면, boy 캐릭터가 점프해야 합니다.
// 점프 후에는 다시 서 있는 boy 캐릭터로 변경되어야 합니다.
// 화살표 키 left, right를 누르면 boy 캐릭터가 누른 방향으로 이동합니다.
//
// arrow-top   = 점프 / space
// arrow-left  = 왼쪽을 보며 이동
// arrow-right = 오른쪽을 보며 이동
//
// ------------------------------------------------------------------------------------------