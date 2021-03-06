
# 목록
**목록 click시 예제로 이동**
## Array.prototype
  - [Array.join() : 배열의 모든 요소를 연결해 하나의 문자열로 만든다.](#arrayjoin)
  - [Array.reverse() : 배열을 반전시키는 메서드.](#arrayreverse)
  - [Array.sort() : 배열의 요소를 적절한 위치에 정렬하고 배열을 반환한다.](#arraysort)
  - [Array.concat() : 이 메서드를 호출한 배열 뒤에 각 인수를 순서대로 붙인 새 배열을 만든다.](#arrayconcat)
  - [Array.slice() : 어떤 배열의 시작,끝을 지정해주면 (끝은 불포함) 새로운 배열로 반환한다. (원본 배열은 수정되지 않음)](#arrayslice)
  - [Array.splice() : 배열에 있는 요소를 삭제하고(하거나) 배열에 새 요소를 추가한다.](#arraysplice)
  - [Array.push() : 배열 끝에 값들을 추가 한다.](#arraypush)
  - [Array.pop() : 배열에서 마지막 요소를 제거하고 그 요소를 반환한다.](#arraypop)
  - [Array.shift() : 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환한다.](#arrayshift)
  - [Array.unshift() : 하나 또는 그 이상의 요소(element)를 배열(array)의 시작점에 추가하고 배열의 새 길이(length)를 반환한다.](#arrayunshift)
  - [Array.toString() : 지정된 배열 및 그 요소를 나타내는 문자열을 반환한다.](#arraytostring)
  - [Array.indexOf() : 배열에서 지정된 요소를 찾을 수있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환한다.](#arrayindexof)

## String.prototype
  - [String.replace() : 어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환한다.](#stringreplace)
  - [String.slice() : 문자열의 일부를 추출하면서 새로운 문자열을 반환한다.](#stringslice)
  - [String.split() : 문자열을 하위 문자열 배열로 분할하고 새 배열을 반환한다.](#stringsplit)
  - [String.search() : 정규표현식과 String객체 간의 일치에 대한 검색 index를 반환한다.](#stringsearch)
  - [String.match() : 문자열에서 정규 표현식과 일치하는 항목을 검색하고 일치 항목을 Array로 반환한다.](#stringmatch)
  - [String.trim() : 양쪽 끝에서 공백을 제거한 새로운 문자열을 반환한다.](#stringtrim)
  - [String.indexOf() : 문자열에 지정된 값이 처음 나타나는 위치를 반환한다.](#stringindexof)
  
## Object.prototype
  - [Object.hasOwnProperty() :  객체가 특정 프로퍼티를 가지고 있는지 boolean값을 반환한다.](#objhasownproperty)
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

----

<br/>
<br/>

# 사용법과 특징 및 예제

#### Array.join()
  :peach: arr.join([선택적 인자 값 = ',']);
  ```html
  <script>
  var a = ['바람', '비', '불'];
  var myVar1 = a.join();      // myVar1에 '바람,비,불'을 대입
  var myVar2 = a.join(', ');  // myVar2에 '바람, 비, 불'을 대입
  var myVar3 = a.join(' + '); // myVar3에 '바람 + 비 + 불'을 대입
  var myVar4 = a.join('');    // myVar4에 '바람비불'을 대입
  console.log(myVar1);
  </script>
  ```
    
#### Array.reverse()
  :peach: arr.reverse(); <br/>
  > **매개변수 없음.**
  ```html
  <script>
  var myArray = ['one', 'two', 'three'];
  myArray.reverse(); 

  console.log(myArray) // ['three', 'two', 'one']
  </script>
  ```
#### Array.sort()
  :peach: arr.sort(compareFunction); <br/>
  > **함수값을 지정할 수 있음.**
  ```html
  <script>
  var fruit = ['cherries', 'apples', 'bananas'];
  fruit.sort(); // ['apples', 'bananas', 'cherries']

  var scores = [1, 10, 21, 2]; 
  scores.sort(); // [1, 10, 2, 21]
  // 10이 2,
  // Unicode 코드 포인트 순서에서 '10'이 '2'앞에 오기 때문에.

  var things = ['word', 'Word', '1 Word', '2 Words'];
  things.sort(); // ['1 Word', '2 Words', 'Word', 'word']
  // 유니 코드에서 숫자는 대문자 앞에 온다.
  // 소문자 앞에 온다.
  </script>
  ```
#### Array.concat()  
  :peach: var new_array = old_array.concat(value1[, value2[, ...[, valueN]]]);
  ```html
  <script>
  // ***배열을 이어 붙일때
  var num1 = [1, 2, 3],
      num2 = [4, 5, 6],
      num3 = [7, 8, 9];

  var nums = num1.concat(num2, num3);

  console.log(nums); // 결과: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  // ***배열 '값' 을 이어 붙일때
  var alpha = ['a', 'b', 'c'];

  var alphaNumeric = alpha.concat(1, [2, 3]);

  console.log(alphaNumeric); 
  // 결과: ['a', 'b', 'c', 1, 2, 3]
  </script>
  ```  
#### Array.slice()  
  :peach: arr.slice(begin, end); <br/>
  > **begin생략시 처음부터, end생략시 length 끝까지**
  ```html
  <script>
  // 슬라이스를 사용하여 내 차에서 새 차를 만듭니다.
  var myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } };
  var myCar = [myHonda, 2, 'cherry condition', 'purchased 1997'];
  var newCar = myCar.slice(0, 2);

  // 내 자동차, 새 자동차 및 혼다의 색상 값을 표시합니다.
  // 두 배열에서 모두 참조됩니다.
  console.log('myCar = ' + myCar.toSource());     // myCar = [{color:'red', wheels:4, engine:{cylinders:4, size:2.2}}, 2, 'cherry condition', 'purchased 1997']
  console.log('newCar = ' + newCar.toSource());     // newCar = [{color:'red', wheels:4, engine:{cylinders:4, size:2.2}}, 2]
  console.log('myCar[0].color = ' + myCar[0].color);     // myCar[0].color = red 
  console.log('newCar[0].color = ' + newCar[0].color);     // newCar[0].color = red

  // myHonda의 색상을 변경합니다.
  myHonda.color = 'purple';
  console.log('The new color of my Honda is ' + myHonda.color);     // The new color of my Honda is purple

  // 두 배열에서 참조 된 myHonda의 색상을 표시합니다.
  console.log('myCar[0].color = ' + myCar[0].color);     // myCar[0].color = purple
  console.log('newCar[0].color = ' + newCar[0].color);     // newCar[0].color = purple
  </script>
  ```
#### Array.splice()  
  :peach: array.splice(start, deleteCount, item1, item2, ...); <br/>
  > **초기index는 0이다. && deleteCount가 0이면 아무요소도 제거하지 않는다. 남은요소보다 클경우 전부삭제 && itemN은 배열에 추가될 요소. 비워두면 삭제만 함**
  ```html
  <script>
  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

  myFish.splice(2, 0, 'drum'); // 'drum'을 두번째 인덱스에 삽입
  // myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]

  myFish.splice(2, 1); // 두번째 인덱스에서 하나의 항목('drum')을 삭제
  // myFish is ["angel", "clown", "mandarin", "sturgeon"]
  </script>
  ```
#### Array.push()  
  :peach: arr.push(element1, ..., elementN); <br/>
  > **elementN은 배열의 끝에 추가할 엘리먼트.**
  ```html
  <script>
  // ***배열을 이어 붙일때
  var vegetables = ['설탕당근', '감자'];
  var moreVegs = ['셀러리', '홍당무'];

  // 첫번째 배열에 두번째 배열을 합친다. 
  // vegetables.push('셀러리', '홍당무'); 하는 것과 동일하다.
  Array.prototype.push.apply(vegetables, moreVegs);

  console.log(vegetables); // ['설탕당근', '감자', '셀러리', '홍당무']
  
  // ***배열에 element를 추가할때.
  var sports = ['축구', '야구'];
  var total = sports.push('미식축구', '수영');

  console.log(sports); // ['축구', '야구', '미식축구', '수영']
  console.log(total);  // 4
  </script>
  ```
#### Array.pop()  
  :peach: arr.pop(); <br/>
  > **빈배열에 호출시 undefined를 반환한다.**
  ```html
  <script>
  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

  console.log(myFish); // ['angel', 'clown', 'mandarin', 'sturgeon']

  var popped = myFish.pop();

  console.log(myFish); // ['angel', 'clown', 'mandarin' ]

  console.log(popped); // 'sturgeon'
  </script>
  ```
#### Array.shift()  
  :peach: arr.shift(); <br/>
  > **0번째 위치의 요소를 제거 하고 연이은 나머지 값들의 위치를 한칸 씩 앞으로 당깁니다. 그리고 제거된 값을 반환 한다. 만약 배열의 length가 0이라면 undefined를 리턴.**
  ```html
  <script>
  var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

  console.log('myFish before: ' + myFish);
  // "제거전 myFish 배열: angel,clown,mandarin,surgeon"

  var shifted = myFish.shift(); 

  console.log('myFish after: ' + myFish); 
  // "제거후 myFish 배열: clown,mandarin,surgeon" 

  console.log('Removed this element: ' + shifted); 
  // "제거된 배열 요소: angel"
  </script>
  ```
#### Array.unshift()  
  :peach: arr.unshift([element1[, ...[, elementN]]]); <br/>
  > **elementN은 배열의 끝에 추가할 엘리먼트. <br/>
  unshift 메소드는 배열같은 객체의 시작점에 주어진 값들을 삽입한다.**
  ```html
  <script>
  var arr = [1, 2];

  arr.unshift(0); // result of call is 3, the new array length
  // arr is [0, 1, 2]

  arr.unshift(-2, -1); // = 5
  // arr is [-2, -1, 0, 1, 2]

  arr.unshift([-3]);
  // arr is [[-3], -2, -1, 0, 1, 2]
  </script>
  ```
#### Array.toString()  
  :peach: arr.toString(); <br/>
  > **매개변수 없음.**
  ```html
  <script>
  // Array 객체에 대해, toString 메서드는 배열을 합쳐 쉼표로 구분된 각 배열 요소를 포함하는 문자열 하나를 반환합니다. 
  // 배열을 생성하며 그 배열을 문자열로 변환하기 위해 toString을 사용합니다.
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr'];
  var myVar = monthNames.toString(); // 'Jan,Feb,Mar,Apr'을 myVar에 할당.
  </script>
  ```
#### Array.indexOf()
  :peach: arr.indexOf(searchElement, fromIndex); <br/>
  > **searchElement -> 배열에서 찾을 요소 <br/>
  fromIndex -> 검색을 시작할 인덱스 && <br/> 
  인덱스가 배열의 길이보다 크거나 같은 경우 -1이 반환 ==> 배열이 검색되지 않음<br/>
  인덱스값이 음수이면 배열 끝에서부터의 오프셋 값으로 사용<br/>
  참고 : 제공된 색인이 음수이면 배열은 여전히 앞에서 뒤로 검색됩니다. 계산 된 인덱스가 0보다 작 으면 전체 배열이 검색됨. <br/>
  기본값 : 0 (전체 배열 검색).**
  ```html
  <script>
  var array = [2, 9, 9];
  array.indexOf(2);     // 0
  array.indexOf(7);     // -1
  array.indexOf(9, 2);  // 2
  array.indexOf(2, -1); // -1
  array.indexOf(2, -3); // 0

  // ***요소의 모든 항목 찾기
  var indices = [];
  var array = ['a', 'b', 'a', 'c', 'a', 'd'];
  var element = 'a';
  var idx = array.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(element, idx + 1);
  }
  console.log(indices);
  // [0, 2, 4]
  
  
  // ***요소가 배열에 존재하는지 확인하고 배열을 업데이트.
  function updateVegetablesCollection (veggies, veggie) {
      if (veggies.indexOf(veggie) === -1) {
          veggies.push(veggie);
          console.log('New veggies collection is : ' + veggies);
      } else if (veggies.indexOf(veggie) > -1) {
          console.log(veggie + ' already exists in the veggies collection.');
      }
  }

  var veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

  updateVegetablesCollection(veggies, 'spinach'); 
  // 새로운 채식주의 자 수집은 : 감자, 토마토, 고추, 녹색 후추, 시금치
  updateVegetablesCollection(veggies, 'spinach'); 
  // 시금치는 이미 채소 컬렉션에 있습니다.
  </script>
  ```


#### String.replace()
  :peach: str.replace(regexp|substr, newSubStr|function); <br/>
  > **정규식(RegExp) 객체 또는 리터럴 && substr => 기존 문자열 && 새로운 문자열을 생성하기 위해 호출될 function <br/>
  이 메서드는 호출된 String 객체를 바꾸지 않는다. 단순히 새로운 문자열을 리턴.**  
  
 ` Pattern` | 	`Inserts`
 ---- | ---- 
`$$` | "`$`" 기호를 삽입한다.
`$&` | 매치된 문자열을 삽입한다.
`$ 따옴표` | 매치된 문자열 앞쪽까지의 문자열을 삽입한다.
`$'` | 매치된 문자열의 문자열을 삽입한다.
`$n` | `n`이 1이상 99이하의 정수라면, 첫번째 매개변수로 넘겨진 `RegExp`객체에서 소괄호로 묶인 `n`번째의 부분 표현식으로 매치된 문자열을 삽입한다.

*예제함수의 매개변수들은 다음과 같다*

Possible name | Supplied value
---- | ---- 
`match` | 매치된 문자열. `(윗쪽의 $& 표현식으로 매치된 경우와 동일합니다.)`
`p1, p2, ...` | 윗쪽의 $n 표현식과 동일합니다. (`$1`은 `p1`, `$2`는 `p2`...) 예를 들어, 만약 정규표현식 `/(\a+)(\b+)/` 이 주어진다면 `p1`은 `\a+`와 매치되고 `p2`는 `\b+`와 매치됩니다.
`offset` | 조사된 전체 문자열 중에서 매치된 문자열의 `index`.(예를 들어, 조사될 전체 문자열이 `abcd`이고, 매치된 문자열이 `bc`면 이 매개변수의 값은 1이 됩니다.)
`string` | 조사된 전체 문자열 (`replace`를 호출한 `string`)

  ```html
  <script>
  // *** newString을 'abc - 12345 - #$*%'로 교체하는 예제
  function replacer(match, p1, p2, p3, offset, string) {
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
  }
  var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);

  
  // ***단어위치 바꾸는 예제
  var re = /(\w+)\s(\w+)/;
  var str = 'John Smith';
  var newstr = str.replace(re, '$2, $1');
  console.log(newstr);  // Smith, John
  </script>
  ```

#### String.slice()
  :peach: str.slice(beginIndex[, endIndex]); <br/>
  > **`beginIndex` => 0부터 시작하는 Index, 음수면 ex)beginIndex가 -3이면 시작점은 strLength - 3, <br/>
  만약 beginIndex가 strLength보다 크거나 같은 경우, silice()는 빈 문자열을 반환한다. && <br/>
  `endIndex` => 종료시점 지정한 수의 직전까지, 음수면 ex)endIndex가 -3이면 시작점은 strLength - 3 <br/>
  만약 endInde가 생략된다면, 문자열의 마지막까지 추출**

  ```html
  <script>
  var str1 = 'The morning is upon us.', // the length of str1 is 23.
    str2 = str1.slice(1, 8),
    str3 = str1.slice(4, -2),
    str4 = str1.slice(12),
    str5 = str1.slice(30);
  console.log(str2); // OUTPUT: he morn
  console.log(str3); // OUTPUT: morning is upon u
  console.log(str4); // OUTPUT: is upon us.
  console.log(str5); // OUTPUT: 
  
  
  // ***음수 예제
  var str = 'The morning is upon us.';
  str.slice(-3);     // returns 'us.'
  str.slice(-3, -1); // returns 'us'
  str.slice(0, -1);  // returns 'The morning is upon us'
  </script>
  ```
#### String.split()
  :peach: str.split([separator[, limit]]); <br/>
  >**`separator` =>  분할이 발생해야하는 지점을 나타내는 문자열을 지정 && <br/>
  `limit`=> 분할을 제한하는 수 , 분할 제한 이후의 항목은 배열에 포함되지 않는다.**

  ```html
  <script>
  // ***문자열 공백 제거
  var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
  var re = /\s*;\s*/;
  var nameList = names.split(re);

  console.log(nameList); // [ "Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand " ]
  
  // ***제한된 수 반환
  var myString = 'Hello World. How are you doing?';
  var splits = myString.split(' ', 3);

  console.log(splits); // ["Hello", "World.", "How"]
  
  // ***문자열 뒤집기
  var str = 'asdfghjkl';
  var strReverse = str.split('').reverse().join(''); // 'lkjhgfdsa'
  // str.split('');  => 한글자씩 나눔
  </script>
  ```
  
#### String.search()
  :peach: str.search(regexp); <br/>
  >**`regexp` => 정규표현식<br/>
  반환값 => 최초 일치한 index ,없다면 -1**
  ```html
  <script>
  var str = "hey JudE";
  var re = /[A-Z]/g;
  var re2 = /[.]/g;
  console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
  console.log(str.search(re2)); // returns -1 cannot find '.' dot punctuation
  </script>
  ```
#### String.match()
  :peach: str.match(regexp); <br/>
  >**`regexp` => 정규표현식<br/>
  반환값 =>  Array전체 문자열을 첫 번째 요소로 포함하고 그 뒤에 괄호 안에 캡처 된 결과가 표시 ,없다면 null<br/>
  매개변수가 RegExp가 아닐경우 string처리되며 +(양수기호)는 무시함**
  ```html
  <script>
  var str = 'For more information, see Chapter 3.4.5.1';
  var re = /see (chapter \d+(\.\d)*)/i;
  var found = str.match(re);

  console.log(found);

  // logs [ 'see Chapter 3.4.5.1',
  //        'Chapter 3.4.5.1',
  //        '.1',
  //        index: 22,
  //        input: 'For more information, see Chapter 3.4.5.1' ]

  // 'see Chapter 3.4.5.1' is the whole match.
  // 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
  // '.1' was the last value captured by '(\.\d)'.
  // The 'index' property (22) is the zero-based index of the whole match.
  // The 'input' property is the original string that was parsed.
  
  // ***매개 변수없이 사용 하기
  var str = "Nothing will come of nothing.";

  str.match();   // returns [""]
  
  // ***매개변수가 RegExp가 아닐경우 string처리되며 +(양수기호)는 무시함
  var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
    str1.match("number");   // "number" is a string. returns ["number"]
    str1.match(NaN);        // the type of NaN is the number. returns ["NaN"]
    str1.match(Infinity);   // the type of Infinity is the number. returns ["Infinity"]
    str1.match(+Infinity);  // returns ["Infinity"]
    str1.match(-Infinity);  // returns ["-Infinity"]
    str2.match(65);         // returns ["65"]
    str2.match(+65);        // A number with a positive sign. returns ["65"]
    str3.match(null);       // returns ["null"]
  </script>
  ```
#### String.trim()
  :peach: str.trim(); <br/>
  >**반환값 => 양쪽 끝에서 공백을 제거한 새로운 문자열을 반환.<br/>
  문자열 자체의 값에는 영향을주지 않는다.**
  ```html
  <script>
  var orig = '   foo  ';
  console.log(orig.trim()); // 'foo'

  // Another example of .trim() removing whitespace from just one side.

  var orig = 'foo    ';
  console.log(orig.trim()); // 'foo'
  </script>
  ```
  >`trim()` 기본적으로 사용할 수없는 경우 다른 코드가 생성되기 전에 다음 코드를 실행.
  ```html
  <script>
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
  </script>
  ```
#### String.indexOf()
  :peach: str.indexOf(searchValue[, start]); <br/>
  >**`searchValue` => (필수값) 찾을 문자열</br>
  `start` => (선택값) Default 0. 검색시작 위치를 지정해줌.</br>
  `반환값` => 일치하는 첫번째 index 반환 && 검색하려는 문자열보다 길경우 문자열의 마지막 index를 반환.(`indexOf('',큰Index)`일때)</br>
  && 대/소문자 구분. && 검색 대상값이 없으면 -1을 반환.**
  ```html
  <script>
  // ***indexOf()와 lastIndexOf()
  'Blue Whale'.indexOf('Blue');     // returns  0
  'Blue Whale'.indexOf('Blute');    // returns -1
  'Blue Whale'.indexOf('Whale', 0); // returns  5
  'Blue Whale'.indexOf('Whale', 5); // returns  5
  'Blue Whale'.indexOf('Whale', 7); // returns -1
  'Blue Whale'.indexOf('');         // returns  0
  'Blue Whale'.indexOf('', 9);      // returns  9
  'Blue Whale'.indexOf('', 10);     // returns 10
  'Blue Whale'.indexOf('', 11);     // returns 10 
  
  
  var myString    = 'brie, pepper jack, cheddar';
  var myCapString = 'Brie, Pepper Jack, Cheddar';

  console.log('myString.indexOf("cheddar") is ' + myString.indexOf('cheddar'));  //  19
  console.log('myCapString.indexOf("cheddar") is ' + myCapString.indexOf('cheddar'));  // 일치하는 문자열이 없을 경우  -1

  // ***찾고자 하는 문자열이 몇번 사용됫는지
  var str = 'To be, or not to be, that is the question.';
  var count = 0;
  var pos = str.indexOf('e');

  while (pos !== -1) {
    count++;
    pos = str.indexOf('e', pos + 1);
  }

  console.log(count); // displays 4
  </script>
  ```

#### obj.hasOwnProperty()
  :peach: obj.hasOwnProperty(prop); <br/>
  >**`prop` =>  테스트하려는 프로퍼티의 명칭 <br/>
  객체가 특정 프로퍼티를 자기만의 직접적인 프로퍼티로서 소유하고 있는지를 판단하는데 사용<br/>
  `in` 연산과는 다르게, 이 메소드는 객체의 프로토타입 체인을 확인하지는 않는다.**
  ```html
  <script>
  o = new Object();
  o.prop = 'exists';

  function changeO() {
    o.newprop = o.prop;
    delete o.prop;
  }

  o.hasOwnProperty('prop');   // returns true
  changeO();
  o.hasOwnProperty('prop');   // returns false
  
  // ***직접 프로퍼티와 상속된 프로퍼티의 비교
  o = new Object();
  o.prop = 'exists';
  o.hasOwnProperty('prop');             // returns true
  o.hasOwnProperty('toString');         // returns false
  o.hasOwnProperty('hasOwnProperty');   // returns false
  
  // ***객체의 프로퍼티들을 순환하기
  var buz = {
    fog: 'stack'
  };

  for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
      console.log('this is fog (' + name + ') for sure. Value: ' + buz[name]);
    }
    else {
      console.log(name); // toString or something else
    }
  }
  
  // ***프로퍼티의 명칭으로서 hasOwnProperty 를 사용하기   
  var foo = {
    hasOwnProperty: function() {
      return false;
    },
    bar: 'Here be dragons'
  };

  foo.hasOwnProperty('bar'); // 항상 returns false   ==> 메서드로 작용함

  // Use another Object's hasOwnProperty and call it with 'this' set to foo
  ({}).hasOwnProperty.call(foo, 'bar'); // true  ==> 진짜 hasOwnProperty 

  // It's also possible to use the hasOwnProperty property from the Object prototype for this purpose
  Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
  </script>
  ```
