// // 이미 선언된 내장객채들이 있다
// console.log(Array.prototype);
// console.dir(Array.prototype);
// // 문자열이 가지고 있는 프로퍼티 ((사용할수 있는것만))
// console.dir(String.prototype);

// // 없을경우 -> object.prototype 까지 찾아가서 거슬러 올라간다
// console.dir(Object.prototype);

// // 다 없으면 undefined
// // --> 내가 객체를 생성하고 프로토타입을 만들고 쓸수 있습 -> 그러나 결국은 object까지 거슬러 올라감 이를 프로토타입 체이닝이라고 한다.


// var foo ={
// 	name:'foo',
// 	age: 40
// };
// // toString프로퍼티를 찾겠다.-> object의 toString으로 나온다.
// console.log(foo.toString());
// console.dir(foo);



// while문

var a = 0;
while (a < 10) {
    if (a > 5) { break; }
    console.log(a);
    a++;
}
console.log('--------------------------------');

var a = 0;
while (a < 10) {
	// continue는 뒤의 구문까지 다 무시해버림!!!!
	a++;
    if (a == 3 || a == 6) { 
    	continue; 
    }
    console.log(a);
}




				// // index 개념을 설명하기 위한 예제
				// $(function() {
				//     var target = $('.exam_wrap').eq(0),
				//         targetBtn = target.find('button'),
				//         targetWrap = target.find('.exam_q ul'),
				//         targetList = targetWrap.children(),
				//         targetIndex = 0,
				//         var oldIndex;
				//     // &&&&&&&& -- 일때 targetIndex = targetList-1;

				//     console.log(targetBtn.length); //--> 확인시 정확하게 찾을수 있음
				//     console.log(targetList);



				//     //Q 1,2
				//     var onclickFunc = function() {
				//         // console.log(1);
				//         // &&&&&&&& -- 일때 if (targetIndex <= 0) {
				//         if (targetIndex >= targetList.length) {
				//             //  계속 색칠되는걸 막음
				//             return //return = false 랑 같음 
				//         }
				//         console.log(targetIndex);
				//         // -> 한줄로 쓰면 바이트 수를 줄릴수 있다.
				//         targetList.eq(oldIndex).css('background', '');
				//         targetList.eq(targetIndex).css('background', 'yellow');

				//         // &&&&&&&& 이전걸 지우고 싶을떄 
				//         // targetList.eq(targetIndex).css('background', 'yellow').siblings().css('background','');
				//         // 이렇게도 할수 있고 인덱스를 예전값으로 저장하는방법도 있음 

				//         // **저장하는건 해보기



				//         // &&&&&&&& -- 일때 targetIndex--;
				//         targetIndex++;
				//         //  &&&&&&&& 이전걸 지우고 싶을떄 oldIndex = targetIndex;

				//     };

				//     //Q 3,4
				//     var nextFunc = function() {
				//         // body...
				//     }
				//     var prevFunc = function() {
				//         // body...
				//     }

				//     // 버튼실행은 잡아서 target.on('click', Func);



				//     target.on('click', onclickFunc);
				// });


				// // for문 과제    --> append 버그가 있음 알아보기
				// // 크롬에서 생성햇을때 열고닫고를 따로 넣으면 자동으로 닫아줘버림... 한줄로 나열하며 상관없지만
				// // 여러줄로 나눠서 append 할경우 문제가 생길수 있음!


				// $(function() {
				//     // var exam1 = $('.exam_q').eq(0);
				//     // exam1.append('<input type="chekcbox"/>');

				//     var target = $('.exam_q').eq(0),
				//         targetArea = target.find('.exam_q'),
				//         a = 0;



				//     // Q1
				//     while (a < 5) {
				//         targetArea.append('<input type="chekcbox"/>');
				//         a++;
				//     }

				//     // Q2
				//     for (var i = 0; i < 5; i++) {
				//         // 0 부터 시작해서 -> 나누기 했을때 0,1,0,1,0으로 찍힌다  

				//         if (i % 2 == 0) {
				//             targetArea.append('<input type="chekcbox"/><br/>');
				//         } else {
				//             targetArea.append('<input type="text"/><br/>');
				//         }
				//     }


				//     // Q3
				//     for (var i = 1; i < 10; i++) {
				//         targetArea.append('8 X ' + i + ' = ' + (8 * i) + '<br/>');
				//     }


				//     // Q4 - 한달을 돌떄 아홉번의 루프가 추가적으로 돌아야람.
				//     var targetArray = [];

				//     for (var i = 2; i < 10; i++) {
				//         // 배열을 사용해 prototype중 하나를 사용해 보자.
				//         targetArray.push(i + '단');
				//         targetArray.push('<ul>');
				//         for (var j = 1; j < 10; j++) {
				//             targetArray.push('<li>');
				//             targetArea.push(i + 'X ' + j + ' = ' + (i * J));

				//             targetArray.push('</li>');
				//         }
				//         targetArray.push('</ul>');
				//     }

				//     targetArea.get(0).innerHTML = targetArray.join('');
				//     // get -> 태그 돔 형태로 바꿔주는 역활을 하므로 써준다.
				//     // join -> 콤마를 지우거나 바꿔주기 위해서 




				//     // append는 돌때마다 돌고 targetArea.get(0).innerHTML = targetArray.join(''); --> 얘는 마지막에 한번에 성능에 효율적**
				// });




