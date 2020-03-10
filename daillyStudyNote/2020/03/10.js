// 함수도 일종의 값이다. (= 함수도 객체다.)
function a(){} // a라는 변수에 담긴 함수 
var a = function(){}

a = { // 객체 A
	b : function(){ // b = 변수, key, property, 속성값  // function = value, method, 메소드

	}
}
// 메소드 = 객체 안에 정의 된 함수 
// 함수는 값이기 때문에 다른 함수의 인자로 전달 될수도 있다.
// 함수는 리턴 값으로도, 배열의 값으로도 사용될 수 있다.
// 객체는 다양한 용도로 사용될 수 있는 형태의 데이터 first-class citizen, first-class object 로 불린다.
// 이러한 속성을 활용하여 콜백 함수 처리를 한다.
var numbers = [20, 10, 9, 6, 2, 1];
numbers.sort(); // numbers : 객체 , sort : 메소드 (내장 객체, 내장 메소드) 
// 이대로 실행하면 문자 우선 순위로 10이 2보다 더 작은 값으로 출력이 된다. (문자 기준으로 우선순위를 default (= 유니코드 기준) 로 적용하기 때문)
// sort 의 parameter로 원하는 우선순위를 함수로 넘겨줘야 원하는 sorting 결과를 받을 수 있다.
// 자바스크립트의 특징을 이용하여

var numbers = [20, 10, 9, 6, 2, 1];
var sortfunc = function(a, b){ // function의 결과가 0보다 작은 경우 a를 b보다 낮은 인덱스로 정렬 
	if(a>b){
		return 1; // a 가 b 보다다 큰 인덱스로 정렬(즉, 값이 클 수록 배열에서 인덱스 값도 커진다. = 뒤로간다.)
	}
	else if(a<b){
		return -1;
	}
	else{
		return 0;
	}
}
numbers.sort(sortfunc);
// 이 원리를 활용하여 위의 함수를 아래와 같이 변형 가능
var numbers = [20, 10, 9, 6, 2, 1];
var sortfunc = function(a, b){ // function의 결과가 0보다 작은 경우 a를 b보다 낮은 인덱스로 정렬 
	return a-b; // 오름차순 정렬 // 내림차순을 하고 싶을 경우 return b-a;
}
numbers.sort(sortfunc);

// 이때 사용된 sortfunc 함수를 callback 함수라고 부른다. 값으로서 함수가 사용될 수 있기에 가능하다. (비동기 처리에서 유용하게 쓰인다.)
// 만약 어떤 사이트에서 글을 작성할 경우 이메일을 발송하는 서비스가 순차적으로 일어날 경우 이를 동기적이라고 한다.(글작성 -> 이메일 발송 -> 작성완료)
// 비동기 처리란 : 지금 처리할수는 없지만 나중에 처리해야하는 일을 따로 떼어서 처리하는 방식
// js 에서는 비동기 처리를 Ajax를 통해 할 수 있다. (Asynchronous javascript and xml)
// Ajax 를 활용하여 비동기 적으로 페이지를 리로드 하지 않아도 서버와 통신하여 필요한 데이터를 주고받을 수 있다.
// jquery get 함수를 이용하면 아래와 같이 ajax 통신을 할 수 있다.
$.get(
	'url', // data의 url (api url)
	function(parameter){ // data를 통해 실행할 함수 (data는 이 함수의 parameter로 들어간다.)
	},
	'json' // data의 형식
);


function outter(){ // 외부함수
	var title = 'coding everybody';// 외부함수의 변수
	function inner(){ // 내부함수
		altert(title); // 내부함수에서 외부함수의 변수에 접근 = 이를 클로저(closure)라 부른다.
	}
}


function outter(){ // 외부함수
	var title = 'coding everybody';
	return fucntion(){ // 내부함수를 return
		alert(title);
	}// outter는 return을 함으로써 생명을 다했음에도 inner 에서는 outter의 변수(외부함수의 변수)에 접근할 수 있다.
}
inner = outter(); 
inner(); // 내부함수에서는 외부함수가 생명을 다했음에도 외부함수의 변수에 접근할 수 있다. 이것이 클로저의 중요한 특징 중 하나.


function factory_movie(title){// 외부함수, 인자 title 은 함수 내에서 지역변수로  사용되므로 내부함수에서 사용가능
	return {
		get_title : fucntion(){// 내부함수
			return title;
		},
		set_title : fucntion(_title){// 내부함수
			title = _title;
		}
	}
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('matrix');
// 각자 객체가 생성된 시점에 해당하는 parameter가 지역변수로서 저장이되고 각 객체별로 다른 값을 가진다.
// factory_movie를 통해 객체를 생성할 당시 return을 하면서 factory_movie(외부함수)의 생명은 끝이 난다. 
// parameter 로 사용되는 지역변수 title은 get_title, set_title을 통해서만 변경이 가능하다. 따라서 title은 외부에서 private한 변수라고 할 수 있다.
// title이라는 변수를 외부의 누구도 수정할 수 없다. 수정시에도 조건 컨트롤이 가능하다.
// 따라서 클로저는 javascript 에서 private변수를 사용할 수 있도록 도와주는 아주 중요하고 좋은 도구이다.


var arr = [];
for(var i = 0; i<5; i++){
	arr[i] = function(){
		return i;
	}
}
for(var index in arr){
	console.log(arr[index]());
}

//오류 수정
var arr = [];
for(var i = 0; i<5; i++){
	arr[i] = function(id){
		return function(){
			return id; // 내부함수가 외부함수의 인자를 지역변수로 사용
		}
	}(i);// 인자값으로 i를 넘겨주기 때문에 이 값은 외부함수의 parameter 즉 함수 내의 지역변수로 저장이되고 내부함수에서 호출을 하면서 return 후에도 참조가 되는 값이된다.
	// 따라서 수정 전의 코드에서는 for문이 끝난 후의 i 값 5가 연달아 출력되는 반면 바로 위의 코드에서는 각 index에 해당하는 값이 각각 클로저로 저장되면서 0~4의 값이 순차대로 출력될 수 있다.
}
for(var index in arr){
	console.log(arr[index]());
}