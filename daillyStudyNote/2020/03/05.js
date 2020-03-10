let vscope = 'global'; // 전역 변수 선언 = 앱 내에서 가장 바깥 테두리
function fscope(){
	alert(vscope);
}
fscope(); // 전역변수인 vscope 'global' 호출

function fscope2(){
	let vscope = 'local';
	alert(vscope);
}
fscope2(); // 지역변수인 vscope 'local' 호출

function fscope3(){
	vscope = 'local';
	alert(vscope);
}
fscope3(); // 변경된 전역변수인 vscope 'local' 호출 = vscope 로 찍어봐도 마찬가지


function a(){
	i = 0;
}
for(var i = 0; i<5; i++){ // 현재 a 라는 함수에서 i 변수를 전역 할당했기 때문에 for문 안의 i 값이 전역변수가 되고 함수  a는 그 값을 0 으로 유지시키고 있다. for 문 안에서 계속 i 값을 증가시켜도 a 함수를 거치면 0 으로 초기화 되면서 무한루프 발생 
	a();
	document.write(i);
}


// 전역변수를 하나도 허용하고 싶지 않은 경우 익명함수를 사용해서 모든 변수 관련 내용을 감싸준다 (로직을 모듈화 하는 일반적 방법)

(function(){
	var test = ...
}());


//js 에서는 오로지 함수에 대한 유효 범위만을 제공한다. for, if, else, while 등과 같은 조건 반복문에서는 그 유효 범위가 통하지 않는다. 즉  for문 안에서 변수를 선언한다고 해서 지역 변수가 되지 않는 다는 뜻이다. 이를 static scoping 혹은 lexical scoping 이라고 한다.


var i = 5;
function a(){
	var i = 10;
	b();
}
function b(){
	document.write(i); // b 함수가 정의되는 시점에 유효 범위가 결정된다 = lexical, static scoping
}
a(); // 결과는 전역변수 i = 5를 호출한다.